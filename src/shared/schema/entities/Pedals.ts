import { Field, ID, ObjectType } from 'type-graphql';
import {User} from "./User";

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

  @Field({ nullable: true })
  additional_information: string;

  @Field({ nullable: true })
  participants_limit: number;

  @Field()
  userId: string;

  @Field()
  createdAt: Date;

  @Field()
  user: User
}

export { Pedals };
