import { PrismaORGsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { CreateORGUserCase } from "../create-org";

export function makeRegisterUseCase() {
  const orgRepository = new PrismaORGsRepository();
  const useCase = new CreateORGUserCase(orgRepository);

  return useCase;
}
