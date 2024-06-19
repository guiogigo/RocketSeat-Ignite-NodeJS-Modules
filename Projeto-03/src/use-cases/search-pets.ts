import { PetRepository } from "@/repositories/pet-repository";
import { Pet } from "@prisma/client";

interface SearchPetsUseCaseRequest {
  city: string;
  age?: string;
  size?: string;
  energy_level?: string;
  environment?: string;
}

interface SearchPetsUseCaseResponse {
  pets: Pet[];
}

export class SearchPetsUseCase {
  constructor(private petRepository: PetRepository) {}

  async execute({
    city,
    age,
    size,
    energy_level,
    environment,
  }: SearchPetsUseCaseRequest): Promise<SearchPetsUseCaseResponse> {
    const pets = await this.petRepository.findMany({
      city,
      age,
      size,
      energy_level,
      environment,
    });

    return { pets };
  }
}
