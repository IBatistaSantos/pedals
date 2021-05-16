import { IResponsePedalsDTO } from "./IResponsePedals";

interface IReponseSubscribePedalsDTO {
  user_id: string;
  ride_id: string;
  subscription_date: Date;
  user?:{
   id: string;
   name: string;
   email: string;
   password: string;
  },
  pedals?: IResponsePedalsDTO
}

export {IReponseSubscribePedalsDTO}