import React from 'react';

import './Message.css';

import ReactEmoji from 'react-emoji';

const Message = ({ msg, currentUserName }) => {
    const { message, userName } = msg;
    const trimmedName = currentUserName.trim();
    const isSentByCurrentUser = userName === trimmedName;

    return (
        isSentByCurrentUser
            ? (
                <div className="messageContainer justifyEnd">
                    <p className="sentText pr-10">{trimmedName}</p>
                    <div className="messageBox backgroundBlue">
                        <p className="messageText colorWhite">{ReactEmoji.emojify(message)}</p>
                    </div>
                </div>
            )
            : (
                <div className="messageContainer justifyStart">
                    <div className="messageBox backgroundLight">
                        <p className="messageText colorDark">{ReactEmoji.emojify(message)}</p>
                    </div>
                    <p className="sentText pl-10 ">{userName}</p>
                </div>
            )
    );
}

export default Message;