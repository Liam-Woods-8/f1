import { configureStore } from '@reduxjs/toolkit';
import raceReducer from './slices/raceSlice';
import userReducer from './slices/userSlice';
import teamReducer from './slices/teamSlice';
import driverReducer from './slices/driverSlice';

export const store = configureStore({
  reducer: {
    race: raceReducer,
    user: userReducer,
    team: teamReducer,
    driver: driverReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 