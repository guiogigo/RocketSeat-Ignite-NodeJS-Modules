// eslint-disable-next-line
import { Knex } from "knex";

declare module 'fastify' {
  export interface FastifyRequest {
    user?: {
      id: string
      session_id: string
      name: string
      email: string
      created_at: string
      updated_at: string
    }
  }
}
