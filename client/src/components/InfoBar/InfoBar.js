import React from 'react';
import ModalMembers from './ModalMembers'

import onlineIcon from '../../icons/onlineIcon.png';
import styles from './InfoBar.module.css';


export default function InfoBar({ room, users }) {
    return (
        <div className={styles.infoBar}>
            <div className={styles.leftInnerContainer}>
                <img className={styles.onlineIcon} src={onlineIcon} alt="online icon" />
                <h3>{room}</h3>
            </div>
            <div className={styles.rightInnerContainer}>
                <ModalMembers users={users} />
            </div>
        </div>
    )
}




// export default InfoBar;