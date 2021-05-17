import { IResponsePedalsDTO } from '../dtos/IResponsePedals';
import { IReponseSubscribePedalsDTO } from '../dtos/IResponseSubscribe';
class ParsedCacheData {
  static parseSubscribePedalsDTO(
    array: IReponseSubscribePedalsDTO[]
  ): IReponseSubscribePedalsDTO[] {
    const response: IReponseSubscribePedalsDTO[] = [];
    array.map((subscribe) => {
      const parsedData: IReponseSubscribePedalsDTO = {
        id: subscribe.id,
        user_id: subscribe.user_id,
        ride_id: subscribe.ride_id,
        subscription_date: subscribe.subscription_date,
        user: {
          id: subscribe.user?.id as string,
          name: subscribe.user?.name as string,
          email: subscribe.user?.email as string,
          password: subscribe.user?.password as string,
        },
        pedals: {
          id: subscribe.pedals?.id as string,
          name: subscribe.pedals?.name as string,
          start_date: new Date(subscribe.pedals?.start_date as Date),
          start_place: new Date(subscribe.pedals?.start_place as Date),
          start_date_registration: new Date(
            subscribe.pedals?.start_date_registration as Date
          ),
          end_date_registration: new Date(
            subscribe.pedals?.end_date_registration as Date
          ),
          additional_information: subscribe.pedals
            ?.additional_information as string,
          participants_limit: subscribe.pedals?.participants_limit as number,
          userId: subscribe.pedals?.userId as string,
          createdAt: new Date(subscribe.pedals?.createdAt as Date),
          user: {
            id: subscribe.pedals?.user?.id as string,
            name: subscribe.pedals?.user?.name as string,
            email: subscribe.pedals?.user?.email as string,
            password: subscribe.pedals?.user?.password as string,
          },
        },
      };

      response.push(parsedData);
    });

    return response;
  }

  static parseResponsePedalsDTO(
    array: IResponsePedalsDTO[]
  ): IResponsePedalsDTO[] {
    const response: IResponsePedalsDTO[] = [];
    array.map((pedal) => {
      if (!array) return;
      const pedalParse: IResponsePedalsDTO = {
        id: pedal.id,
        name: pedal.name,
        start_date: new Date(pedal.start_date),
        start_place: new Date(pedal.start_place),
        start_date_registration: new Date(pedal.start_date_registration),
        end_date_registration: new Date(pedal.end_date_registration),
        additional_information: pedal.additional_information,
        participants_limit: pedal.participants_limit,
        userId: pedal.userId,
        createdAt: new Date(pedal.createdAt),
        user: {
          id: pedal.user?.id as string,
          name: pedal.user?.name as string,
          email: pedal.user?.email as string,
          password: pedal.user?.password as string,
        },
      };

      response.push(pedalParse);
    });

    return response;
  }
}
export { ParsedCacheData };
