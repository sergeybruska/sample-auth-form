import { createSlice } from "@reduxjs/toolkit";
import { apiClient } from "api/client";
import { StoreState } from "models/store";
import { AppDispatch } from "store";
import { setError } from "./errorSlice";
import { UserTypes } from "models/user";

export type UserActionType<T> = {
  payload: T;
}

// Initial state

const initialState: StoreState.UserStateTypes = {
  user: null,
  isAuth: false,
};

// Reducers

const reducers = {
  setIsAuth(state = initialState, action: UserActionType<boolean>) {
    state.isAuth = action.payload;
  },
  setUser(state = initialState, action: UserActionType<UserTypes>) {
    state.user = action.payload;
  },
  clearUserState() {
    return initialState;
  },
};

// Slice

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers,
});

export const {
  setIsAuth,
  setUser,
  clearUserState,
} = userSlice.actions;

export default userSlice.reducer;

// thunk

export const signInAction = (values: { email: string, pass: string }) => async (dispatch: AppDispatch) => {
  try {
    const res = await apiClient.signIn(values);
    if (res.error) throw res;
    dispatch(setIsAuth(true));
    if (res.data) {
      dispatch(setUser(res.data.user));
      localStorage.setItem("authToken", res.data.authToken);
    }
  } catch (err: any) {
    dispatch(setError(err))
  }
}

export const logOut = () => (dispatch: AppDispatch) => {
  localStorage.removeItem("authToken");
  dispatch(clearUserState());
}

// Selectors

const selectIsAuth = (state: StoreState.All) => state.user.isAuth;
const selectCurrentUser = (state: StoreState.All) => state.user.user;

export const userSelectors = {
  selectIsAuth,
  selectCurrentUser,
};
