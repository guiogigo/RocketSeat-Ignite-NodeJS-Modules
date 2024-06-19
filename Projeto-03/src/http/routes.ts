import { FastifyInstance } from "fastify";
import { authenticateOrgController } from "./controllers/authenticate-org";
import { register } from "./controllers/register-org";

export async function appRoutes(app: FastifyInstance) {
  app.post("/orgs", register);
  app.post("/sessions", authenticateOrgController);
}
