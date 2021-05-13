import { User } from "../entities/User";

interface AuthenticateResponseDTO {
  token: string;
  user: User;
}

export {AuthenticateResponseDTO }