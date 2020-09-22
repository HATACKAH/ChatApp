import React from 'react'
import './TopicsWindow.css';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


export default function TopicsWindow () {
    return (
       <List className='topic-wrapper'>
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