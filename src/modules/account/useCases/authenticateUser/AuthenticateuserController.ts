import { Arg, Mutation, Resolver } from 'type-graphql';
import { container } from 'tsyringe';
import { AuthenticatePayload } from '../../entities/AuthenticatePayload';
import { AuthenticateUserInput } from '../../inputType/authenticate-user-input';
import { AuthenticateUser } from './AuthenticateUserUseCase';

@Resolver(AuthenticatePayload)
class AuthenticateUserController {
  @Mutation(() => AuthenticatePayload)
  async signIn(
    @Arg('data') { email, password }: AuthenticateUserInput
  ): Promise<AuthenticatePayload> {
    const authenticateUser = container.resolve(AuthenticateUser);
    const user = await authenticateUser.execute({ email, password });
    return user;
  }
}

export { AuthenticateUserController };
