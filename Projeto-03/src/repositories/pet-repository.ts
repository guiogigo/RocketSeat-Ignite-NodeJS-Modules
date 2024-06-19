import { Pet, Prisma } from "@prisma/client";

export interface FindManyParams {
  city: string;
  age?: string;
  size?: string;
  energy_level?: string;
  environment?: string;
}

export interface PetRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
  findById(id: string): Promise<Pet | null>;
  findMany(params: FindManyParams): Promise<Pet[]>;
}
