import React from 'react';
import onlineIcon from '../../icons/onlineIcon.png';
import style from './ModalMembers.module.css';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';

export default class ModalMembers extends React.Component {
    state = {
        isOpen: false,
    };

    render() {
        const { users } = this.props;
        let numberOfUsers = users.length;
        return (
            <React.Fragment>
                <div
                    onClick={() => this.setState({ isOpen: true })}
                    className={style.numberOfUsers}
                >
                    <h3>{numberOfUsers} members</h3>
                </div>

                {this.state.isOpen && (
                    <div className={style.modalFade}>
                    <div className={style.modal}>
                        <div className={style.modalbody}>
                            <div className={style.modalbodyHeader}>
                                <h3>Users in this chat:</h3>
                            </div>
                            <List className={style.modalbodyList}>
                                {users.map(({ name }) => (
                                    <ListItem
                                        key={name}
                                        button
                                        className={style.listItem}
                                    >
                                        {name}
                                        <img
                                            alt="Online Icon"
                                            src={onlineIcon}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                            <Button
                                color="blue"
                                variant="contained"
                                style={{
                                    background: '#2979FF',
                                    color: 'white',
                                    marginTop: '10px',
                                }}
                                className={style.closeModal}
                                onClick={() => this.setState({ isOpen: false })}
                                onKeyPress={(event) =>
                                    (event.key === 'Escape' || event.key === "Esc")
                                        ? this.setState({ isOpen: false })
                                        : null
                                }
                            >Close </Button>
                        </div>
                    </div>
                </div>
                )}
            </React.Fragment>
        );
    }
}
