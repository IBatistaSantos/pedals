import { Arg, Authorized, Ctx, Mutation, Query } from 'type-graphql';
import { Pedals } from '../entities/Pedals';
import { CreatePedalsUseCase } from '../useCases/createPedals/CreatePedalsUseCase';
import { ListPedalsUseCase } from '../useCases/listPedals/ListPedalsUseCase';
import { ListPedalsByUserUseCase } from '../useCases/listPedalsByUser/ListPedalsUseCase';
import { IContext } from '../../../shared/infra/http/middleware/ensureAuthenticated';
class PedalsResolver {
  @Mutation(() => Pedals)
  @Authorized()
  async createPedals(
    @Arg('name') name: string,
    @Arg('start_date') start_date: Date,
    @Arg('start_date_registration') start_date_registration: Date,
    @Arg('start_place') start_place: Date,
    @Arg('end_date_registration') end_date_registration: Date,
    @Arg('additional_information', { nullable: true })
    additional_information: string,
    @Arg('participants_limit', { nullable: true }) participants_limit: number,
    @Arg('userId') userId: string
  ): Promise<Pedals> {
    const createPedals = new CreatePedalsUseCase();
    const pedals = await createPedals.execute({
      name,
      start_date,
      start_date_registration,
      start_place,
      end_date_registration,
      additional_information,
      participants_limit,
      userId,
    });

    return pedals;
  }

  @Query(() => [Pedals])
  @Authorized()
  async allPedals() {
    const listPedals = new ListPedalsUseCase();
    const pedals = await listPedals.execute();
    return pedals;
  }

  @Query(() => [Pedals])
  @Authorized()
  async findPedalsByUserId(@Ctx() ctx: IContext) {
    const userId = ctx.userId as string;
    const listPedalsByUserId = new ListPedalsByUserUseCase();
    const pedals = await listPedalsByUserId.execute(userId);
    return pedals;
  }
}

export { PedalsResolver };
