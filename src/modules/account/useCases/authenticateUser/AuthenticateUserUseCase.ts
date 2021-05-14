import { sign } from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
import { HashProvider } from '../../provider/HashProvider/models/HashProvider';
import auth from '../../../../config/auth';
import { Auth } from '../../../../shared/schema/entities/Auth';
interface IRequest {
  email: string;
  password: string;
}

@injectable()
class AuthenticateUser {
  constructor(
    @inject('HashProvider')
    private hashProvider: HashProvider
  ) {}
  async execute({ email, password }: IRequest): Promise<Auth> {
    const prima = new PrismaClient();
    const user = await prima.user.findUnique({
      where: { email },
    });

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
