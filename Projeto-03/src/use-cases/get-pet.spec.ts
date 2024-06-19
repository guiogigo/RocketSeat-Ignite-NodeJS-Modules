import { describe, expect, it, beforeEach } from "vitest";
import { GetPetUseCase } from "./get-pet";
import { PetRepository } from "@/repositories/pet-repository";
import { InMemoryPetRepository } from "@/repositories/in-memory/in-memory-pet-repository";

let petRepository: PetRepository;
let sut: GetPetUseCase;

describe("Get Pet Use Case", () => {
  beforeEach(async () => {
    petRepository = new InMemoryPetRepository();
    sut = new GetPetUseCase(petRepository);
  });

  it("should be able to get a pet", async () => {
    const created_pet = await petRepository.create({
      id: "PET-Teste",
      name: "Dot",
      age: "5",
      size: "12.2",
      about: "Fofo",
      local: "ORG",
      org_Id: "ORG-Teste",
    });

    const { pet } = await sut.execute({
      id: "PET-Teste",
    });

    expect(pet.id).toEqual(created_pet.id);
  });
});
