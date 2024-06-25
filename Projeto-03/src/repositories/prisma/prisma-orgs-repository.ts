import { ORG, Prisma } from "@prisma/client";
import { FindManyNeabyParams, ORGRepository } from "../org-repository";
import { prisma } from "@/lib/prisma";

export class PrismaORGsRepository implements ORGRepository {
  async create(data: Prisma.ORGCreateInput) {
    const user = await prisma.oRG.create({ data });
    return user;
  }

  async findByEmail(email: string) {
    const user = await prisma.oRG.findUnique({
      where: {
        email,
      },
    });
    return user;
  }

  async findById(id: string) {
    const user = await prisma.oRG.findUnique({
      where: {
        id,
      },
    });

    return user;
  }

  async findManyNearby({ latitude, longitude }: FindManyNeabyParams) {
    const orgs = await prisma.$queryRaw<ORG[]>`
    WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `;

    return orgs;
  }
}
