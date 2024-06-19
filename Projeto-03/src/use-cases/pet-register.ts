import { ORGRepository } from "@/repositories/org-repository";
import { PetRepository } from "@/repositories/pet-repository";
import { Pet } from "@prisma/client";
import { OrgNotFoundError } from "./errors/org-not-found-error";

interface CreatePetUseCaseRequest {
  name: string;
  age: string;
  size: string;
  about: string;
  energy_level: string;
  environment: string;
  org_Id: string;
}

interface CreatePetUseCaseResponse {
  pet: Pet;
}

export class PetRegisterUseCase {
  constructor(
    private petRepository: PetRepository,
    private orgRepository: ORGRepository,
  ) {}

  async excute({
    name,
    age,
    size,
    about,
    energy_level,
    environment,
    org_Id,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const org = await this.orgRepository.findById(org_Id);

    if (!org) {
      throw new OrgNotFoundError();
    }

    const pet = await this.petRepository.create({
      name,
      age,
      size,
      about,
      energy_level,
      environment,
      org_Id,
    });

    return { pet };
  }
}
