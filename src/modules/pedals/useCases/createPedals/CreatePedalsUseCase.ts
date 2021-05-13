import { PrismaClient } from "@prisma/client";
import { Pedals } from "../../entities/Pedals";
import {v4 as uuidV4} from "uuid"

interface IRequest {
  name: string, 
  start_date: Date, 
  start_date_registration : Date, 
  start_place: Date, 
  end_date_registration: Date, 
  additional_information: string,
  participants_limit:number,
  userId: string
}

class CreatePedalsUseCase {

  async execute({
    name,
     start_date, 
     start_date_registration, 
     start_place, 
     end_date_registration,
     userId 
    }:IRequest ): Promise<Pedals> {
       const prisma = new PrismaClient();
      const id = uuidV4();

      const pedals = await prisma.pedals.create({
         data: {
           id,
           name: String(name),
           start_date,
           start_date_registration, 
           end_date_registration, 
           start_place, 
           userId,
         }
       });

       return pedals;
  }
}


export {CreatePedalsUseCase}