import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { FetchNearbyGymsUseCase } from "./fetch-nearby-gyms";

let gymsRepository: InMemoryGymsRepository;
let sut: FetchNearbyGymsUseCase;

describe("Fetch Nearby Gyms Use Case", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new FetchNearbyGymsUseCase(gymsRepository);
  });

  it("should be able to fetch nearby gyms", async () => {
    await gymsRepository.create({
      title: "Academia Próxima",
      description: "Muito boa",
      phone: "8899999-9999",
      latitude: -6.803782,
      longitude: -39.347646,
    });

    await gymsRepository.create({
      title: "Academia Afastada",
      description: "Muito boa",
      phone: "8899999-9999",
      latitude: -6.94453,
      longitude: -38.972567,
    });

    const { gyms } = await sut.execute({
      userLatitude: -6.803782,
      userLongitude: -39.347646,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "Academia Próxima" }),
    ]);
  });
});
