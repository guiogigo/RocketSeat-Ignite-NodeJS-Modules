import { Prisma } from "@prisma/client";
import { ORGRepository } from "../org-repository";
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
}
