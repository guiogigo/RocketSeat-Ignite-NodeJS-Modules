import { InMemoryOrgRepository } from "@/repositories/in-memory/in-memory-org-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { AuthenticateUseCase } from "./authenticate-org";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

let orgRepository: InMemoryOrgRepository;
let sut: AuthenticateUseCase;

describe("Authenticate Use Case", () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgRepository();
    sut = new AuthenticateUseCase(orgRepository);
  });

  it("should be able to authenticate an org", async () => {
    const password = await hash("123456", 6);
    const org = await orgRepository.create({
      name: "ORG",
      author_name: "John",
      email: "ORG@email.com",
      password,
      city: "New Varzea",
      cep: "00000-000",
      state: "Ceara",
      street: "Coronel PP",
      neighborhood: "Center",
      latitude: 0,
      longitude: 0,
    });
    const { org: authenticadeOrg } = await sut.execute({
      email: "ORG@email.com",
      password: "123456",
    });

    expect(authenticadeOrg).toEqual(org);
  });

  it("should not be able to authenticate with wrong email", async () => {
    const password = await hash("123456", 6);
    await orgRepository.create({
      name: "ORG",
      author_name: "John",
      email: "ORG@email.com",
      password,
      city: "New Varzea",
      cep: "00000-000",
      state: "Ceara",
      street: "Coronel PP",
      neighborhood: "Center",
      latitude: 0,
      longitude: 0,
    });

    await expect(() =>
      sut.execute({
        email: "SlaPo@email.com",
        password: "123456",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authenticate with wrong password", async () => {
    const password = await hash("123456", 6);
    await orgRepository.create({
      name: "ORG",
      author_name: "John",
      email: "ORG@email.com",
      password,
      city: "New Varzea",
      cep: "00000-000",
      state: "Ceara",
      street: "Coronel PP",
      neighborhood: "Center",
      latitude: 0,
      longitude: 0,
    });

    await expect(() =>
      sut.execute({
        email: "ORG@email.com",
        password: "000000",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
