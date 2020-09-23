import React from "react";
import onlineIcon from "../../icons/onlineIcon.png";
import './ModalMembers.css'

export default class ModalMembers extends React.Component { 

        state = {
          isOpen: false
        };

        render() {
          const { users } = this.props;
          let numberOfUsers = users.length;
          return (
            <React.Fragment>
              <div onClick={() => this.setState({ isOpen: true })} className='numberOfUsers'>
                <h3>{numberOfUsers} members</h3>
              </div>
      
              {this.state.isOpen && (
                <div className="modal">
                  <div className="modal-body">
                    <h3>Users in this chat:</h3>
                    <div>
                      {users.map(({ name }) => (
                        <div key={name} className="activeItem">
                          {name}
                          <img alt="Online Icon" src={onlineIcon} />
                        </div>
                      ))}
                    </div>
                    <button 
                      onClick={() => this.setState({ isOpen: false })}
                      onKeyPress={event => event.key === 'Escape' ? this.setState({ isOpen: false }) : null}>
                      Close
                    </button>
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        }
      }
      



