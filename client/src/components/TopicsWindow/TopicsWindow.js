import React , { useState } from 'react'
import './TopicsWindow.css';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Link } from "react-router-dom";



export default function TopicsWindow ({name}) {
    const [room, setRoom] = useState('');
    return (
       <List className='topic-wrapper'>
           <div>
               <h3> Add new room: </h3>
               <TextField id="outlined-basic" label="Enter room name" variant="outlined" onChange={(event) => setRoom(event.target.value)}/>
               <Link onClick={e => (!room) ? e.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
               <Button variant="contained" >Add</Button>
               </Link>
           </div>
           {
               ['topic'].map(topic => (
                <ListItem key={topic} button>
                    <ListItemText primary={topic}/>
                </ListItem>
               ))
           }
       </List>
      )
}