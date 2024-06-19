import { InMemoryOrgRepository } from "@/repositories/in-memory/in-memory-org-repository";
import { CreateORGUserCase } from "./create-org";
import { describe, beforeEach, expect, it } from "vitest";
import { compare } from "bcryptjs";
import { OrgAlreadyExists } from "./errors/org-already-exists-error";

let orgRepository: InMemoryOrgRepository;
let sut: CreateORGUserCase;

describe("Create Org Use Case", () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgRepository();
    sut = new CreateORGUserCase(orgRepository);
  });

  it("should able to create a new org", async () => {
    const { org } = await sut.execute({
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

    expect(org.id).toEqual(expect.any(String));
  });

  it("should hash org password upon registration", async () => {
    const { org } = await sut.execute({
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

    const isPasswordCorrectlyHashed = await compare("123456", org.password);

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("should not be able to register with the same email twice", async () => {
    const email = "ORG@email.com";
    await sut.execute({
      name: "ORG",
      author_name: "John",
      email,
      password: "123456",
      city: "New Varzea",
      cep: "00000-000",
      state: "Ceara",
      street: "Coronel PP",
      neighborhood: "Center",
    });

    await expect(() =>
      sut.execute({
        name: "ORG",
        author_name: "John",
        email,
        password: "123456",
        city: "New Varzea",
        cep: "00000-000",
        state: "Ceara",
        street: "Coronel PP",
        neighborhood: "Center",
      }),
    ).rejects.toBeInstanceOf(OrgAlreadyExists);
  });
});
