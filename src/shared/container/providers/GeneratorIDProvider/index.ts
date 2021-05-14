import { container } from 'tsyringe';
import { UUIDGeneratorIdPRovider } from './implementations/UUIDGeneratorIDProvider';
import { IGeneratorIDProvider } from './models/GeneratorIDProvider';

container.registerSingleton<IGeneratorIDProvider>(
  'GeneratorID',
  UUIDGeneratorIdPRovider
);
