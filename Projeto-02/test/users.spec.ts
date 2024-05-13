import { it, expect, beforeAll, afterAll, describe, beforeEach } from 'vitest'
import { app } from '../src/app'
import request from 'supertest'
import { execSync } from 'node:child_process'

describe('Users Routes', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(() => {
    execSync('npm run knex migrate:rollback --all')
    execSync('npm run knex migrate:latest')
  })

  it('should be able to create a new user', async () => {
    const response = await request(app.server)
      .post('/users')
      .send({
        name: 'BOT',
        email: 'BOTTest@gmail.com',
      })
      .expect(201)

    const cookie = response.get('Set-Cookie')

    expect(cookie).toEqual(
      expect.arrayContaining([expect.stringContaining('sessionId')]),
    )

    await request(app.server).get('/users').set('Cookie', cookie).expect(200)
  })
})
