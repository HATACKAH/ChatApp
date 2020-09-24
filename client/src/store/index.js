import { createStore } from "redux";
import * as ActionTypes from "./actions/ActionTypes";

const initialState = {
    room1: {
        messages: [],
        users: [ 1, 10, ],
    },
};

const initRoom = (s, room) =>
        s[room] = s[room]
                ? { ...s[room] }
                : { messages: [], users: [] };

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.ADD_MESSAGE: {
            const s = { ...state };
            const { room, userId, message } = action;

            initRoom(s, room);

            s[room].messages.push({
                userId,
                message,
            });

            return s;
        }

        case ActionTypes.ROOM_USERS_UPDATED: {
            const s = { ...state };
            const { room, users } = action;

            initRoom(s, room);

            s[room].users = [ ...users ];

            return s;
        }

        default:
            return state;
    }
}

const store = createStore(rootReducer);

export default store;
