import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Session } from './entity/session.entity'
import { Website } from './entity/website.entity'
import { WebsiteEvent } from './entity/website-event.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Session, Website, WebsiteEvent])],
  exports: [TypeOrmModule],
})
export class AnalyticModule {}
