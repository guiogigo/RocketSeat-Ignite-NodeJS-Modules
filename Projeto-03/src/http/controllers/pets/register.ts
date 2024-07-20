import { OrgNotFoundError } from "@/use-cases/errors/org-not-found-error";
import { makePetRegisterUseCase } from "@/use-cases/factories/make-pet-register-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function petRegister(req: FastifyRequest, res: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    age: z.string(),
    size: z.string(),
    about: z.string(),
    energy_level: z.string(),
    environment: z.string(),
  });

  const body = registerBodySchema.parse(req.body);

  const org_Id = req.user.sub;

  try {
    const registerUseCase = makePetRegisterUseCase();

    const { pet } = await registerUseCase.execute({ ...body, org_Id });

    return res.status(201).send(pet);
  } catch (error) {
    if (error instanceof OrgNotFoundError) {
      return res.status(400).send({ message: error.message });
    }
    throw error;
  }
}
