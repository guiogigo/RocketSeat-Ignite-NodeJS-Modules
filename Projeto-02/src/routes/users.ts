import { checkSessionIdExists } from '../middleware/check-sessionId-exists'
import crypto, { randomUUID } from 'node:crypto'
import { knex } from '../database'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'

export async function usersRoutes(app: FastifyInstance) {
  app.get('/', { preHandler: [checkSessionIdExists] }, async (request) => {
    const { sessionId } = request.cookies
    const data = await knex('users').where('session_id', sessionId).select('*')
    return data
  })

  app.post('/', async (request, response) => {
    const createUserSchema = z.object({
      name: z.string(),
      email: z.string().email(),
    })

    const { name, email } = createUserSchema.parse(request.body)
    const userByEmail = await knex('users').where({ email }).first()

    if (userByEmail) {
      return response.status(400).send({ message: 'User already exists' })
    }

    let { sessionId } = request.cookies

    if (!sessionId) {
      sessionId = randomUUID()

      response.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 dias
      })
    }

    await knex('users').insert({
      id: crypto.randomUUID(),
      session_id: sessionId,
      name,
      email,
    })

    return response.status(201).send()
  })
}
