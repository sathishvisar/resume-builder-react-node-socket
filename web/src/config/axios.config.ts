import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL + `/api`

export const api = axios.create({
    baseURL,
    withCredentials: true
})


api.interceptors.response.use(
  r => r,
  err => {
    if (err.response?.status === 401) {
      // window.location.href = "/auth/login";
    }
    return Promise.reject(err);
  }
);
