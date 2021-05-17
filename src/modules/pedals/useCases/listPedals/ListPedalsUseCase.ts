import { ICacheProvider } from '../../../../shared/container/providers/CacheProvider/model/ICacheProvider';
import { inject, injectable } from 'tsyringe';
import { IResponsePedalsDTO } from '../../dtos/IResponsePedals';
import { IPedalsRepository } from '../../repositories/IPedalsRepository';

@injectable()
class ListPedalsUseCase {
  constructor(
    @inject('PedalsRepository')
    private pedalsRepository: IPedalsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}
  async execute(userId: string): Promise<IResponsePedalsDTO[]> {
    const pedals = await this.pedalsRepository.findAll(userId);
    return pedals;
  }
}

export { ListPedalsUseCase };
