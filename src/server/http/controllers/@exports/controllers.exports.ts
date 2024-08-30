import { ModuleMetadata } from '@nestjs/common'
import { AppController } from '../app.controller'

const orderControllers: NonNullable<ModuleMetadata['controllers']> = [
  AppController,
]

export const controllers: NonNullable<ModuleMetadata['controllers']> = [
  ...orderControllers,
]
