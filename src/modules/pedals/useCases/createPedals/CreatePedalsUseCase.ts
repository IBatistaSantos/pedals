import { PrismaClient } from '@prisma/client';
import { Pedals } from '../../../../shared/schema/entities/Pedals';
import { inject, injectable } from 'tsyringe';
import { IGeneratorIDProvider } from 'src/shared/container/providers/GeneratorIDProvider/models/GeneratorIDProvider';

type IRequest = Omit<Pedals, 'id' | 'createdAt'>;

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
    additional_information,
    participants_limit,
    userId,
  }: IRequest): Promise<Pedals> {
    const prisma = new PrismaClient();
    const additionalInformation = await this.isValueAdd(additional_information);
    const participantsLimit = await this.isValueP(participants_limit);

    const pedals = await prisma.pedals.create({
      data: {
        id: this.generatorIDProvider.genetatorID(),
        name: String(name),
        start_date,
        start_date_registration,
        end_date_registration,
        start_place,
        additional_information: additionalInformation,
        participants_limit: participantsLimit,
        userId,
      },
    });

    return pedals;
  }

  async isValueAdd(field: any): Promise<string | null> {
    if (field) {
      return field;
    } else {
      return null;
    }
  }

  async isValueP(field: any): Promise<number | null> {
    if (field) {
      return field;
    } else {
      return null;
    }
  }
}

export { CreatePedalsUseCase };
