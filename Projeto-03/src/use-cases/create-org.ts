import { ORGRepository } from "@/repositories/org-repository";
import { ORG } from "@prisma/client";
import { hash } from "bcryptjs";
import { OrgAlreadyExists } from "./errors/org-already-exists-error";

interface CreateORGUseCaseRequest {
  name: string;
  author_name: string;
  email: string;
  password: string;
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
}

interface CreateORGUseCaseResponse {
  org: ORG;
}

export class CreateORGUserCase {
  constructor(private orgRepository: ORGRepository) {}

  async execute({
    name,
    author_name,
    email,
    password,
    cep,
    state,
    city,
    neighborhood,
    street,
  }: CreateORGUseCaseRequest): Promise<CreateORGUseCaseResponse> {
    const password_hash = await hash(password, 6);

    const orgWithEmail = await this.orgRepository.findByEmail(email);
    if (orgWithEmail) {
      throw new OrgAlreadyExists();
    }

    const org = await this.orgRepository.create({
      name,
      author_name,
      email,
      password: password_hash,
      cep,
      state,
      city,
      neighborhood,
      street,
    });

    return { org };
  }
}
