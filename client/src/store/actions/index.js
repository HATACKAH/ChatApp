import * as types from './ActionTypes'

export const addMessage = (userId, message, room) => ({
    type: types.ADD_MESSAGE,
    id: nextMessageId++,
    userId,
    room,
    message,
})

export const roomUsersUpdated = (room, users) => ({
    type: types.ROOM_USERS_UPDATED,
    room,
    users,
})

