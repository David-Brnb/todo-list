import api from "@/services/axios/api";
import { CreateUserDTO } from "@/types/createUserDTO";
import { UserDTO } from "@/types/userDTO";

export const createUser = async (data: CreateUserDTO): Promise<UserDTO> => {
  const response = await api.post<UserDTO>("/user", data);
  return response.data;
};
