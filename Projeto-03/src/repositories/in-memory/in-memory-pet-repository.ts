import { Pet, Prisma } from "@prisma/client";
import { FindManyParams, PetRepository } from "../pet-repository";
import { randomUUID } from "crypto";
import { InMemoryOrgRepository } from "./in-memory-org-repository";

export class InMemoryPetRepository implements PetRepository {
  public items: Pet[] = [];

  constructor(private orgRepository: InMemoryOrgRepository) {}

  async findMany(params: FindManyParams) {
    const orgsByCity = this.orgRepository.items.filter(
      (item) => item.city === params.city,
    );

    const pets = this.items
      .filter((item) => orgsByCity.some((org) => org.id === item.org_Id))
      .filter((item) => (params.age ? item.age === params.age : true))
      .filter((item) => (params.size ? item.size === params.size : true))
      .filter((item) =>
        params.energy_level ? item.energy_level === params.energy_level : true,
      )
      .filter((item) =>
        params.environment ? item.environment === params.environment : true,
      );

    return pets;
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: data.id ? data.id : randomUUID(),
      name: data.name,
      age: data.age,
      size: data.size,
      about: data.about,
      energy_level: data.energy_level,
      environment: data.environment,

      org_Id: data.org_Id,

      created_at: new Date(),
      updated_at: new Date(),
    };

    this.items.push(pet);
    return pet;
  }

  async findById(id: string) {
    const pet = this.items.find((pet) => pet.id === id);
    if (!pet) {
      return null;
    }
    return pet;
  }
}
