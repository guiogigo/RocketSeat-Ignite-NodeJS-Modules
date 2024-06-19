import { OrgAlreadyExists } from "@/use-cases/errors/org-already-exists-error";
import { makeRegisterUseCase } from "@/use-cases/factories/make-register-org-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function register(req: FastifyRequest, res: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    author_name: z.string(),
    email: z.string().email(),
    password: z.string(),
    cep: z.string(),
    state: z.string(),
    city: z.string(),
    neighborhood: z.string(),
    street: z.string(),
    latitude: z.number(),
    longitude: z.number(),
  });

  const body = registerBodySchema.parse(req.body);

  try {
    const registerUseCase = makeRegisterUseCase();

    const { org } = await registerUseCase.execute(body);

    return res.status(201).send(org);
  } catch (error) {
    if (error instanceof OrgAlreadyExists) {
      return res.status(400).send({ message: error.message });
    }
    throw error;
  }
}
