import { ICacheProvider } from '../../../../shared/container/providers/CacheProvider/model/ICacheProvider';
import { inject, injectable } from 'tsyringe';
import { IReponseSubscribePedalsDTO } from '../../dtos/IResponseSubscribe';
import { ISubscribePedalsRepository } from '../../repositories/ISubscribePedalsRepository';
import { ParsedCacheData } from '../../presentation/parsedCache';
@injectable()
class ListPedalsParticipatedUseCase {
  constructor(
    @inject('SubscribeRepository')
    private subscriveRepository: ISubscribePedalsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}
  async execute(userId: string): Promise<IReponseSubscribePedalsDTO[]> {
    const cacheKey = `my-pedals-participated: ${userId}`;
    let pedalsParticipated = await this.cacheProvider.recover<
      IReponseSubscribePedalsDTO[]
    >(cacheKey);

    if (!pedalsParticipated) {
      pedalsParticipated = await this.subscriveRepository.findByUserId(userId);
      await this.cacheProvider.save(cacheKey, pedalsParticipated);
      return pedalsParticipated;
    }
    const response =
      ParsedCacheData.parseSubscribePedalsDTO(pedalsParticipated);
    return response;
  }
}

export { ListPedalsParticipatedUseCase };
