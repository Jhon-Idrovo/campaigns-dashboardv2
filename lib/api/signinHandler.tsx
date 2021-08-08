import { AxiosResponse } from "axios";
import axiosInstance from "./axios";

async function signinHandler(email: string, password: string) {
  try {
    const res = await axiosInstance.post("/auth/signin", {
      email,
      password,
    });

    if (res && typeof window !== undefined) {
      localStorage.setItem("ss", (res as AxiosResponse).data.accessToken);
      localStorage.setItem("rr", (res as AxiosResponse).data.refreshToken);
      return false;
    }
    alert("Something went wrong, please try again");
    return false;
  } catch (error) {
    return error.response.data.error as string;
  }
}

export default signinHandler;
