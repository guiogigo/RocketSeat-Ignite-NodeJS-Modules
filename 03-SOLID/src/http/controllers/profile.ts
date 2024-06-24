import { makeGetUserProfileUseCase } from "@/use-cases/factories/make-get-user-profile-use-case";
import { FastifyRequest, FastifyReply } from "fastify";

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  // await request.jwtVerify(); // Garante que a rota só pode ser acessada com o usuário autenticado

  const getUserProfile = makeGetUserProfileUseCase();

  const { user } = await getUserProfile.execute({
    userId: request.user.sub,
  });

  return reply.status(201).send({
    user: {
      ...user,
      password_hash: undefined,
    },
  });
}
