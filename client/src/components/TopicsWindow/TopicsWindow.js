import React , { useState } from 'react'
import {connect} from 'react-redux'
import './TopicsWindow.css';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Link } from "react-router-dom";
import {setRoom} from '../../store/actions';


 function TopicsWindow ({currentUserName, rooms, setRoom}) {
    const [room, setRooms] = useState('');
    console.log(setRoom)

    return (
       <List className='topic-wrapper'>
           <div>
               <h3> Add new room: </h3>
               <TextField id="outlined-basic" label="Enter room name" variant="outlined" onChange={(event) => setRooms(event.target.value)}/>
               <Link onClick={e => (!room) ? e.preventDefault() : null} to={`/chat?name=${currentUserName}&room=${room}`}>
               <Button variant="contained" >Add</Button>
               </Link>
           </div>
           {
               rooms.map(room => (
                <ListItem key={room} button>
                    <ListItemText
                        primary={room} 
                        onClick={e => {
                            setRoom(room);
                          }}
                        />
                </ListItem>
               ))
           }
       </List>
      )
}

const mapDispatchToProps = {
    setRoom
  }

  export default connect(
    null,
    mapDispatchToProps
  )(TopicsWindow)