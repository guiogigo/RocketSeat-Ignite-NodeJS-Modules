import { expect, describe, it, beforeEach } from "vitest";
import { RegisterUseCase } from "./register";
import { compare } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

let usersRepository: InMemoryUsersRepository;
let sut: RegisterUseCase;

describe("Register Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new RegisterUseCase(usersRepository);
  });

  it("should be able to register", async () => {
    const { user } = await sut.execute({
      name: "BotTest",
      email: "BotTest@gmail.com",
      password: "BOT123",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should hash user password upon registration", async () => {
    const { user } = await sut.execute({
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
    const email = "BotTest2@gmail.com";

    await sut.execute({
      name: "BotTest",
      email,
      password: "BOT123",
    });

    await expect(() =>
      sut.execute({
        name: "BotTest",
        email,
        password: "BOT123",
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
