import * as types from './ActionTypes'

export const addMessage = (userName, message, room) => ({
    type: types.ADD_MESSAGE,
    userName,
    room,
    message,
})

export const roomUsersUpdated = (room, users) => ({
    type: types.ROOM_USERS_UPDATED,
    room,
    users,
})

export const setName = userName => ({
    type: types.SET_NAME,
    userName,
})

export const setRoom = room => ({
    type: types.SET_ROOM,
    room,
})
