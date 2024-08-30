import { Module } from '@nestjs/common'
import { AppService } from './app.service'
import { HttpModule } from './http/http.module'

@Module({
  imports: [HttpModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
