import { PrismaClient } from "@prisma/client";
import { Pedals } from "../../entities/Pedals";

class ListPedalsByUserUseCase {
  async execute(userId: string): Promise<Pedals[]> {
    const prisma = new PrismaClient();
   const pedals = await prisma.pedals.findMany({
     where: {userId}
   })
    return pedals
  } 
}

export {ListPedalsByUserUseCase }