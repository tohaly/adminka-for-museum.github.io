import { createSlice } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../app/store";
import { authorize, checkAuthorize, IAuthValues, clearUserData } from "../../firebase/endpoints";
import firebase from "firebase";

interface IAuthState {
  isAuth: boolean;
  name: string;
  pending: boolean;
  formIsOpen: boolean;
}

const initialState: IAuthState = {
  isAuth: false,
  name: 'Admin',
  pending: false,
  formIsOpen: false,
};

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state) {
      state.isAuth = true;
    },
    logout(state) {
      state.isAuth = false;
    },
    startLogin(state) {
      state.pending = true;
    },
    stopLogin(state) {
      state.pending = false;
    },
    toggleForm(state) {
      state.formIsOpen = !state.formIsOpen;
    },
  },
});

export default auth.reducer;

export const { login, logout, startLogin, stopLogin, toggleForm } = auth.actions;

export const loginUser = (values: IAuthValues): AppThunk => async dispatch => {
  try {
    dispatch(startLogin());
    await authorize(values);
    setTimeout(() => {
      dispatch(login());
      dispatch(toggleForm());
    }, 1500);
  } catch {
    console.error("Ошибка авторизации");
  } finally {
    setTimeout(() => {
      dispatch(stopLogin());
    }, 1900);
  }
};

export const checkUserAuthorize = (): AppThunk => async dispatch => {
  try {
    checkAuthorize((user: firebase.User) => {
      if (user) {
        dispatch(login());
      } else {
        dispatch(logout());
      }
    });
  } catch (err) {
    console.error(err);
  }

};

export const logoutUser = (): AppThunk => async disaptch => {
  try {
    await clearUserData();
    disaptch(logout());
  } catch (err) {
    console.error(err);
  }
};

export const selectIsAuth = (state: RootState) => state.auth.isAuth;
export const selectPendingAuth = (state: RootState) => state.auth.pending;
export const selectFormVisible = (state: RootState) => state.auth.formIsOpen;