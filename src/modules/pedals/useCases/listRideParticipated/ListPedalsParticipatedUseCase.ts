import { inject, injectable } from "tsyringe";
import { IReponseSubscribePedalsDTO } from "../../dtos/IResponseSubscribe";
import { ISubscribePedalsRepository } from "../../repositories/ISubscribePedalsRepository";



@injectable()
class ListPedalsParticipatedUseCase {
  constructor(
    @inject("SubscribeRepository")
    private subscriveRepository: ISubscribePedalsRepository
  ) {}
  async execute(userId: string): Promise<IReponseSubscribePedalsDTO[]> {
    const pedals = await this.subscriveRepository.findByUserId(userId)
    return pedals;
  }
}

export {ListPedalsParticipatedUseCase}