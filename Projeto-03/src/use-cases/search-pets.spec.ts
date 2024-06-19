import { InMemoryPetRepository } from "@/repositories/in-memory/in-memory-pet-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { SearchPetsUseCase } from "./search-pets";
import { InMemoryOrgRepository } from "@/repositories/in-memory/in-memory-org-repository";

let orgRepository: InMemoryOrgRepository;
let petRepository: InMemoryPetRepository;
let sut: SearchPetsUseCase;

describe("Search Pets Use Case", () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgRepository();
    petRepository = new InMemoryPetRepository(orgRepository);
    sut = new SearchPetsUseCase(petRepository);

    orgRepository.create({
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

    orgRepository.create({
      id: "ORG-Teste2",
      name: "ORG",
      author_name: "John",
      email: "ORG@email.com",
      password: "123456",
      city: "Old Varzea",
      cep: "00000-000",
      state: "Ceara",
      street: "Coronel PP",
      neighborhood: "Center",
      latitude: 0,
      longitude: 0,
    });

    petRepository.create({
      name: "Dot",
      age: "5",
      size: "12.2",
      about: "Fofo",
      energy_level: "5",
      environment: "indoor",
      org_Id: "ORG-Teste",
    });

    petRepository.create({
      name: "Dot",
      age: "3",
      size: "4",
      about: "Fofo",
      energy_level: "1",
      environment: "indoor",
      org_Id: "ORG-Teste",
    });

    petRepository.create({
      name: "Cot",
      age: "3",
      size: "10",
      about: "Fofo",
      energy_level: "2",
      environment: "forest",
      org_Id: "ORG-Teste2",
    });
  });

  it("should able to search pets by city", async () => {
    const { pets } = await sut.execute({ city: "New Varzea" });
    expect(pets).toHaveLength(2);

    const { pets: pets2 } = await sut.execute({ city: "Old Varzea" });
    expect(pets2).toHaveLength(1);
  });

  it("should able to search pets by city and age", async () => {
    const { pets } = await sut.execute({ city: "New Varzea", age: "5" });
    expect(pets).toHaveLength(1);
  });

  it("should able to search pets by city and size", async () => {
    const { pets } = await sut.execute({ city: "New Varzea", size: "4" });
    expect(pets).toHaveLength(1);
  });

  it("should able to search pets by city and energy_lvel", async () => {
    const { pets } = await sut.execute({
      city: "Old Varzea",
      energy_level: "2",
    });
    expect(pets).toHaveLength(1);
  });

  it("should able to search pets by city and environment", async () => {
    const { pets } = await sut.execute({
      city: "New Varzea",
      environment: "indoor",
    });
    expect(pets).toHaveLength(2);
  });
});
