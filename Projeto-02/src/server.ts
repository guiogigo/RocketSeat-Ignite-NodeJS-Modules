// import cookie from '@fastify/cookie'
import crypto from 'node:crypto'
import { knex } from './database'

import { env } from './env'
import { app } from './app'

// app.register(cookie)

app.get('/', async () => {
  const snack = await knex('snacks')
    .insert({
      id: crypto.randomUUID(),
      user_id: crypto.randomUUID(),
      name: 'Almoço',
      description: 'Gostoso que só',
      date: 'Hoje',
      is_on_diet: true,
    })
    .returning('*')

  return snack
})

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('HTTP Server Running!')
  })
