import { mockFetch } from "mock/handlers";
import { ResponseSignIn } from "models/request";

export const BASE_URL = "http://localhost:3000/api"

const headers = {
  "Content-Type": "application/json",
  "Accept": "application/json",
};

const signIn = async (body: { email: string, pass: string }): Promise<ResponseSignIn> => {
  const response = await mockFetch(`/api/login`, {
    headers: {
      ...headers,
    },
    method: "POST" as const,
    body: JSON.stringify(body),
  });
  const result = await response.json();
  return result;
}

export const apiClient = {
  signIn,
}
