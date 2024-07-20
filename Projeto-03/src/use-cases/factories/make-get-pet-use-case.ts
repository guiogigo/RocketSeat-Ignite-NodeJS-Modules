import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { GetPetUseCase } from "../get-pet";

export function makeGetPetUseCase() {
  const petRepository = new PrismaPetsRepository();
  const useCase = new GetPetUseCase(petRepository);

  return useCase;
}
