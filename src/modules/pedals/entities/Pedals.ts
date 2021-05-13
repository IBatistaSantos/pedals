import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
class Pedals {
  @Field(() => ID)
  id: String;  

  @Field()
  name: String;

  @Field()
  start_date: Date;

  @Field()
  start_date_registration: Date;

  @Field()
  end_date_registration: Date;

  @Field()
  start_place: Date;

  @Field()
  userId: string;

  @Field()
  createdAt: Date;
}

export {Pedals}