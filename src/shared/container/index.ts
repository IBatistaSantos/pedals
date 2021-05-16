import { IUserRepository } from '../../modules/account/repositories/IUserRepository';
import { container } from 'tsyringe';
import './providers';
import { UserRepository } from '../../modules/account/infra/prisma/UserRepository';
import { IPedalsRepository } from '../..//modules/pedals/repositories/IPedalsRepository';
import { PedalsRepository } from '../../modules/pedals/infra/prisma/PedalsRepository';


container.registerSingleton<IUserRepository>("UserRepository", UserRepository);
container.registerSingleton<IPedalsRepository>("PedalsRepository", PedalsRepository);