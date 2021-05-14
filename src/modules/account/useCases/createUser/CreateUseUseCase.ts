import { User } from '../../entities/User';
import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
import { HashProvider } from '../../provider/HashProvider/models/HashProvider';
import { IGeneratorIDProvider } from '../../../../shared/container/providers/GeneratorIDProvider/models/GeneratorIDProvider';

interface IRequest {
  name: String;
  email: String;
  password: String;
}

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('HashProvider')
    private hashProvider: HashProvider,
    @inject('GeneratorID')
    private generatorIDProvider: IGeneratorIDProvider
  ) {}
  async execute({ name, email, password }: IRequest): Promise<User> {
    const prisma = new PrismaClient();
    const passwordHash = await this.hashProvider.generateHash(String(password));
    const user = await prisma.user.create({
      data: {
        id: this.generatorIDProvider.genetatorID(),
        name: String(name),
        email: String(email),
        password: passwordHash,
      },
    });

    return user;
  }
}

export { CreateUserUseCase };
