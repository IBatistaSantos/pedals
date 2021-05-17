import { IGeneratorIDProvider } from '../../../../shared/container/providers/GeneratorIDProvider/models/GeneratorIDProvider';
import { inject, injectable } from 'tsyringe';
import { IReponseSubscribePedalsDTO } from '../../dtos/IResponseSubscribe';
import { ISubscribePedalsRepository } from '../../repositories/ISubscribePedalsRepository';
import { IPedalsRepository } from '../../repositories/IPedalsRepository';
import { IDateProvider } from './../../../../shared/container/providers/DateProvider/models/IDateProvider';

interface IRequest {
  user_id: string;
  ride_id: string;
}

@injectable()
class SubscribePedalsUseCase {
  constructor(
    @inject('GeneratorID')
    private generatorIDProvider: IGeneratorIDProvider,

    @inject('SubscribeRepository')
    private subscriveRepository: ISubscribePedalsRepository,

    @inject('PedalsRepository')
    private pedalsRepository: IPedalsRepository,

    @inject('DateProvider')
    private dateProvider: IDateProvider
  ) {}
  async execute({
    user_id,
    ride_id,
  }: IRequest): Promise<IReponseSubscribePedalsDTO> {
    const id = this.generatorIDProvider.genetatorID();

    const pedals = await this.pedalsRepository.findById(ride_id);

    if (!pedals) {
      throw new Error('Pedals not found!');
    }

    const subscribeExists = await this.subscriveRepository.existsSubscribe(
      ride_id,
      user_id
    );

    if (subscribeExists) {
      throw new Error('You are already enrolled in this ride');
    }

    if (pedals.participants_limit != null) {
      const countParticipatedPedals =
        await this.subscriveRepository.countSubscribeRide(ride_id);
      if (countParticipatedPedals >= pedals.participants_limit) {
        throw new Error(' Number of participants exceeded');
      }
    }

    const permissionDateSubscribe = this.dateProvider.compareIfBefore(
      pedals.end_date_registration,
      this.dateProvider.dateNow()
    );

    if (permissionDateSubscribe) {
      throw new Error('Subscription date closed');
    }

    const subscribe = await this.subscriveRepository.create(
      id,
      user_id,
      ride_id
    );
    return subscribe;
  }
}

export { SubscribePedalsUseCase };
