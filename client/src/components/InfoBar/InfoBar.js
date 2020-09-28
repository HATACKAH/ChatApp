import React from 'react';
import ModalMembers from './ModalMembers'

import onlineIcon from '../../icons/onlineIcon.png';
import './InfoBar.css';


export default function InfoBar({ room, users }) {
    return (
        <div className="infoBar">
            <div className="leftInnerContainer">
                <img className="onlineIcon" src={onlineIcon} alt="online icon" />
                <h3>{room}</h3>
            </div>
            <div className='centerInnerContainer'>
                <ModalMembers users={users} />
            </div>
        </div>
    )
}




// export default InfoBar;