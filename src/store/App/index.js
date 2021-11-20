import { createSlice } from '@reduxjs/toolkit';

export const appStore = createSlice({
  name: 'app',

  initialState: {
    errorMessage: null,
  },

  reducers: {
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    removeErrorMessage: state => {
      state.errorMessage = null;
    },
  },
});

export const { setErrorMessage, removeErrorMessage } = appStore.actions;

export default appStore.reducer;
