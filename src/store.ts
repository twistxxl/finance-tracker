import { configureStore } from '@reduxjs/toolkit';
import financeReducer from './features/financeSlice.ts';

export const store = configureStore({
  reducer: {
    finance: financeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch