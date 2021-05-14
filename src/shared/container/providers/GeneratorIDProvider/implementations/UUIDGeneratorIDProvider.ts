import { IGeneratorIDProvider } from '../models/GeneratorIDProvider';
import { v4 as uuidV4 } from 'uuid';
class UUIDGeneratorIdPRovider implements IGeneratorIDProvider {
  genetatorID(): string {
    const id = uuidV4();
    return id;
  }
}

export { UUIDGeneratorIdPRovider };
