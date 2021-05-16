import {User} from "./User"
import {Pedals} from "./Pedals"
import { Field, ObjectType } from "type-graphql";

@ObjectType()
class Subscribe {
  @Field({ nullable: false })
  user_id: string;

  @Field({ nullable: false })
  ride_id: string;

  @Field()
  user: User

  @Field()
  pedals: Pedals
}


export { Subscribe}