import { makeSearchPetsUseCase } from "@/use-cases/factories/make-search-pets-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function search(req: FastifyRequest, res: FastifyReply) {
  const searchQuerySchema = z.object({
    city: z.string().min(1),
    age: z.string().optional(),
    size: z.string().optional(),
    energy_level: z.string().optional(),
    environment: z.string().optional(),
  });

  const { city, age, size, energy_level, environment } =
    searchQuerySchema.parse(req.query);

  try {
    const searchUseCase = makeSearchPetsUseCase();

    const { pets } = await searchUseCase.execute({
      city,
      age,
      size,
      energy_level,
      environment,
    });

    return res.status(200).send({ pets });
  } catch (error) {
    console.error(error);
    throw error;
  }
}
