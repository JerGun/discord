import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import './environments'
import './splash'
import { SchedulesService } from './models/schedules/schedules.service'
import { ScheduleModule } from '@nestjs/schedule'

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: process.env.DB_HOST,
    //   port: Number(process.env.DB_PORT),
    //   username: process.env.DB_USER,
    //   password: process.env.DB_PASS,
    //   database: process.env.DB_NAME,
    //   schema: process.env.DB_SCHEMA,
    //   autoLoadEntities: true,
    //   synchronize: false, //! Danger
    //   logging: false,
    // }),
    HttpModule.register({
      timeout: 15000,
      maxRedirects: 5,
    }),
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService, SchedulesService],
})
export class AppModule {}
