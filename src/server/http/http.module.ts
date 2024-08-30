import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'
import { controllers } from './controllers/@exports/controllers.exports'

@Module({
  imports: [DatabaseModule],
  providers: [],
  controllers: [...controllers],
  exports: [],
})
export class HttpModule {}
