import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "@/app";

describe("Get Pet (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to get a pet", async () => {
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

    const authResponse = await request(app.server)
      .post("/orgs/authenticate")
      .send({
        email: "ORG@email.com",
        password: "123456",
      });

    const petResponse = await request(app.server)
      .post("/orgs/pets")
      .set("Authorization", `Bearer ${authResponse.body.token}`)
      .send({
        name: "Dot",
        age: "5",
        size: "12.2",
        about: "Fofo",
        energy_level: "5",
        environment: "city",
        org_Id: "ORG-Teste",
      });

    const response = await request(app.server)
      .get(`/orgs/pets/${petResponse.body.id}`)
      .set("Authorization", `Bearer ${authResponse.body.token}`);

    expect(response.status).toEqual(200);
  });
});
