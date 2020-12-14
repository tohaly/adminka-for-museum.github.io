import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import news from "../features/news/newsSlice";
import form from '../features/form/formSlice';
import auth from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    news,
    form,
    auth,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
  RootState,
  unknown,
  Action<string>>;
