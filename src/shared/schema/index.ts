import { buildSchemaSync } from 'type-graphql';
import { CreateUserController } from '../../modules/account/useCases/createUser/CreateUserController';
import { AuthenticateUserController } from '../../modules/account/useCases/authenticateUser/AuthenticateuserController';
import { ensuredAuthenticated } from '../infra/http/middleware/ensureAuthenticated';
import { CreatePedalsController } from '../../modules/pedals/useCases/createPedals/CreatePedalsController';
import { ListPedalsByUserController } from '../../modules/pedals/useCases/listPedalsByUser/ListPedalsByUserController';
import { ListPedalsController } from '../../modules/pedals/useCases/listPedals/ListPedalsController';
import { SubscribePedalsControler } from '../../modules/pedals/useCases/subscribePedals/SubscribePedalsControler';
import { ListPedalsParticipatedController } from '../../modules/pedals/useCases/listRideParticipated/ListPedalsParticipatedController';

import { User } from './entities/User';
import { Auth } from './entities/Auth';
import { Node } from './entities/Node';
import { Pedals } from './entities/Pedals';
import { Subscribe } from './entities/Subscribe';

const schema = buildSchemaSync({
  resolvers: [
    User,
    Auth,
    Node,
    Pedals,
    CreateUserController,
    AuthenticateUserController,
    CreatePedalsController,
    ListPedalsController,
    ListPedalsByUserController,
    Subscribe,
    SubscribePedalsControler,
    ListPedalsParticipatedController
  ],
  authChecker: ensuredAuthenticated,
  emitSchemaFile: true,
  validate: false,
});

export { schema };
