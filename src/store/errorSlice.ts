import { createSlice } from "@reduxjs/toolkit";
import { ErrorTypes, StoreState } from "models/store";

export type ErrorActionType<T> = {
  payload: T;
}

// Initial state

const initialState: StoreState.ErrorStateTypes = {
  error: null,
};

// Reducers

const reducers = {
  setError(state = initialState, action: ErrorActionType<null | ErrorTypes>) {
    state.error = action.payload;
  },
  errorClear: (state = initialState) => {
    state.error = null;
  },
  clearErrorState() {
    return initialState;
  },
};

// Slice

const errorSlice = createSlice({
  name: "errors",
  initialState,
  reducers,
});

export const {
  setError,
  errorClear,
  clearErrorState,
} = errorSlice.actions;

export default errorSlice.reducer;

// Selectors

const selectError = (state: StoreState.All) => state.errors.error;

export const errorSelectors = {
  selectError
};
