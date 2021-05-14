import { PrismaClient } from '@prisma/client';
import { Pedals } from '../../entities/Pedals';
import { inject, injectable } from 'tsyringe';
import { IGeneratorIDProvider } from 'src/shared/container/providers/GeneratorIDProvider/models/GeneratorIDProvider';

interface IRequest {
  name: string;
  start_date: Date;
  start_date_registration: Date;
  start_place: Date;
  end_date_registration: Date;
  additional_information: string;
  participants_limit: number;
  userId: string;
}

@injectable()
class CreatePedalsUseCase {
  constructor(
    @inject('GeneratorID')
    private generatorIDProvider: IGeneratorIDProvider
  ) {}
  async execute({
    name,
    start_date,
    start_date_registration,
    start_place,
    end_date_registration,
    userId,
  }: IRequest): Promise<Pedals> {
    const prisma = new PrismaClient();
    const pedals = await prisma.pedals.create({
      data: {
        id: this.generatorIDProvider.genetatorID(),
        name: String(name),
        start_date,
        start_date_registration,
        end_date_registration,
        start_place,
        userId,
      },
    });

    return pedals;
  }
}

export { CreatePedalsUseCase };
