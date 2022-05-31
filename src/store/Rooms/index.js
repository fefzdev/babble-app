import { createSlice } from '@reduxjs/toolkit';

export const roomsStore = createSlice({
  name: 'rooms',
  initialState: {
    waitlist: [],
    rooms: [],
  },
  reducers: {
    addToWaitlist: (state, { payload }) => {
      if (!state.waitlist.includes(payload)) state.waitlist.push(payload);
    },
    removeFromWaitlist: (state, { payload }) => {
      if (state.waitlist.includes(payload))
        state.waitlist.splice(state.waitlist.indexOf(payload), 1);
    },
    addRoomToRooms: (state, { payload }) => {
      if (!state.rooms.find(({ roomUid }) => roomUid === payload.roomUid))
        state.rooms.push(payload);
    },
    setRooms: (state, { payload }) => {
      state.rooms = payload;
    },
    updateRoom: (state, { payload }) => {
      const room = state.rooms.find(({ roomUid }) => roomUid === payload.uid);
      const newRoom = { ...room, ...payload };
      state.rooms = state.rooms.map(r =>
        r.roomUid === payload.uid ? newRoom : r,
      );
    },
    removeRoomToRooms: (state, { payload: roomUid }) => {
      const objectToRemove = state.rooms.find(room => room.roomUid === roomUid);
      if (state.rooms.includes(objectToRemove))
        state.rooms.splice(state.rooms.indexOf(objectToRemove), 1);
    },
    getRoomInfos: (state, { payload: roomUid }) => {
      return state.rooms.find(room => room.roomUid === roomUid);
    },
  },
});

export const {
  addToWaitlist,
  removeFromWaitlist,
  addRoomToRooms,
  removeRoomToRooms,
  getRoomInfos,
  setRooms,
  updateRoom,
} = roomsStore.actions;

export default roomsStore.reducer;
