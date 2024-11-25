import axios from "axios";
import {
  UserRegister,
  UserLogin,
} from "../components/types/user.types";
import * as jose from "jose";

const API_BASE_URL = "http://localhost:4000/";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const register = (userData: UserRegister) => 
    api.post("users/register", userData);
  

export const login = async (userData: UserLogin) => {
  try {
    const response = await api.post<{ token: string }>("users/login", userData);

    const { token } = response.data;
    localStorage.setItem("accessToken", token);

    const decodedToken = jose.decodeJwt(token);

    const userResponse = await api.get(`/users/${decodedToken.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const user: any = userResponse.data;
    localStorage.setItem("auth", JSON.stringify(user.details));

    return response;
  } catch (error: any) {
    console.error("Login error:", error);
    throw error;
  }
};




