import { Pet, Prisma } from "@prisma/client";
import { PetRepository } from "../pet-repository";
import { randomUUID } from "crypto";

export class InMemoryPetRepository implements PetRepository {
  public items: Pet[] = [];
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: data.id ? data.id : randomUUID(),
      name: data.name,
      age: data.age,
      size: data.size,
      about: data.about,
      local: data.local,

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
