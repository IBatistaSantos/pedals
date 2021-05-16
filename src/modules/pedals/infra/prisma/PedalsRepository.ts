import { Pedals } from "../../../../shared/schema/entities/Pedals";
import { PrismaClient } from "../../../../shared/infra/prisma/PrismaClient";
import { IPedalsRepository } from "../../repositories/IPedalsRepository";
import { ICreatePedalsDTO } from "../../dtos/ICreatePedals";
import { IResponsePedalsDTO } from "../../dtos/IResponsePedals";


class PedalsRepository implements  IPedalsRepository {
  private client =  PrismaClient.getInstance();

  async findByUserId(userId: string): Promise<IResponsePedalsDTO[]> {
   const pedals =  await this.client.pedals.findMany({
      where: {userId}
    })

    return pedals
  }

 async findAll(userId: string): Promise<IResponsePedalsDTO[]> {
  const response: IResponsePedalsDTO[] = []
  const pedals = await this.client.pedals.findMany({
      where: {
        NOT: {
          userId: {
            equals: userId,
          },
        },
      },
    })

    pedals.map(pedal => {
      response.push({
        id: pedal.id,
        name: pedal.name,
        additional_information: pedal.additional_information,
        end_date_registration: pedal.end_date_registration, 
        start_date_registration: pedal.start_date_registration,
        start_date: pedal.start_date,
        participants_limit: pedal.participants_limit,
        start_place: pedal.start_place,
        createdAt: pedal.createdAt,
        userId: pedal.userId
      })
    })
    
    return response;
  }

  async create({
    id, 
    name, 
    start_date, 
    start_date_registration, 
    end_date_registration, 
    start_place, 
    additional_information, 
    participants_limit, 
    userId }: ICreatePedalsDTO): Promise<IResponsePedalsDTO> {
    const pedals = await this.client.pedals.create({
      data: {
        id: String(id),
        name: String(name),
        start_date,
        start_date_registration,
        end_date_registration,
        start_place,
        additional_information,
        participants_limit,
        userId,
      },
    });

    return pedals

  }
}

export {PedalsRepository }