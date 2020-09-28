import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import { connect, useSelector } from 'react-redux';
import io from "socket.io-client";

import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import TopicsWindow from '../TopicsWindow/TopicsWindow'

import Paper from '@material-ui/core/Paper';

import {
    setRoom,
    setName,
    addMessage,
    roomUsersUpdated,
} from '../../store/actions';

import './Chat.css';

const ENDPOINT = 'localhost:5000';

let socket;
const joinedRooms = [];

const ChatComponent = ({
    location,
    setRoom,
    setName,
    addMessage,
    roomUsersUpdated,
}) => {
    const userName = useSelector(s => s.userName);
    const rooms = useSelector(s => Object.keys(s.rooms));


    const currentRoom = useSelector(s => s.currentRoom);
    const users = useSelector(s => s.currentRoom && s.rooms[s.currentRoom] && s.rooms[s.currentRoom].users || []);
    const messages = useSelector(s => s.currentRoom && s.rooms[s.currentRoom] && s.rooms[s.currentRoom].messages || []);

    const [messageInputText, setMessageInputText] = useState('');

    useEffect(() => {
        // const { name, room } = queryString.parse(location.search);
        const query = queryString.parse(location.search);
        const room = currentRoom || query.room;
        const name = userName || query.name;
        console.log(name)
        console.log(room)

        socket = io(ENDPOINT);

        setRoom(room);
        setName(name);

        socket.on("roomData", ({ room, users }) => {
            console.log('roomdata', users)
            roomUsersUpdated(room, users);
        });

        socket.on('message', ({ user, text, room }) => {
            addMessage(user, text, room);
        });

        socket.emit('join', { name, room }, (error) => {
            if (error) {
                alert(error);
            }
        });

    }, [ENDPOINT, location.search, currentRoom]);

    const sendMessage = e => {
        e.preventDefault();

        if (messageInputText) {
            socket.emit('sendMessage', messageInputText, () => setMessageInputText(''));
        }
    }

    return (
        <div className="outerContainer">
            <div className="container">
                <Paper className='topicsWindow'>
                    <TopicsWindow rooms={rooms} currentUserName={userName}/>
                </Paper>
                <div className='chatbox-wrapper'>
                    <InfoBar room={currentRoom} users={users} />
                    <Messages messages={messages} currentUserName={userName} />
                    <Input message={messageInputText} setText={setMessageInputText} sendMessage={sendMessage} />
                </div>
            </div>
        </div>
    );
}

const mapDispatchToProps = {
    setRoom,
    setName,
    addMessage,
    roomUsersUpdated,
};

export default connect(
    null,
    mapDispatchToProps
)(ChatComponent);
