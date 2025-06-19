import { api } from "@/config/axios.config";

export interface UserResponse {
  user: any;
}


const UserInfo = async function () {
    const { data } = await api.get<UserResponse>('/user/info')
    return data
}

export const userService = { UserInfo };