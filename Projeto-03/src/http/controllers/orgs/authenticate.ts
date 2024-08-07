import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";
import { makeAuthenticateUseCase } from "@/use-cases/factories/make-authenticate-org-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function authenticateOrgController(
  req: FastifyRequest,
  res: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  const body = authenticateBodySchema.parse(req.body);

  try {
    const authenticateUseCase = makeAuthenticateUseCase();

    const { org } = await authenticateUseCase.execute(body);

    const token = await res.jwtSign(
      {},
      {
        sign: {
          sub: org.id,
        },
      },
    );
    return res.status(200).send({ token });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      res.status(400).send({ message: error.message });
    }
    throw error;
  }
}
