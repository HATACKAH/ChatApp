import React, { useState, useEffect } from "react";
import queryString from "query-string";
import { connect, useSelector } from "react-redux";
import io from "socket.io-client";

import Messages from "../Messages/Messages";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import TopicsWindow from "../TopicsWindow/TopicsWindow";

import Paper from "@material-ui/core/Paper";

import {
  setRoom,
  setName,
  addMessage,
  roomUsersUpdated
} from "../../store/actions";

import "./Chat.css";

const ENDPOINT = "https://rr-chat-app.herokuapp.com/";

let socket;
const joinedRooms = [];

const ChatComponent = ({
  location,
  setRoom,
  setName,
  addMessage,
  roomUsersUpdated
}) => {
  const userName = useSelector(s => s.userName);
  const rooms = useSelector(s => Object.keys(s.rooms));

  const currentRoom = useSelector(s => s.currentRoom);
  const users = useSelector(
    s =>
      (s.currentRoom &&
        s.rooms[s.currentRoom] &&
        s.rooms[s.currentRoom].users) ||
      []
  );
  const messages = useSelector(
    s =>
      (s.currentRoom &&
        s.rooms[s.currentRoom] &&
        s.rooms[s.currentRoom].messages) ||
      []
  );

  const [messageInputText, setMessageInputText] = useState("");

  useEffect(() => {
    const query = queryString.parse(location.search);

    let room, name;
    if (currentRoom) {
      room = currentRoom;
    } else if (query.room) {
      room = query.room;
      setRoom(room);
    }

    if (userName) {
      name = userName;
    } else if (query.name) {
      name = query.name;
      setName(name);
    }

    if (!joinedRooms.length) {
      socket = io(ENDPOINT);

      socket.on("roomData", ({ room, users }) => {
        roomUsersUpdated(room, users);

        socket.on("message", ({ user, text, room }) => {
          addMessage(user, text, room);
        });
      });
    }

    if (!joinedRooms.includes(room)) {
      socket.emit("join", { name, room }, error => {
        if (error) {
          alert(error);
        }
      });

      joinedRooms.push(room);
    }
  }, [location.search, currentRoom, userName]);

  const sendMessage = e => {
    e.preventDefault();

    if (messageInputText) {
      socket.emit(
        "sendMessage",
        { room: currentRoom, text: messageInputText },
        () => setMessageInputText("")
      );
    }
  };

  return (
    <div className="outerContainer">
      <div className="container">
        <Paper className="topicsWindow">
          <TopicsWindow rooms={rooms} currentUserName={userName} />
        </Paper>
        <div className="chatbox-wrapper">
          <InfoBar room={currentRoom} users={users} />
          <Messages messages={messages} currentUserName={userName} />
          <Input
            message={messageInputText}
            setText={setMessageInputText}
            sendMessage={sendMessage}
          />
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  setRoom,
  setName,
  addMessage,
  roomUsersUpdated
};

export default connect(null, mapDispatchToProps)(ChatComponent);
