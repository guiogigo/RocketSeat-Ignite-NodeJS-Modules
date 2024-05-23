import { expect, describe, it } from "vitest";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { AuthenticateUseCase } from "./authenticate";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

describe("Authenticate Use Case", () => {
  it("should be able to authenticate", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateUseCase(usersRepository);
    // sut é a principal variável que está sendo testada
    // sut => System Under Test

    await usersRepository.create({
      name: "BOTtest",
      email: "BotTest@gmail.com",
      password_hash: await hash("BOT123", 6),
    });

    const { user } = await sut.execute({
      email: "BotTest@gmail.com",
      password: "BOT123",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should not be able to authenticate with wrong email", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateUseCase(usersRepository);

    await expect(() =>
      sut.execute({
        email: "BotTest@gmail.com",
        password: "BOT123",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authenticate with wrong password", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateUseCase(usersRepository);

    await usersRepository.create({
      name: "BOTtest",
      email: "BotTest@gmail.com",
      password_hash: await hash("BOT123", 6),
    });

    await expect(() =>
      sut.execute({
        email: "BotTest@gmail.com",
        password: "errada",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
