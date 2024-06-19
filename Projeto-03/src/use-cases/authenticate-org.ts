import { ORGRepository } from "@/repositories/org-repository";
import { ORG } from "@prisma/client";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { compare } from "bcryptjs";

interface AuthenticateUseCaseRequest {
  email: string;
  password: string;
}

interface AuthenticateUseCaseResponse {
  org: ORG;
}

export class AuthenticateUseCase {
  constructor(private orgRepository: ORGRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const org = await this.orgRepository.findByEmail(email);

    if (!org) {
      throw new InvalidCredentialsError();
    }

    const doesPasswordMatches = await compare(password, org.password);
    console.log(password, org.password, doesPasswordMatches);

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError();
    }

    return { org };
  }
}
