import { beforeEach, describe, expect, it } from "vitest";
import { PetRegisterUseCase } from "./pet-register";
import { InMemoryPetRepository } from "@/repositories/in-memory/in-memory-pet-repository";
import { InMemoryOrgRepository } from "@/repositories/in-memory/in-memory-org-repository";

let orgRepository: InMemoryOrgRepository;
let petRepository: InMemoryPetRepository;
let sut: PetRegisterUseCase;

describe("Create Pet Use Case", () => {
  beforeEach(async () => {
    orgRepository = new InMemoryOrgRepository();
    petRepository = new InMemoryPetRepository(orgRepository);
    sut = new PetRegisterUseCase(petRepository, orgRepository);

    await orgRepository.create({
      id: "ORG-Teste",
      name: "ORG",
      author_name: "John",
      email: "ORG@email.com",
      password: "123456",
      city: "New Varzea",
      cep: "00000-000",
      state: "Ceara",
      street: "Coronel PP",
      neighborhood: "Center",
      latitude: 0,
      longitude: 0,
    });
  });

  it("should be able to register a new pet", async () => {
    const { pet } = await sut.excute({
      name: "Dot",
      age: "5",
      size: "12.2",
      about: "Fofo",
      energy_level: "5",
      environment: "city",
      org_Id: "ORG-Teste",
    });

    expect(pet.id).toEqual(expect.any(String));
  });
});
