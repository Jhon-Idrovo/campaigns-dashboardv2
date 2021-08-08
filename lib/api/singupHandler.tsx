import { AxiosResponse } from "axios";
import axiosInstance from "./axios";

async function signupHandler(
  username: string,
  email: string,
  password: string
) {
  const res = await axiosInstance
    .post("/auth/signup", {
      username,
      email,
      password,
    })
    .catch(() => false);
  if (res && typeof window !== undefined) {
    localStorage.setItem("ss", (res as AxiosResponse).data.accessToken);
    localStorage.setItem("rr", (res as AxiosResponse).data.refreshToken);
    return true;
  }
  return false;
}

export default signupHandler;
