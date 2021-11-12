import {createSlice} from '@reduxjs/toolkit';

export const userStore = createSlice({
  name: 'user',
  initialState: {
    current: null,
    type: 'talker',
  },
  reducers: {
    setUser: (state, user) => {
      state.current = user.payload;
    },

    setType: (state, type) => {
      state.type = type.payload;
    },
  },
});

export const {setUser, setType} = userStore.actions;

export default userStore.reducer;
