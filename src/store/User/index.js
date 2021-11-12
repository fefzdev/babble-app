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

    setUserType: (state, type) => {
      state.type = type.payload;
    },
  },
});

export const {setUser, setUserType} = userStore.actions;

export default userStore.reducer;
