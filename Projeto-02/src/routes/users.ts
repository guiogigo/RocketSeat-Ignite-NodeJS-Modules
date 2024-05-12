import cookie from '@fastify/cookie'
import crypto, { randomUUID } from 'node:crypto'
import { knex } from '../database'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/', async (request, response) => {
    const createSnackSchema = z.object({
      name: z.string(),
      email: z.string(),
    })

    const { name, email } = createSnackSchema.parse(request.body)

    await knex('users').insert({
      id: crypto.randomUUID(),
      session_id: randomUUID(),
      name,
      email,
    })

    return response.status(201).send()
  })
}
