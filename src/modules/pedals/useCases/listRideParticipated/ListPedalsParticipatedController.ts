import { container } from "tsyringe";
import { Authorized, Ctx, Query, Resolver } from "type-graphql";
import { IContext } from "../../../../shared/infra/http/middleware/ensureAuthenticated";
import { Subscribe } from "../../../../shared/schema/entities/Subscribe";
import {IReponseSubscribePedalsDTO} from "../../dtos/IResponseSubscribe"
import { ListPedalsParticipatedUseCase } from "./ListPedalsParticipatedUseCase";

@Resolver(Subscribe)
class ListPedalsParticipatedController {

  @Query(() => [Subscribe])
  @Authorized()
  async allPedalsParticipated(
    @Ctx() context: IContext
  ): Promise<IReponseSubscribePedalsDTO[]> {
    const listPedalsParticipatedUseCase = container.resolve(ListPedalsParticipatedUseCase);
    const userId = context.userId as string
    const pedals = await listPedalsParticipatedUseCase.execute(userId);
    return pedals
  }
}

export {ListPedalsParticipatedController}