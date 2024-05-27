import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { SearchGymsUseCase } from "./search-gyms";

let gymsRepository: InMemoryGymsRepository;
let sut: SearchGymsUseCase;

describe("Search Gyms Use Case", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new SearchGymsUseCase(gymsRepository);
  });

  it("should be able to search for gyms", async () => {
    await gymsRepository.create({
      title: "Academia Genérica",
      description: "Muito boa",
      phone: "8899999-9999",
      latitude: -6.803782,
      longitude: -39.347646,
    });

    await gymsRepository.create({
      title: "Outra Academia Genérica",
      description: "Muito boa",
      phone: "8899999-9999",
      latitude: -6.803782,
      longitude: -39.347646,
    });

    const { gyms } = await sut.execute({
      query: "Outra",
      page: 1,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "Outra Academia Genérica" }),
    ]);
  });

  it("should be able to fetch paginated gyms search", async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Academia Genérica ${i}`,
        description: "Muito boa",
        phone: "8899999-9999",
        latitude: -6.803782,
        longitude: -39.347646,
      });
    }

    const { gyms } = await sut.execute({
      query: "Academia",
      page: 2,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "Academia Genérica 21" }),
      expect.objectContaining({ title: "Academia Genérica 22" }),
    ]);
  });
});
