import { PrismaClient } from "@prisma/client";
import { Pedals } from "../../entities/Pedals";

class ListPedalsUseCase {
  async execute(): Promise<Pedals[]> {
    const prisma = new PrismaClient();
   const pedals = await prisma.pedals.findMany()
    return pedals
  } 
}

export {ListPedalsUseCase }