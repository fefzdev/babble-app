import { configureStore } from '@reduxjs/toolkit';

import appReducer from './App';
import roomsReducer from './Rooms';
import userReducer from './User';

export default configureStore({
  reducer: {
    app: appReducer,
    user: userReducer,
    rooms: roomsReducer,
  },
});
