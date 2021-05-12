import { User } from "../../entities/User";
import {PrismaClient} from "@prisma/client"
import {v4 as uuidV4} from "uuid"

interface IRequest {
  name:String;
  email: String;
  password:String;
}

class CreateUserUseCase {
  constructor () {
 
 }
  async execute({name, email, password}: IRequest): Promise<User> {
    const prisma = new PrismaClient();
    const id =  uuidV4();
   
    const user = await prisma.user.create({
      data: {
        id,
        name: String(name),
        email: String(email),
        password: String(password)
      }
    });
    
    return user;
  }
}



export {CreateUserUseCase}