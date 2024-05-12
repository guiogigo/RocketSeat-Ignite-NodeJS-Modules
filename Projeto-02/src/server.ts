import fastify from 'fastify'
// import cookie from '@fastify/cookie'
import { knex } from './database'

const app = fastify()

// app.register(cookie)

app.get('/', async () => {
  const tables = await knex('sqlite_schema').select('*')
  return tables
})

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTP Server Running!')
  })
