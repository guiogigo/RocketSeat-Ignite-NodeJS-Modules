import { beforeEach, describe, expect, it } from "vitest";
import { PetRegisterUseCase } from "./pet-register";
import { PetRepository } from "@/repositories/pet-repository";
import { InMemoryPetRepository } from "@/repositories/in-memory/in-memory-pet-repository";
import { ORGRepository } from "@/repositories/org-repository";
import { InMemoryOrgRepository } from "@/repositories/in-memory/in-memory-org-repository";

let orgRepository: ORGRepository;
let petRepository: PetRepository;
let sut: PetRegisterUseCase;

describe("Create Pet Use Case", () => {
  beforeEach(async () => {
    orgRepository = new InMemoryOrgRepository();
    petRepository = new InMemoryPetRepository();
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
    });
  });

  it("should be able to register a new pet", async () => {
    const { pet } = await sut.excute({
      name: "Dot",
      age: "5",
      size: "12.2",
      about: "Fofo",
      local: "ORG",
      org_Id: "ORG-Teste",
    });

    expect(pet.id).toEqual(expect.any(String));
  });
});
