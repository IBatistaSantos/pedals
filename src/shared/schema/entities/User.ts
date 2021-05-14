import { Field, ID, ObjectType } from 'type-graphql';
import { Node } from './Node';

@ObjectType({ implements: Node })
class User implements Node {
  @Field((type) => ID, { nullable: false })
  id: any;

  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  password: string;
}

export { User };
