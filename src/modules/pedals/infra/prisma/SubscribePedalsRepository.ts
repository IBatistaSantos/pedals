import { PrismaClient } from "../../../../shared/infra/prisma/PrismaClient";
import { IReponseSubscribePedalsDTO } from "../../dtos/IResponseSubscribe";
import { ISubscribePedalsRepository } from "../../repositories/ISubscribePedalsRepository";



class SubscribePedalsRepository implements ISubscribePedalsRepository {
 private client =  PrismaClient.getInstance();
  
  async create(id: string, user_id: string, ride_id: string): Promise<IReponseSubscribePedalsDTO> {
    const subscribe = await this.client.subscribe.create({
      data: {
        id,
        user_id,
        ride_id
      },
      include: {
        user: true,
        pedals: {
          include: {
            user: true
          }
        }
      }
    })

    const response: IReponseSubscribePedalsDTO = {
      user_id: subscribe.user_id,
      ride_id: subscribe.ride_id,
      subscription_date: subscribe.subscription_date,
      user: {
        id: subscribe.user.id,
        name: subscribe.user.name,
        email: subscribe.user.email,
        password: subscribe.user.password
      },
      pedals: {
        id: subscribe.pedals.id,
        name: subscribe.pedals.name,
        start_date: subscribe.pedals.start_date,
        start_date_registration: subscribe.pedals.start_date_registration,
        end_date_registration: subscribe.pedals.end_date_registration,
        userId: subscribe.user_id,
        start_place: subscribe.pedals.start_date,
        additional_information: subscribe.pedals.additional_information,
        participants_limit: subscribe.pedals.participants_limit,
        createdAt: subscribe.pedals.createdAt,
       user: {
         id: subscribe.pedals.user.id,
         email: subscribe.pedals.user.email,
         password: subscribe.pedals.user.password,
         name: subscribe.pedals.user.name,
       }

      }
    }

    return response;
  }

  async findByUserId(user_id: string): Promise<IReponseSubscribePedalsDTO[]> {
   const pedals = await this.client.subscribe.findMany({
     where: {user_id},
     include: {
       user: true,
       pedals: {
         include: {
           user: true
         }
       }
     }
   });

   return pedals
  }
}


export {SubscribePedalsRepository}