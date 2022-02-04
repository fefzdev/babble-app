import { createSlice } from '@reduxjs/toolkit';

export const roomsStore = createSlice({
  name: 'rooms',
  initialState: {
    waitlist: [],
  },
  reducers: {
    addToWaitlist: (state, { payload }) => {
      if (!state.waitlist.includes(payload)) state.waitlist.push(payload);
    },
    removeFromWaitlist: (state, { payload }) => {
      if (state.waitlist.includes(payload))
        state.waitlist.splice(state.waitlist.indexOf(payload), 1);
    },
  },
});

export const { addToWaitlist, removeFromWaitlist } = roomsStore.actions;

export default roomsStore.reducer;
