import { makeGetPetUseCase } from "@/use-cases/factories/make-get-pet-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getPet(req: FastifyRequest, res: FastifyReply) {
  const getPetParamsSchema = z.object({
    id: z.string(),
  });

  const { id } = getPetParamsSchema.parse(req.params);

  try {
    const searchUseCase = makeGetPetUseCase();

    const { pet } = await searchUseCase.execute({ id });

    return res.status(200).send(pet);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
