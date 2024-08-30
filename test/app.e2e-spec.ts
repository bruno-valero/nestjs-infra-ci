import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import request from 'supertest'
import { AppModule } from '../src/server/app.module'

describe('AppController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('/users (POST)', async () => {
    const resp = await request(app.getHttpServer()).post('/users').send({
      name: 'teste',
      email: 'teste3@teste.com',
    })

    expect(resp.statusCode).toEqual(201)
    expect(resp.body).toEqual(
      expect.objectContaining({
        name: 'teste',
        email: 'teste3@teste.com',
      }),
    )
  })

  it('/users (GET)', async () => {
    const resp = await request(app.getHttpServer()).get('/users')

    expect(resp.statusCode).toEqual(200)
    expect(resp.body).toEqual(expect.any(Array))
  })
})
