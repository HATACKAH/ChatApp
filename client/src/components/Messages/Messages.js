import React from 'react';

import ScrollToBottom from 'react-scroll-to-bottom';

import Message from './Message/Message';

import styles from './Messages.module.css';

const Messages = ({ messages, currentUserName }) => (
  <ScrollToBottom className={styles.messages}>
    {messages.map((message, i) => <div key={i}><Message msg={message} currentUserName={currentUserName}/></div>)}
  </ScrollToBottom>
);

export default Messages;