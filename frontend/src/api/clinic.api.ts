import axios from "axios";
import { apiUrl } from "./apiUrl";

export const syncUserAPI = async (
  clerkId: string,
  name: string,
  email: string,
  profilePicUrl: string | null,
) => {
  return axios.post(`${apiUrl}/clinic/account/sync`, {
    clerkId,
    name,
    email,
    profilePicUrl,
  });
};

export const getProfileAPI = async (token: string) => {
  return axios.get(`${apiUrl}/clinic/account`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
