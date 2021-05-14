import { Field, InputType } from 'type-graphql';

@InputType()
export class PedalsInput {
  @Field()
  name: string;

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
}
