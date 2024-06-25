import { Prisma } from "@prisma/client";
import { FindManyParams, PetRepository } from "../pet-repository";
import { prisma } from "@/lib/prisma";

export class PrismaPetsRepository implements PetRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({ data });

    return pet;
  }

  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    });

    return pet;
  }

  async findMany(params: FindManyParams) {
    const pets = await prisma.pet.findMany({
      where: {
        age: params.age,
        size: params.size,
        energy_level: params.energy_level,
        environment: {
          contains: params.environment,
        },
        ORG: {
          city: {
            contains: params.city,
            mode: "insensitive",
          },
        },
      },
    });

    return pets;
  }
}
