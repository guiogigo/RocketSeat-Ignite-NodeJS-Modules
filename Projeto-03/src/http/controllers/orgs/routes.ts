import { FastifyInstance } from "fastify";
import { authenticateOrgController } from "./authenticate";
import { register } from "./register";
import { fetchNearbyOrgController } from "./fetch-nearby";

export async function orgsRoutes(app: FastifyInstance) {
  app.post("/orgs", register);
  app.post("/orgs/authenticate", authenticateOrgController);
  app.get("/orgs/nearby", fetchNearbyOrgController);
}
