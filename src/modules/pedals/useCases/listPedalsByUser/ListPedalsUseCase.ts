import { ICacheProvider } from '../../../../shared/container/providers/CacheProvider/model/ICacheProvider';
import { inject, injectable } from 'tsyringe';
import { IResponsePedalsDTO } from '../../dtos/IResponsePedals';
import { IPedalsRepository } from '../../repositories/IPedalsRepository';
import { ParsedCacheData } from '../../presentation/parsedCache';

@injectable()
class ListPedalsByUserUseCase {
  constructor(
    @inject('PedalsRepository')
    private pedalsRepository: IPedalsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}
  async execute(userId: string): Promise<IResponsePedalsDTO[]> {
    const cacheKey = `my-pedals: ${userId}`;
    let pedals = await this.cacheProvider.recover<IResponsePedalsDTO[]>(
      cacheKey
    );

    if (!pedals) {
      pedals = await this.pedalsRepository.findByUserId(userId);
      await this.cacheProvider.save(cacheKey, pedals);
      return pedals;
    }
    const response = ParsedCacheData.parseResponsePedalsDTO(pedals);
    return response;
  }
}

export { ListPedalsByUserUseCase };
