import { AxiosResponse } from "axios";
import axiosInstance from "./axios";
/**
 *
 * @param username
 * @param email
 * @param password
 * @returns True if the proccess went well. Otherwise false.
 */
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
    axiosInstance.defaults.headers["x-access-token"] = (
      res as AxiosResponse
    ).data.accessToken;
    return true;
  }
  return false;
}

export default signupHandler;
