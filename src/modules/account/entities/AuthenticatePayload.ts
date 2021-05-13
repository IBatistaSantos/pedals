import { Field, ID, ObjectType } from "type-graphql";
import { User } from "./User";

@ObjectType()
class AuthenticatePayload {
  @Field()
  token: String;  

  @Field()
  user: User;


}

export {AuthenticatePayload}