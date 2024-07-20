import { ORGRepository } from "@/repositories/org-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { FetchNeabyOrgsUseCase } from "./fetch-nearby-orgs";
import { InMemoryOrgRepository } from "@/repositories/in-memory/in-memory-org-repository";

let orgRepository: ORGRepository;
let sut: FetchNeabyOrgsUseCase;

describe("Fetch Nearby Orgs Use Case", () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgRepository();
    sut = new FetchNeabyOrgsUseCase(orgRepository);
  });

  it("should be able to fetch nearby orgs", async () => {
    await orgRepository.create({
      name: "ORG Próxima",
      author_name: "John",
      email: "ORG@email.com",
      password: "123456",
      city: "New Varzea",
      cep: "00000-000",
      state: "Ceara",
      street: "Coronel PP",
      neighborhood: "Center",
      latitude: -6.795385,
      longitude: -39.298765,
    });

    await orgRepository.create({
      name: "ORG Afastada",
      author_name: "John",
      email: "ORG@email.com",
      password: "123456",
      city: "New Varzea",
      cep: "00000-000",
      state: "Ceara",
      street: "Coronel PP",
      neighborhood: "Center",
      latitude: -6.82251,
      longitude: -39.19284,
    });

    const { orgs } = await sut.execute({
      orgLatitude: -6.794831,
      orgLongitude: -39.297135,
    });

    expect(orgs).toHaveLength(1);
    expect(orgs).toEqual([expect.objectContaining({ name: "ORG Próxima" })]);
  });
});
