import { createSlice } from '@reduxjs/toolkit';

export const appStore = createSlice({
  name: 'app',

  initialState: {
    errorMessage: null,
    infoMessage: null,
    isLoading: false,
  },

  reducers: {
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    removeErrorMessage: state => {
      state.errorMessage = null;
    },
    setInfoMessage: (state, action) => {
      state.infoMessage = action.payload;
    },
    removeInfoMessage: state => {
      state.infoMessage = null;
    },
    setIsLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
  },
});

export const {
  setErrorMessage,
  removeErrorMessage,
  setIsLoading,
  setInfoMessage,
  removeInfoMessage,
} = appStore.actions;

export default appStore.reducer;
