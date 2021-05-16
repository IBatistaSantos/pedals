import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
import { IResponsePedalsDTO } from '../../dtos/IResponsePedals';
import { IPedalsRepository } from '../../repositories/IPedalsRepository';

@injectable()
class ListPedalsUseCase {
  constructor(
    @inject("PedalsRepository")
    private pedalsRepository: IPedalsRepository
  ) {}
  async execute(userId: string): Promise<IResponsePedalsDTO[]> {
    const pedals = await this.pedalsRepository.findAll(userId)
    return pedals
  }
}

export { ListPedalsUseCase };
