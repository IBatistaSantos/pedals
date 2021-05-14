import { Arg, Mutation, Resolver } from 'type-graphql';
import { container } from 'tsyringe';
import { User } from '../../../../shared/schema/entities/User';
import { CreateUserUseCase } from './CreateUseUseCase';

@Resolver(User)
class CreateUserController {
  @Mutation(() => User)
  async signUp(
    @Arg('name') name: string,
    @Arg('email') email: string,
    @Arg('password') password: string
  ): Promise<User> {
    const createUser = container.resolve(CreateUserUseCase);
    const user = await createUser.execute({ name, email, password });
    return user;
  }
}

export { CreateUserController };
