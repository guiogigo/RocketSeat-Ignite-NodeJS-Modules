import { ORG, Prisma } from "@prisma/client";
import { ORGRepository } from "../org-repository";
import { randomUUID } from "node:crypto";

export class InMemoryOrgRepository implements ORGRepository {
  public items: ORG[] = [];

  async create(data: Prisma.ORGCreateInput) {
    const org = {
      id: data.id ? data.id : randomUUID(),
      name: data.name,
      author_name: data.author_name,
      email: data.email,
      password: data.password,

      cep: data.cep,
      state: data.state,
      city: data.city,
      neighborhood: data.neighborhood,
      street: data.street,

      created_at: new Date(),
      updated_at: new Date(),
    };

    this.items.push(org);
    return org;
  }

  async findByEmail(email: string) {
    const org = this.items.find((item) => item.email === email);
    if (!org) {
      return null;
    }
    return org;
  }

  async findById(id: string) {
    const org = this.items.find((item) => item.id === id);
    if (!org) {
      return null;
    }
    return org;
  }
}
