import { inject, injectable } from 'tsyringe';
import { IGeneratorIDProvider } from '../../../../shared/container/providers/GeneratorIDProvider/models/GeneratorIDProvider';
import { IResponsePedalsDTO } from '../../dtos/IResponsePedals';
import { IPedalsRepository } from '../../repositories/IPedalsRepository';
import { IRequest } from '../../dtos/ICreatePedals';
import { ICacheProvider } from '../../../../shared/container/providers/CacheProvider/model/ICacheProvider';

@injectable()
class CreatePedalsUseCase {
  constructor(
    @inject('GeneratorID')
    private generatorIDProvider: IGeneratorIDProvider,
    @inject('PedalsRepository')
    private pedalsRepository: IPedalsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}
  async execute({
    name,
    start_date,
    start_date_registration,
    start_place,
    end_date_registration,
    additional_information,
    participants_limit,
    userId,
  }: IRequest): Promise<IResponsePedalsDTO> {
    const id = this.generatorIDProvider.genetatorID();
    const cacheKey = `my-pedals: ${userId}`;
    const pedals = await this.pedalsRepository.create({
      id,
      name: String(name),
      start_date,
      start_date_registration,
      start_place,
      end_date_registration,
      additional_information,
      participants_limit,
      userId,
    });

    await this.cacheProvider.invalidate(cacheKey);
    return pedals;
  }
}

export { CreatePedalsUseCase };
