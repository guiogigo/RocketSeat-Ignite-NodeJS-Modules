import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { hash } from "bcryptjs";
import { GetUserProfileUseCase } from "./get-user-profile";
import { ResourceNotFoundError } from "./errors/resouce-not-found-error";

let usersRepository: InMemoryUsersRepository;
let sut: GetUserProfileUseCase;

describe("Get User Profile Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileUseCase(usersRepository);
    // sut é a principal variável que está sendo testada
    // sut => System Under Test
  });

  it("should be able to get user profile", async () => {
    const createdUser = await usersRepository.create({
      name: "BOTtest",
      email: "BotTest@gmail.com",
      password_hash: await hash("BOT123", 6),
    });

    const { user } = await sut.execute({
      userId: createdUser.id,
    });
    expect(user.name).toEqual("BOTtest");
  });

  it("should not be able to get user profile with wrong id", async () => {
    await expect(() =>
      sut.execute({
        userId: "non-existing-id",
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
