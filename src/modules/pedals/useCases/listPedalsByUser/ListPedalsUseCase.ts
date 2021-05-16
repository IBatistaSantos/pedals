import { inject, injectable } from "tsyringe";
import { IResponsePedalsDTO } from "../../dtos/IResponsePedals";
import { IPedalsRepository } from "../../repositories/IPedalsRepository";

@injectable()
class ListPedalsByUserUseCase {
  constructor(
    @inject("PedalsRepository")
    private pedalsRepository: IPedalsRepository
  ) {}
  async execute(userId: string): Promise<IResponsePedalsDTO[]> {
   const pedals =  await this.pedalsRepository.findByUserId(userId);
   return pedals;
  } 
}

export {ListPedalsByUserUseCase }