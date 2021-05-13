import { User } from "../../entities/User";
import {PrismaClient} from "@prisma/client"
import {v4 as uuidV4} from "uuid"
import { inject, injectable } from "tsyringe";
import { HashProvider } from "../../provider/HashProvider/models/HashProvider";

interface IRequest {
  name:String;
  email: String;
  password:String;
}

@injectable()
class CreateUserUseCase {
  constructor (
    @inject("HashProvider")
    private hashProvider:HashProvider
  ) {}
  async execute({name, email, password}: IRequest): Promise<User> {
    const prisma = new PrismaClient();
    const id =  uuidV4();
   const passwordHash = await this.hashProvider.generateHash(String(password));
    const user = await prisma.user.create({
      data: {
        id,
        name: String(name),
        email: String(email),
        password: passwordHash
      }
    });
    
    return user;
  }
}



export {CreateUserUseCase}