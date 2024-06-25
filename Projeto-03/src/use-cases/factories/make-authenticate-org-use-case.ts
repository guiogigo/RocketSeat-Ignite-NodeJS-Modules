import { PrismaORGsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { AuthenticateUseCase } from "../authenticate-org";

export function makeAuthenticateUseCase() {
  const orgRepository = new PrismaORGsRepository();
  const useCase = new AuthenticateUseCase(orgRepository);

  return useCase;
}
