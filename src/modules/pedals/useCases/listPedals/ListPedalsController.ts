import { Authorized, Query, Resolver } from 'type-graphql';
import { Pedals } from '../../entities/Pedals';
import { ListPedalsUseCase } from './ListPedalsUseCase';

@Resolver(Pedals)
class ListPedalsController {
  @Query(() => [Pedals])
  @Authorized()
  async allPedals() {
    const listPedals = new ListPedalsUseCase();
    const pedals = await listPedals.execute();
    return pedals;
  }
}

export { ListPedalsController };
