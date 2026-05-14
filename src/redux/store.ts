import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import rideReducer from './rideSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    ride: rideReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
