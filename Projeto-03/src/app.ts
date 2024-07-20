import fastify from "fastify";
import { orgsRoutes } from "./http/controllers/orgs/routes";
import { ZodError } from "zod";
import { env } from "./env";
import fastifyJwt from "@fastify/jwt";
import { petsRoutes } from "./http/controllers/pets/routes";
export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});

app.register(orgsRoutes);
app.register(petsRoutes);

app.setErrorHandler((error, request, response) => {
  if (error instanceof ZodError) {
    return response.status(400).send({
      message: "Validation error.",
      issues: error.format(),
    });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  }

  return response.status(500).send({ message: "Internal Server Error" });
});
