import { FastifyRequest, FastifyReply } from "fastify";

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify({ onlyCookie: true }); // Verifica os cookies ao invés do Bearer Token

  const { role } = request.user;

  const token = await reply.jwtSign(
    { role },
    {
      sign: {
        sub: request.user.sub,
      },
    },
  );

  const refreshToken = await reply.jwtSign(
    { role },
    {
      sign: {
        sub: request.user.sub,
        expiresIn: "7d",
      },
    },
  );

  return reply
    .setCookie("refreshToken", refreshToken, {
      path: "/",
      secure: true, // HTTPS encriptado
      sameSite: true,
      httpOnly: true, // Não vai poder ser acessado pelo FE
    })
    .status(200)
    .send({ token });
}
