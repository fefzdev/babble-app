import { createSlice } from '@reduxjs/toolkit';

export const userStore = createSlice({
  name: 'user',
  initialState: {
    current: null,
    type: null,
    mail: null,
  },
  reducers: {
    setUser: (state, user) => {
      state.current = user.payload;
    },

    setUserType: (state, type) => {
      state.type = type.payload;
    },

    setUserMail: (state, mail) => {
      state.mail = mail.payload;
    },

    setUserUID: (state, uid) => {
      state.uid = uid.payload;
    },
  },
});

export const { setUser, setUserType, setUserMail, setUserUID } =
  userStore.actions;

export default userStore.reducer;
