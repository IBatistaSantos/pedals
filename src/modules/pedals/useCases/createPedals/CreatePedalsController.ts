import { Arg, Authorized, Mutation, Resolver } from 'type-graphql';
import { container } from 'tsyringe';
import { Pedals } from '../../entities/Pedals';

import { CreatePedalsUseCase } from './CreatePedalsUseCase';

@Resolver(Pedals)
class CreatePedalsController {
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
    const createPedals = container.resolve(CreatePedalsUseCase);
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
}

export { CreatePedalsController };
