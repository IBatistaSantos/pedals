import { User } from '../../../../shared/schema/entities/User';
import { inject, injectable } from 'tsyringe';
import { HashProvider } from '../../provider/HashProvider/models/HashProvider';
import { IGeneratorIDProvider } from '../../../../shared/container/providers/GeneratorIDProvider/models/GeneratorIDProvider';
import { IUserRepository } from '../../repositories/IUserRepository';

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
    private generatorIDProvider: IGeneratorIDProvider,

    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}
  async execute({ name, email, password }: IRequest): Promise<User> {
    const passwordHash = await this.hashProvider.generateHash(String(password));
    const id = this.generatorIDProvider.genetatorID()
    const user = await this.userRepository.create({
      id,
      name: String(name),
      email: String(email),
      password: passwordHash
    });

    return user;
  }
}

export { CreateUserUseCase };
