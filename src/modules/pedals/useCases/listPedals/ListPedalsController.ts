import { Authorized, Query, Resolver } from 'type-graphql';
import { Pedals } from '../../../../shared/schema/entities/Pedals';
import { ListPedalsUseCase } from './ListPedalsUseCase';

@Resolver(Pedals)
class ListPedalsController {
  @Query(() => [Pedals])
  @Authorized()
  async pedals() {
    const listPedals = new ListPedalsUseCase();
    const pedals = await listPedals.execute();
    return pedals;
  }
}

export { ListPedalsController };
