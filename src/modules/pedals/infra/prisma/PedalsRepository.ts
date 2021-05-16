import { PrismaClient } from "../../../../shared/infra/prisma/PrismaClient";
import { IPedalsRepository } from "../../repositories/IPedalsRepository";
import { ICreatePedalsDTO } from "../../dtos/ICreatePedals";
import { IResponsePedalsDTO } from "../../dtos/IResponsePedals";


class PedalsRepository implements  IPedalsRepository {

  private client =  PrismaClient.getInstance();

  async findByUserId(userId: string): Promise<IResponsePedalsDTO[]> {
   const pedals =  await this.client.pedals.findMany({
      where: {userId},
      include: {
        user: true
      }
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
      include: {
        user: true
      }
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
        userId: pedal.userId,
        user: {
          id: pedal.user.id,
          name: pedal.user.name,
          email: pedal.user.email,
          password: pedal.user.password
        },
        createdAt: pedal.createdAt,
        
      })
    })
    
    return response;
  }

  async findById(id: string): Promise<IResponsePedalsDTO| null> {
    const pedal = await this.client.pedals.findUnique({
    where: {id},
  });

  if (!pedal) {
    return null;
  }
  const response: IResponsePedalsDTO  = {
    id: pedal.id,
    name: pedal.name,
    additional_information: pedal.additional_information,
    end_date_registration: pedal.end_date_registration, 
    start_date_registration: pedal.start_date_registration,
    start_date: pedal.start_date,
    participants_limit: pedal.participants_limit,
    start_place: pedal.start_place,
    userId: pedal.userId,
    createdAt: pedal.createdAt,
  }
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