import { PrismaUsersRepository } from '@/server/database/prisma/repositories/users-repository'
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common'
import { User } from '@prisma/client'

@Controller('users')
export class AppController {
  constructor(private readonly usersRepository: PrismaUsersRepository) {}

  @Get()
  @HttpCode(200)
  async fetch(@Query('name') name: string) {
    console.log('getting users...')
    const users = await this.usersRepository.findMany({ name })
    return users
  }

  @Get('/:id')
  @HttpCode(200)
  async find(@Param('id') id: string) {
    console.log('getting users...')
    const users = await this.usersRepository.findUnique(id)
    return users
  }

  @Post()
  @HttpCode(201)
  async create(@Body() user: User) {
    console.log('creating user...')
    const userCreated = await this.usersRepository.create(user)
    return userCreated
  }

  @Put('/:id')
  @HttpCode(204)
  async update(@Body() user: Partial<User>, @Param('id') id: string) {
    console.log('creating user...')

    const existingUser = await this.usersRepository.findUnique(id)

    if (!existingUser)
      throw new BadRequestException(`user "${id}" don't exists`)

    const newUser = {
      ...existingUser,
      ...user,
    }

    const userCreated = await this.usersRepository.update(newUser)
    return userCreated
  }

  @Delete('/:id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    console.log('creating user...')

    const existingUser = await this.usersRepository.findUnique(id)

    if (!existingUser)
      throw new BadRequestException(`user "${id}" don't exists`)

    await this.usersRepository.delete(id)

    return {
      id,
      status: 'deleted',
    }
  }
}
