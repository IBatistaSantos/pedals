import { PrismaClient } from '@prisma/client';
import { Pedals } from '../../../../shared/schema/entities/Pedals';

class ListPedalsUseCase {
  async execute(): Promise<Pedals[]> {
    const prisma = new PrismaClient();
    const pedals = await prisma.pedals.findMany();
    return pedals;
  }
}

export { ListPedalsUseCase };
