import { IReponseSubscribePedalsDTO } from "../dtos/IResponseSubscribe"
interface ISubscribePedalsRepository {
  create(id: string, user_id: string, ride_id: string): Promise<IReponseSubscribePedalsDTO>
  findByUserId(user_id: string): Promise<IReponseSubscribePedalsDTO[]>
}

export {ISubscribePedalsRepository}