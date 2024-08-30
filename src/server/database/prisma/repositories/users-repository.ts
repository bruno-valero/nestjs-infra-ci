import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { User } from '@prisma/client'

@Injectable()
export class PrismaUsersRepository {
  constructor(private prisma: PrismaService) {}

  async create(user: User) {
    const resp = await this.prisma.user.create({
      data: user,
    })

    return resp
  }

  async update(user: User) {
    const resp = await this.prisma.user.update({
      where: { id: user.id },
      data: user,
    })

    return resp
  }

  async findUnique(id: string) {
    const resp = await this.prisma.user.findUnique({
      where: { id },
    })

    return resp
  }

  async findMany({ name }: { name?: string }) {
    const resp = await this.prisma.user.findMany({
      where: { name },
    })

    return resp
  }

  async delete(id: string) {
    await this.prisma.user.delete({
      where: { id },
    })
  }
}
