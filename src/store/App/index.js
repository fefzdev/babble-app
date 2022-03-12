import { createSlice } from '@reduxjs/toolkit';

export const appStore = createSlice({
  name: 'app',

  initialState: {
    errorMessage: null,
    isLoading: false,
  },

  reducers: {
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    removeErrorMessage: state => {
      state.errorMessage = null;
    },
    setIsLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
  },
});

export const { setErrorMessage, removeErrorMessage, setIsLoading } =
  appStore.actions;

export default appStore.reducer;
