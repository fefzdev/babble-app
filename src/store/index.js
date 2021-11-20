import { configureStore } from '@reduxjs/toolkit';
import appReducer from './App';
import userReducer from './User';

export default configureStore({
  reducer: {
    app: appReducer,
    user: userReducer,
  },
});
