import { IContext } from '../../../../shared/infra/http/middleware/ensureAuthenticated';
import { Authorized, Ctx, Query, Resolver } from 'type-graphql';
import { Pedals } from '../../entities/Pedals';
import { ListPedalsByUserUseCase } from './ListPedalsUseCase';

@Resolver()
class ListPedalsByUserController {
  @Query(() => [Pedals])
  @Authorized()
  async findPedalsByUserId(@Ctx() ctx: IContext) {
    const userId = ctx.userId as string;
    const listPedalsByUserId = new ListPedalsByUserUseCase();
    const pedals = await listPedalsByUserId.execute(userId);
    return pedals;
  }
}

export { ListPedalsByUserController };
