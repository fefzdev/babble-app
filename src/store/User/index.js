import { createSlice } from '@reduxjs/toolkit';

export const userStore = createSlice({
  name: 'user',
  initialState: {
    current: null,
    type: null,
    mail: null,
    profilePicture: null,
    uid: null,
    available: false,
    isConnected: false,
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

    setUserAvailable: (state, isAvailable) => {
      state.available = isAvailable.payload;
    },

    setIsConnected: (state, isConnected) => {
      state.isConnected = isConnected.payload;
    },
  },
});

export const {
  setUser,
  setUserType,
  setUserMail,
  setUserUID,
  setUserAvailable,
  setIsConnected,
} = userStore.actions;

export default userStore.reducer;
