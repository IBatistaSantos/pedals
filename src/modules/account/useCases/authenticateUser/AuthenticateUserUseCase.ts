import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import { HashProvider } from '../../provider/HashProvider/models/HashProvider';
import auth from '../../../../config/auth';
import { Auth } from '../../../../shared/schema/entities/Auth';
import { IUserRepository } from '../../repositories/IUserRepository';
interface IRequest {
  email: string;
  password: string;
}

@injectable()
class AuthenticateUser {
  constructor(
    @inject('HashProvider')
    private hashProvider: HashProvider,
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}
  async execute({ email, password }: IRequest): Promise<Auth> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error('Email or password incorrect');
    }

    const passwordMatch = await this.hashProvider.compareHash(
      password,
      user.password
    );

    if (!passwordMatch) {
      throw new Error('Email or password incorrect');
    }

    const token = sign({}, auth.secret_token, {
      subject: user.id,
      expiresIn: auth.expires_in_token,
    });

    const tokenResponse: Auth = {
      token,
      user,
    };

    return tokenResponse;
  }
}

export { AuthenticateUser };
