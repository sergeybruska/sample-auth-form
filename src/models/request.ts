import { UserTypes } from "./user";

export interface Request<T = string> {
  method: 'POST' | 'GET' | 'DELETE';
  body: T;
  headers?: Record<string, string>;
}

export interface ResponseSignIn {
  error: number | null;
  data?: {
    user: UserTypes;
    authToken: string;
  };
  message?: string; 
}

export interface ErrorWithStatusCode {
  error: number;
  message: string;
}

export interface EndpointsConfig {
  baseApiUrl: string;
  baseUrl: string;
}
