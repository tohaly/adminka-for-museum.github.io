import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface IFormState {
  statusText: string;
  isError: boolean;
  pending: boolean;
  img: string
  loadImagePending: boolean;
}

const initialState: IFormState = {
  statusText: '',
  isError: false,
  pending: false,
  img: '',
  loadImagePending: false,
};

const form = createSlice({
    name: 'form',
    initialState,
    reducers: {
      formStartPending(state) {
        state.pending = true;
      },
      formStopPending(state) {
        state.pending = false;
      },
      setFormError(state, { payload }: PayloadAction<string>) {
        state.isError = true;
        state.statusText = payload;
      },
      setFormSuccess(state, { payload }: PayloadAction<string>) {
        state.statusText = payload;
        state.img = '';
      },
      setImage(state, { payload }: PayloadAction<string>) {
        state.img = payload;
      },
      clearStatusMessage(state) {
        state.isError = false;
        state.statusText = '';
      },
      startLoadImagePending(state) {
        console.log('kok')
        state.loadImagePending = true;
      },
      stopLoadImagePending(state) {
        state.loadImagePending = false;
      },
    },
  },
);

export default form.reducer;

export const {
  formStartPending,
  setFormError,
  clearStatusMessage,
  formStopPending,
  setFormSuccess,
  setImage,
  startLoadImagePending,
  stopLoadImagePending,
} = form.actions;

export const selectImageLink = (state: RootState) => state.form.img;
export const selectStatusText = (state: RootState) => state.form.statusText;
export const selectFormErrorStatus = (state: RootState) => state.form.isError;
export const selectPendingForm = (state: RootState) => state.form.pending;
export const selectLoadImagePending = (state: RootState) => state.form.loadImagePending;