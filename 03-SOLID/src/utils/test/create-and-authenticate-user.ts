import { prisma } from "@/lib/prisma";
import { FastifyInstance } from "fastify";
import request from "supertest";

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  isAdmin = false,
) {
  await prisma.user.create({
    data: {
      name: "Jhon Doe",
      email: "jhondoe@example.com",
      password_hash: "123456",
      role: isAdmin ? "ADMIN" : "MEMBER",
    },
  });

  const authResponse = await request(app.server).post("/sessions").send({
    email: "jhondoe@example.com",
    password: "123456",
  });

  const { token } = authResponse.body;
  return {
    token,
  };
}
