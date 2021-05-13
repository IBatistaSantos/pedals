import { CreateUserUseCase } from "../useCases/createUser/CreateUseUseCase";
import { Arg, Mutation, Query } from "type-graphql";
import { User } from "../entities/User";
import { UserInput } from "./types/user-input";
import { container } from "tsyringe";
import { AuthenticateUserInput } from "./types/authenticate-user-input";
import { AuthenticateUser } from "../useCases/authenticateUser/AuthenticateUserUseCase";
import { AuthenticatePayload } from "../entities/AuthenticatePayload";
import { AuthenticateResponseDTO } from "../dtos/AuthenticateResponse";


class UserResolver {
  @Mutation(() => User)
  async createUser(@Arg("data"){name, password, email}: UserInput): Promise<User> { 
    const createUser = container.resolve(CreateUserUseCase);
    const user = await createUser.execute({name, email, password})
    return user;
  };

  @Mutation(() => AuthenticatePayload)
  async login(@Arg("data"){email, password}: AuthenticateUserInput):Promise<AuthenticatePayload> {
    const authenticateUser = container.resolve(AuthenticateUser)
    const user = await authenticateUser.execute({email, password});
    return user;
  }
  
  @Query(() => [User])
  async returnAllUsers(){
    return ;
  };

}

export {UserResolver}