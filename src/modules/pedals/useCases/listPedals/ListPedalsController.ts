import { IContext } from '../../../../shared/infra/http/middleware/ensureAuthenticated';
import { Authorized, Ctx, Query, Resolver } from 'type-graphql';
import { Pedals } from '../../../../shared/schema/entities/Pedals';
import { ListPedalsUseCase } from './ListPedalsUseCase';
import { container } from 'tsyringe';

@Resolver(Pedals)
class ListPedalsController {
  @Query(() => [Pedals])
  @Authorized()
  async pedals(@Ctx() ctx: IContext) {
    const userId = ctx.userId as string;
    const listPedals = container.resolve(ListPedalsUseCase);
    const pedals = await listPedals.execute(userId);
    return pedals;
  }
}

export { ListPedalsController };
