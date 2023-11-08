import './environments'
import './splash'

import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AnalyticController } from './models/analytics/analytic.controller'
import { AnalyticModule } from './models/analytics/analytic.module'
import { SessionService } from './models/analytics/session.service'
import { WebsiteEventService } from './models/analytics/website-event.service'
import { WebsiteService } from './models/analytics/website.service'
import { SchedulesService } from './models/schedules/schedules.service'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      schema: process.env.DB_SCHEMA,
      autoLoadEntities: true,
      synchronize: false, //! Danger
      logging: false,
    }),
    HttpModule.register({
      timeout: 15000,
      maxRedirects: 5,
    }),
    ScheduleModule.forRoot(),
    AnalyticModule,
  ],
  controllers: [AppController, AnalyticController],
  providers: [AppService, SchedulesService, SessionService, WebsiteService, WebsiteEventService],
})
export class AppModule {}
