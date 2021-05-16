import { IContext } from '../../../../shared/infra/http/middleware/ensureAuthenticated';
import { Authorized, Ctx, Query, Resolver } from 'type-graphql';
import { Pedals } from '../../../../shared/schema/entities/Pedals';
import { ListPedalsByUserUseCase } from './ListPedalsUseCase';
import { container } from 'tsyringe';

@Resolver()
class ListPedalsByUserController {
  @Query(() => [Pedals])
  @Authorized()
  async myPedals(@Ctx() ctx: IContext) {
    const userId = ctx.userId as string;
    const listPedalsByUserId = container.resolve(ListPedalsByUserUseCase);
    const pedals = await listPedalsByUserId.execute(userId);
    return pedals;
  }
}

export { ListPedalsByUserController };
