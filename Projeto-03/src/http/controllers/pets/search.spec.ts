import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "@/app";

describe("Search Pet (e2e)", () => {
  beforeAll(async () => {
    await app.ready();

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

    await request(app.server)
      .post("/orgs/pets")
      .set("Authorization", `Bearer ${authResponse.body.token}`)
      .send({
        name: "Dot",
        age: "3",
        size: "8.3",
        about: "Fofo",
        energy_level: "1",
        environment: "indoor",
        org_Id: "ORG-Teste",
      });

    await request(app.server)
      .post("/orgs/pets")
      .set("Authorization", `Bearer ${authResponse.body.token}`)
      .send({
        name: "Dot2",
        age: "5",
        size: "12.2",
        about: "Fofo",
        energy_level: "5",
        environment: "outdoor",
        org_Id: "ORG-Teste",
      });
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to search pets", async () => {
    const response = await request(app.server)
      .get("/orgs/pets")
      .query({ city: "New Varzea" });

    expect(response.status).toBe(200);
    expect(response.body.pets).toHaveLength(2);
  });

  it("should not be able to search pets without city", async () => {
    const response = await request(app.server).get("/orgs/pets");

    expect(response.status).toBe(400);
  });

  it("should be able to search pets by city and age", async () => {
    const response = await request(app.server)
      .get("/orgs/pets")
      .query({ city: "New Varzea", age: "3" });

    expect(response.status).toBe(200);
    expect(response.body.pets).toHaveLength(1);
  });

  it("should be able to search pets by city and size", async () => {
    const response = await request(app.server)
      .get("/orgs/pets")
      .query({ city: "New Varzea", size: "12.2" });

    expect(response.status).toBe(200);
    expect(response.body.pets).toHaveLength(1);
  });

  it("should be able to search pets by city and evergy level", async () => {
    const response = await request(app.server)
      .get("/orgs/pets")
      .query({ city: "New Varzea", energy_level: "1" });

    expect(response.status).toBe(200);
    expect(response.body.pets).toHaveLength(1);
  });

  it("should be able to search pets by city and environment", async () => {
    const response = await request(app.server)
      .get("/orgs/pets")
      .query({ city: "New Varzea", environment: "indoor" });

    expect(response.status).toBe(200);
    expect(response.body.pets).toHaveLength(1);
  });

  it("should be able to search pets by city and all filters", async () => {
    const response = await request(app.server).get("/orgs/pets").query({
      city: "New Varzea",
      age: "3",
      size: "8.3",
      energy_level: "1",
      environment: "indoor",
    });

    expect(response.status).toBe(200);
    expect(response.body.pets).toHaveLength(1);
  });
});
