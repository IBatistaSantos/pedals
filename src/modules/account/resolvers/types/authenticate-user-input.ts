import { IsEmail } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
 class AuthenticateUserInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  password: string;
}

export {AuthenticateUserInput}