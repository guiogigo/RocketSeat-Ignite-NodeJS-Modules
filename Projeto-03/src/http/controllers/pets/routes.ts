import { FastifyInstance } from "fastify";
import { petRegister } from "./register";
import { getPet } from "./get-pet";
import { search } from "./search";
import { verifyJWT } from "@/http/middlewares/verify-jwt";

export async function petsRoutes(app: FastifyInstance) {
  app.post("/orgs/pets", { onRequest: [verifyJWT] }, petRegister);
  app.get("/orgs/pets/:id", getPet);
  app.get("/orgs/pets", search);
}
