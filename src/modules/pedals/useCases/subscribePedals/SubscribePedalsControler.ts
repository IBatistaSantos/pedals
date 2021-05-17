import { Subscribe } from '../../../../shared/schema/entities/Subscribe';
import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import { IContext } from '../../../../shared/infra/http/middleware/ensureAuthenticated';
import { container } from 'tsyringe';
import { SubscribePedalsUseCase } from './SubscribePedalsUseCase';
import { IReponseSubscribePedalsDTO } from '../../dtos/IResponseSubscribe';

@Resolver(Subscribe)
class SubscribePedalsControler {
  @Mutation(() => Subscribe)
  @Authorized()
  async subscribePedals(
    @Arg('ride_id', { nullable: false }) ride_id: string,
    @Ctx() context: IContext
  ): Promise<IReponseSubscribePedalsDTO> {
    const subscriptionUseCase = container.resolve(SubscribePedalsUseCase);
    const user_id = context.userId as string;
    const subscrivePedals = await subscriptionUseCase.execute({
      user_id,
      ride_id,
    });
    return subscrivePedals;
  }
}

export { SubscribePedalsControler };
