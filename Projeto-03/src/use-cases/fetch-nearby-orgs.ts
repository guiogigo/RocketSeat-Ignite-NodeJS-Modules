import { ORGRepository } from "@/repositories/org-repository";
import { ORG } from "@prisma/client";

interface FetchNeabyOrgsUseCaseRequest {
  orgLatitude: number;
  orgLongitude: number;
}

interface FetchNeabyOrgsUseCaseResponse {
  orgs: ORG[];
}

export class FetchNeabyOrgsUseCase {
  constructor(private orgRepository: ORGRepository) {}

  async execute({
    orgLatitude,
    orgLongitude,
  }: FetchNeabyOrgsUseCaseRequest): Promise<FetchNeabyOrgsUseCaseResponse> {
    const orgs = await this.orgRepository.findManyNearby({
      latitude: orgLatitude,
      longitude: orgLongitude,
    });

    return { orgs };
  }
}
