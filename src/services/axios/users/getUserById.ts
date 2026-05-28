import api from "@/services/axios/api";
import { UserDTO } from "@/types/userDTO";

export const getUserById = async (firebaseUuid: string): Promise<UserDTO> => {
  const response = await api.get<UserDTO>("/user?firebaseUuid=" + firebaseUuid);
  return response.data;
};
