import { it, expect, beforeAll, afterAll, describe, beforeEach } from 'vitest'
import { app } from '../src/app'
import request from 'supertest'
import { execSync } from 'node:child_process'

describe('Snacks Routes', () => {
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

  it('should be able to create a new snack', async () => {
    const userResponse = await request(app.server)
      .post('/users')
      .send({
        name: 'BOT',
        email: 'BOTTest@gmail.com',
      })
      .expect(201)

    const cookie = userResponse.get('Set-Cookie')

    expect(cookie).toEqual(
      expect.arrayContaining([expect.stringContaining('sessionId')]),
    )

    await request(app.server)
      .post('/snacks')
      .set('Cookie', cookie)
      .send({
        name: 'breakfast',
        description: 'Delicious',
        isOnDiet: true,
        date: new Date(),
      })
      .expect(201)
  })

  it('Should able to list all snacks from a user', async () => {
    const userResponse = await request(app.server)
      .post('/users')
      .send({
        name: 'BOT',
        email: 'BOTTest@gmail.com',
      })
      .expect(201)

    const cookie = userResponse.get('Set-Cookie')

    expect(cookie).toEqual(
      expect.arrayContaining([expect.stringContaining('sessionId')]),
    )

    await request(app.server)
      .post('/snacks')
      .set('Cookie', cookie)
      .send({
        name: 'breakfast',
        description: 'Delicious',
        isOnDiet: true,
        date: new Date(),
      })
      .expect(201)

    await request(app.server)
      .post('/snacks')
      .set('Cookie', cookie)
      .send({
        name: 'Lunch',
        description: 'Delicious',
        isOnDiet: true,
        date: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 day after
      })
      .expect(201)

    const snacksResponse = await request(app.server)
      .get('/snacks')
      .set('Cookie', cookie)
      .expect(200)

    expect(snacksResponse.body.snacks).toHaveLength(2)

    // Testa se a ordenação está correta
    expect(snacksResponse.body.snacks[0].name).toBe('Lunch')
    expect(snacksResponse.body.snacks[1].name).toBe('breakfast')
  })

  it('shoud able to show a single meal', async () => {
    const userResponse = await request(app.server)
      .post('/users')
      .send({
        name: 'BOT',
        email: 'BOTTest@gmail.com',
      })
      .expect(201)

    const cookie = userResponse.get('Set-Cookie')

    expect(cookie).toEqual(
      expect.arrayContaining([expect.stringContaining('sessionId')]),
    )

    await request(app.server)
      .post('/snacks')
      .set('Cookie', cookie)
      .send({
        name: 'breakfast',
        description: 'Delicious',
        isOnDiet: true,
        date: new Date(),
      })
      .expect(201)

    await request(app.server)
      .post('/snacks')
      .set('Cookie', cookie)
      .send({
        name: 'Lunch',
        description: 'Delicious',
        isOnDiet: true,
        date: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 day after
      })
      .expect(201)

    const snacksResponse = await request(app.server)
      .get('/snacks')
      .set('Cookie', cookie)
      .expect(200)

    const snackId = snacksResponse.body.snacks[0].id

    const snacksSelected = await request(app.server)
      .get(`/snacks/${snackId}`)
      .set('Cookie', cookie)
      .expect(200)

    expect(snacksSelected.body.snack.name).toBe('Lunch')
  })

  it('should able to update a snack from a user', async () => {
    const userResponse = await request(app.server)
      .post('/users')
      .send({
        name: 'BOT',
        email: 'BOTTest@gmail.com',
      })
      .expect(201)

    const cookie = userResponse.get('Set-Cookie')

    expect(cookie).toEqual(
      expect.arrayContaining([expect.stringContaining('sessionId')]),
    )

    await request(app.server)
      .post('/snacks')
      .set('Cookie', cookie)
      .send({
        name: 'breakfast',
        description: 'Delicious',
        isOnDiet: true,
        date: new Date(),
      })
      .expect(201)

    const snacksResponse = await request(app.server)
      .get('/snacks')
      .set('Cookie', cookie)
      .expect(200)

    const snackId = snacksResponse.body.snacks[0].id

    let snacksSelected = await request(app.server)
      .get(`/snacks/${snackId}`)
      .set('Cookie', cookie)
      .expect(200)

    expect(snacksSelected.body.snack.name).toBe('breakfast')

    await request(app.server)
      .put(`/snacks/${snackId}`)
      .set('Cookie', cookie)
      .send({
        name: 'Lunch',
        description: 'Delicious',
        isOnDiet: true,
        date: new Date(),
      })
      .expect(204)

    snacksSelected = await request(app.server)
      .get(`/snacks/${snackId}`)
      .set('Cookie', cookie)
      .expect(200)

    expect(snacksSelected.body.snack.name).toBe('Lunch')
  })

  it('Should able to delete a snack from a user', async () => {
    const userResponse = await request(app.server)
      .post('/users')
      .send({
        name: 'BOT',
        email: 'BOTTest@gmail.com',
      })
      .expect(201)

    const cookie = userResponse.get('Set-Cookie')

    expect(cookie).toEqual(
      expect.arrayContaining([expect.stringContaining('sessionId')]),
    )

    await request(app.server)
      .post('/snacks')
      .set('Cookie', cookie)
      .send({
        name: 'breakfast',
        description: 'Delicious',
        isOnDiet: true,
        date: new Date(),
      })
      .expect(201)

    await request(app.server)
      .post('/snacks')
      .set('Cookie', cookie)
      .send({
        name: 'Lunch',
        description: 'Delicious',
        isOnDiet: true,
        date: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 day after
      })
      .expect(201)

    let snacksResponse = await request(app.server)
      .get('/snacks')
      .set('Cookie', cookie)
      .expect(200)

    const snackId = snacksResponse.body.snacks[0].id

    await request(app.server)
      .delete(`/snacks/${snackId}`)
      .set('Cookie', cookie)
      .expect(204)

    snacksResponse = await request(app.server)
      .get('/snacks')
      .set('Cookie', cookie)
      .expect(200)

    expect(snacksResponse.body.snacks).toHaveLength(1)
  })

  it('Should able to get metrics from a user', async () => {
    const userResponse = await request(app.server)
      .post('/users')
      .send({
        name: 'BOT',
        email: 'BOTTest@gmail.com',
      })
      .expect(201)

    const cookie = userResponse.get('Set-Cookie')

    expect(cookie).toEqual(
      expect.arrayContaining([expect.stringContaining('sessionId')]),
    )

    await request(app.server)
      .post('/snacks')
      .set('Cookie', userResponse.get('Set-Cookie'))
      .send({
        name: 'Breakfast',
        description: "It's a breakfast",
        isOnDiet: true,
        date: new Date('2021-01-01T08:00:00'),
      })
      .expect(201)

    await request(app.server)
      .post('/snacks')
      .set('Cookie', userResponse.get('Set-Cookie'))
      .send({
        name: 'Lunch',
        description: "It's a lunch",
        isOnDiet: false,
        date: new Date('2021-01-01T12:00:00'),
      })
      .expect(201)

    await request(app.server)
      .post('/snacks')
      .set('Cookie', userResponse.get('Set-Cookie'))
      .send({
        name: 'Snack',
        description: "It's a snack",
        isOnDiet: true,
        date: new Date('2021-01-01T15:00:00'),
      })
      .expect(201)

    await request(app.server)
      .post('/snacks')
      .set('Cookie', userResponse.get('Set-Cookie'))
      .send({
        name: 'Dinner',
        description: "It's a dinner",
        isOnDiet: true,
        date: new Date('2021-01-01T20:00:00'),
      })

    await request(app.server)
      .post('/snacks')
      .set('Cookie', userResponse.get('Set-Cookie'))
      .send({
        name: 'Breakfast',
        description: "It's a breakfast",
        isOnDiet: true,
        date: new Date('2021-01-02T08:00:00'),
      })

    const metricsResponse = await request(app.server)
      .get('/snacks/metrics')
      .set('Cookie', cookie)
      .expect(200)

    expect(metricsResponse.body).toEqual({
      TotalSnacks: `Total de refeições: 5`,
      TotalSnacksOnDiet: `Total de refeições dentro da dieta: 4`,
      TotalSnacksOffDiet: `Total de refeições fora da dieta: 1`,
      BestSequenceOnDiet: `Melhor sequencia de refeições dentro da dieta: 3`,
    })
  })
})
