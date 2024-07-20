import { Prisma, ORG } from "@prisma/client";

export interface FindManyNeabyParams {
  latitude: number;
  longitude: number;
}

export interface ORGRepository {
  create(data: Prisma.ORGCreateInput): Promise<ORG>;
  findByEmail(email: string): Promise<ORG | null>;
  findById(id: string): Promise<ORG | null>;
  findManyNearby(params: FindManyNeabyParams): Promise<ORG[]>;
}
