

import { container } from "tsyringe";

import { HashProvider } from "./HashProvider/models/HashProvider";
import { BcryptHashProvider } from "./HashProvider/implementations/BcryptHashProvider";

container.registerSingleton<HashProvider>("HashProvider", BcryptHashProvider);