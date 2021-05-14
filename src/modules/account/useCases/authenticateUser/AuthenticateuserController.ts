import { Arg, Mutation, Resolver } from 'type-graphql';
import { container } from 'tsyringe';
import { AuthenticateUser } from './AuthenticateUserUseCase';
import { Auth } from '../../../../shared/schema/entities/Auth';

@Resolver(Auth)
class AuthenticateUserController {
  @Mutation(() => Auth)
  async signIn(
    @Arg('email') email: string,
    @Arg('password') password: string
  ): Promise<Auth> {
    const authenticateUser = container.resolve(AuthenticateUser);
    const user = await authenticateUser.execute({ email, password });
    return user;
  }
}

export { AuthenticateUserController };
