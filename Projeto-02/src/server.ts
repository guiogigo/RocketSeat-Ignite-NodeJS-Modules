import fastify from 'fastify'

const app = fastify()

app.get('/', () => {
  return 'Servidor tá rodando'
})

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTP Server Running!')
  })
