import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { SearchPetsUseCase } from "../search-pets";

export function makeSearchPetsUseCase() {
  const petRepository = new PrismaPetsRepository();
  const useCase = new SearchPetsUseCase(petRepository);

  return useCase;
}
