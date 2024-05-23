import { expect, describe, it } from "vitest";
import { RegisterUseCase } from "./register";
import { compare } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

describe("Register Use Case", () => {
  it("should be able to register", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    const { user } = await registerUseCase.execute({
      name: "BotTest",
      email: "BotTest@gmail.com",
      password: "BOT123",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should hash user password upon registration", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    const { user } = await registerUseCase.execute({
      name: "BotTest",
      email: "BotTest@gmail.com",
      password: "BOT123",
    });

    const isPasswordCorrectlyHashed = await compare(
      "BOT123",
      user.password_hash,
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("should not be able to register with same email twice", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    const email = "BotTest2@gmail.com";

    await registerUseCase.execute({
      name: "BotTest",
      email,
      password: "BOT123",
    });

    await expect(() =>
      registerUseCase.execute({
        name: "BotTest",
        email,
        password: "BOT123",
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
