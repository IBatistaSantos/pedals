import { IsEmail, Length } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class UserInput {

  @Field()
  @Length(1, 255)
  name: String;

  @Field()
  @IsEmail()
  email: String;

  @Field()
  password: String;
}