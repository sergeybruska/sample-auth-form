import { UserTypes } from "./user";

export interface ErrorTypes {
  error: number | null;
  message: string;
}

export namespace StoreState {
  export interface UserStateTypes {
    user: UserTypes | null;
    isAuth: boolean;
  }

  export interface ErrorStateTypes {
    error: null | ErrorTypes;
  }

  export interface All {
    user: UserStateTypes;
    errors: ErrorStateTypes;
  }
}