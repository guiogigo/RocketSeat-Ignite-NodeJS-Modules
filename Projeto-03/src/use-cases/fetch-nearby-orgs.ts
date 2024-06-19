import { ORGRepository } from "@/repositories/org-repository";
import { ORG } from "@prisma/client";

interface FetchNeabyOrgsUseCaseRequest {
  userLatitude: number;
  userLongitude: number;
}

interface FetchNeabyOrgsUseCaseResponse {
  orgs: ORG[];
}

export class FetchNeabyOrgsUseCase {
  constructor(private orgRepository: ORGRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNeabyOrgsUseCaseRequest): Promise<FetchNeabyOrgsUseCaseResponse> {
    const orgs = await this.orgRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    });

    return { orgs };
  }
}
