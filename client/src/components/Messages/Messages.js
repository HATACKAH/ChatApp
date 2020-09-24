import React from 'react';

import ScrollToBottom from 'react-scroll-to-bottom';

import Message from './Message/Message';

import './Messages.css';

const Messages = ({ messages, currentUserName }) => (
  <ScrollToBottom className="messages">
    {messages.map((message, i) => <div key={i}><Message msg={message} currentUserName={currentUserName}/></div>)}
  </ScrollToBottom>
);

export default Messages;