import { Arg, Mutation, Resolver } from 'type-graphql';
import { container } from 'tsyringe';
import { User } from '../../entities/User';
import { UserInput } from '../../inputType/user-input';
import { CreateUserUseCase } from './CreateUseUseCase';

@Resolver(User)
class CreateUserController {
  @Mutation(() => User)
  async createUser(
    @Arg('data') { name, password, email }: UserInput
  ): Promise<User> {
    const createUser = container.resolve(CreateUserUseCase);
    const user = await createUser.execute({ name, email, password });
    return user;
  }
}

export { CreateUserController };
