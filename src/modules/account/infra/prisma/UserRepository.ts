import { User } from "../../../../shared/schema/entities/User";
import { ICreateUserDTO } from "../../dtos/ICreateUser";
import { IUserRepository } from "../../repositories/IUserRepository";
import { PrismaClient } from "../../../../shared/infra/prisma/PrismaClient";

class UserRepository implements  IUserRepository {
  private client =  PrismaClient.getInstance();
  async create({ name, email, password, id }: ICreateUserDTO): Promise<User> {
    const user = await this.client.user.create({
      data: {
        id,
        name: String(name),
        email: String(email),
        password,
      },
    });

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.client.user.findUnique({
      where: {email}
    })   

    return user;
  }

}

export {UserRepository}