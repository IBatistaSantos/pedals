import { CreateUserUseCase } from "../useCases/createUser/CreateUseUseCase";
import { Arg, Mutation, Query } from "type-graphql";
import { User } from "../entities/User";
import { UserInput } from "./types/user-input";


class UserResolver {
  @Mutation(() => User)
  async createUser(@Arg("data"){name, password, email}: UserInput): Promise<User> { 
    const createUser = new CreateUserUseCase();
    const user = await createUser.execute({name, email, password})
    return user;
  };

  @Query(() => [User])
  async returnAllUsers(){
    return ;
  };


}

export {UserResolver}