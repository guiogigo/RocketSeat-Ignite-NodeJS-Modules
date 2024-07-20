import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "@/app";

describe("Fetch Nearby (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to fetch nearby orgs", async () => {
    await request(app.server)
      .post("/orgs")
      .send({
        name: "ORG Proxima",
        author_name: "John",
        email: "ORG1@email.com",
        password: "123456",
        city: "New Varzea",
        cep: "00000-000",
        state: "Ceara",
        street: "Coronel PP",
        neighborhood: "Center",
        latitude: -6.795385,
        longitude: -39.298765,
      })
      .expect(201);

    await request(app.server)
      .post("/orgs")
      .send({
        name: "ORG Afastada",
        author_name: "John",
        email: "ORG2@email.com",
        password: "123456",
        city: "New Varzea",
        cep: "00000-000",
        state: "Ceara",
        street: "Coronel PP",
        neighborhood: "Center",
        latitude: -6.82251,
        longitude: -39.19284,
      })
      .expect(201);

    const response = await request(app.server)
      .get("/orgs/nearby")
      .query({
        latitude: -6.795385,
        longitude: -39.298765,
      })
      .expect(200);

    expect(response.body.orgs).toHaveLength(1);
    expect(response.body.orgs).toEqual([
      expect.objectContaining({
        name: "ORG Proxima",
      }),
    ]);
  });
});
