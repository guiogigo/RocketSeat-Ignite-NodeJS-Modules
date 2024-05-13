import { checkSessionIdExists } from '../middleware/check-sessionId-exists'
import { randomUUID } from 'node:crypto'
import { knex } from '../database'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'

export async function snacksRoutes(app: FastifyInstance) {
  app.post(
    '/',
    { preHandler: [checkSessionIdExists] },
    async (request, response) => {
      const createSnackSchema = z.object({
        name: z.string(),
        description: z.string(),
        isOnDiet: z.boolean(),
        date: z.coerce.date(),
      })

      const { name, description, isOnDiet, date } = createSnackSchema.parse(
        request.body,
      )

      await knex('snacks').insert({
        id: randomUUID(),
        name,
        description,
        is_on_diet: isOnDiet,
        date: date.getTime(),
        user_id: request.user?.id,
      })

      return response.status(201).send()
    },
  )

  app.get(
    '/',
    { preHandler: [checkSessionIdExists] },
    async (request, response) => {
      const user = request.user?.id
      const snacks = await knex('snacks')
        .where('user_id', user)
        .orderBy('date', 'desc')

      return response.send({ snacks })
    },
  )

  app.get(
    '/:idSnack',
    { preHandler: [checkSessionIdExists] },
    async (request, response) => {
      const paramsSchema = z.object({ idSnack: z.string().uuid() })
      const { idSnack } = paramsSchema.parse(request.params)

      const snack = await knex('snacks').where('id', idSnack).first()

      if (!snack) {
        return response.status(404).send({ error: 'Snack not found' })
      }

      return response.send({ snack })
    },
  )

  app.delete(
    '/:idSnack',
    { preHandler: [checkSessionIdExists] },
    async (request, response) => {
      const paramsSchema = z.object({ idSnack: z.string().uuid() })
      const { idSnack } = paramsSchema.parse(request.params)

      const snack = await knex('snacks').where('id', idSnack).first()

      if (!snack) {
        return response.status(404).send({ error: 'Snack not found' })
      }

      await knex('snacks').where('id', idSnack).delete()
      return response.status(204).send()
    },
  )

  app.put(
    '/:idSnack',
    { preHandler: [checkSessionIdExists] },
    async (request, response) => {
      const paramsSchema = z.object({ idSnack: z.string().uuid() })
      const { idSnack } = paramsSchema.parse(request.params)

      const snack = await knex('snacks').where('id', idSnack).first()

      if (!snack) {
        return response.status(404).send({ error: 'Snack not found.' })
      }

      const updateSnackSchema = z.object({
        name: z.string(),
        description: z.string(),
        isOnDiet: z.boolean(),
        date: z.coerce.date(),
      })

      const { name, description, isOnDiet, date } = updateSnackSchema.parse(
        request.body,
      )

      await knex('snacks').where('id', idSnack).update({
        name,
        description,
        is_on_diet: isOnDiet,
        date: date.getTime(),
      })

      return response.status(204).send()
    },
  )

  app.get(
    '/metrics',
    { preHandler: [checkSessionIdExists] },
    async (request, response) => {
      const user = request.user?.id

      const TotalSnacks = await await knex('snacks').where('user_id', user)

      const TotalOnDiet = (
        await knex('snacks').where('user_id', user).andWhere('is_on_diet', true)
      ).length
      const TotalOffDiet = (
        await knex('snacks')
          .where('user_id', user)
          .andWhere('is_on_diet', false)
      ).length

      const { bestOnDietSequence } = TotalSnacks.reduce(
        (acc, snack) => {
          if (snack.is_on_diet) {
            acc.currentSequence++
          } else acc.currentSequence = 0

          if (acc.currentSequence > acc.bestOnDietSequence) {
            acc.bestOnDietSequence = acc.currentSequence
          }

          return acc
        },
        { currentSequence: 0, bestOnDietSequence: 0 },
      )

      return response.send({
        TotalSnacks: `Total de refeições: ${TotalSnacks.length}`,
        TotalSnacksOnDiet: `Total de refeições dentro da dieta: ${TotalOnDiet}`,
        TotalSnacksOffDiet: `Total de refeições fora da dieta: ${TotalOffDiet}`,
        BestSequenceOnDiet: `Melhor sequencia de refeições dentro da dieta: ${bestOnDietSequence}`,
      })
    },
  )
}
