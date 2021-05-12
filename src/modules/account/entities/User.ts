import { Field, ID, ObjectType } from "type-graphql";

@ObjectType({ description: "The User model" })
class User {
  @Field(() => ID)
  id: String;  

  @Field()
  name: String;

  @Field()
  email: String;

  @Field()
  password: String;
}

export {User}