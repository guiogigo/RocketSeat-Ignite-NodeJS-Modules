import { PrismaORGsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { FetchNeabyOrgsUseCase } from "../fetch-nearby-orgs";

export function makeFetchNearbyOrgsUseCase() {
  const orgRepository = new PrismaORGsRepository();
  const useCase = new FetchNeabyOrgsUseCase(orgRepository);

  return useCase;
}
