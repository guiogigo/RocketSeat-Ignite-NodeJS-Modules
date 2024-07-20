import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "@/app";

describe("Authenticate (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to authenticate a org", async () => {
    await request(app.server).post("/orgs").send({
      name: "ORG",
      author_name: "John",
      email: "ORG@email.com",
      password: "123456",
      city: "New Varzea",
      cep: "00000-000",
      state: "Ceara",
      street: "Coronel PP",
      neighborhood: "Center",
      latitude: 0,
      longitude: 0,
    });

    const response = await request(app.server).post("/orgs/authenticate").send({
      email: "ORG@email.com",
      password: "123456",
    });

    expect(response.status).toEqual(200);
    expect(response.body.token).toEqual(expect.any(String));
  });
});
