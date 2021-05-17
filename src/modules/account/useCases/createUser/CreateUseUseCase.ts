import { User } from '../../../../shared/schema/entities/User';
import { inject, injectable } from 'tsyringe';
import { HashProvider } from '../../provider/HashProvider/models/HashProvider';
import { IGeneratorIDProvider } from '../../../../shared/container/providers/GeneratorIDProvider/models/GeneratorIDProvider';
import { IUserRepository } from '../../repositories/IUserRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('HashProvider')
    private hashProvider: HashProvider,
    @inject('GeneratorID')
    private generatorIDProvider: IGeneratorIDProvider,

    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}
  async execute({ name, email, password }: IRequest): Promise<User> {
    const passwordHash = await this.hashProvider.generateHash(password);
    const id = this.generatorIDProvider.genetatorID();

    const userExists = await this.userRepository.findByEmail(email);

    if (userExists) {
      throw new Error('E-mail already registered');
    }

    const user = await this.userRepository.create({
      id,
      name: String(name),
      email: String(email),
      password: passwordHash,
    });

    return user;
  }
}

export { CreateUserUseCase };
