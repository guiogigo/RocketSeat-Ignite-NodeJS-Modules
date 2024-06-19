import { PrismaORGsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { AuthenticateUseCase } from "../authenticate-org";

export function makeAuthenticateUseCase() {
  const orgRepository = new PrismaORGsRepository();
  const authenticateUseCase = new AuthenticateUseCase(orgRepository);

  return authenticateUseCase;
}
