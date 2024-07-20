import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { PetRegisterUseCase } from "../pet-register";
import { PrismaORGsRepository } from "@/repositories/prisma/prisma-orgs-repository";

export function makePetRegisterUseCase() {
  const orgRepository = new PrismaORGsRepository();
  const petRepository = new PrismaPetsRepository();
  const useCase = new PetRegisterUseCase(petRepository, orgRepository);

  return useCase;
}
