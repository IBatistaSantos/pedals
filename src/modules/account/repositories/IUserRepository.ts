import {User} from "../../../shared/schema/entities/User"
import {ICreateUserDTO} from "../dtos/ICreateUser"
interface IUserRepository {
  create({ name,email, password}: ICreateUserDTO): Promise<User>
  findByEmail(email: string): Promise<User | null>
}

export {IUserRepository}