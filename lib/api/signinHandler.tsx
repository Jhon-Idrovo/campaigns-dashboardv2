import { AxiosResponse } from "axios";
import axiosInstance from "./axios";
/**
 * Raises an alert if the signin process failed.
 * @param email
 * @param password
 * @returns False if the sign in process went well. Otherwise returns the error.
 */
async function signinHandler(email: string, password: string) {
  try {
    const res = await axiosInstance.post("/auth/signin", {
      email,
      password,
    });

    if (res && typeof window !== "undefined") {
      localStorage.setItem("ss", (res as AxiosResponse).data.accessToken);
      localStorage.setItem("rr", (res as AxiosResponse).data.refreshToken);
      axiosInstance.defaults.headers.Authorization =
        "JWT " + (res as AxiosResponse).data.accessToken;
      return false;
    }
    alert("Something went wrong, please try again");
    return false;
  } catch (error) {
    return error.response.data.error as string;
  }
}

export default signinHandler;
