import React, { useState } from 'react';
import { connect } from 'react-redux';
import styles from './TopicsWindow.module.css';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { setRoom } from '../../store/actions';

function TopicsWindow({ rooms, setRoom }) {
    const [roomInput, setRoomInput] = useState('');

    return (
        <List className={styles.topicWrapper}>
            <div className={styles.topicAddBox}>
                <h3>Add new room:</h3>

                <TextField
                    id="outlined-basic"
                    label="Enter room name"
                    variant="outlined"
                    value={roomInput}
                    onChange={(e) => setRoomInput(e.target.value)}
                />

                <Button
                    color='blue'
                    className={styles.addBtn}
                    variant="contained"
                    style={{
                        background: '#2979FF',
                        color: 'white',
                        marginTop: '10px'
                    }}
                    onClick={(e) => {
                        setRoom(roomInput);
                        setRoomInput('');
                    }}
                >
                    Add
                </Button>
            </div>
            {rooms.map((room) => (
                <ListItem key={room} button>
                    <ListItemText
                        primary={room}
                        onClick={() => {
                            setRoom(room);
                        }}
                    />
                </ListItem>
            ))}
        </List>
    );
}

const mapDispatchToProps = {
    setRoom,
};

export default connect(null, mapDispatchToProps)(TopicsWindow);
