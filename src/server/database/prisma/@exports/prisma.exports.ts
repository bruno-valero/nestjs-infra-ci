import { ModuleMetadata, Provider } from '@nestjs/common'
import { PrismaUsersRepository } from '../repositories/users-repository'

const eventsRepositoris: Provider[] = [PrismaUsersRepository]

export const repositories: Provider[] = [...eventsRepositoris]

export const repositoriesExports: NonNullable<ModuleMetadata['exports']> = [
  PrismaUsersRepository,
]
