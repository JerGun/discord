import { HttpService } from '@nestjs/axios'
import { Injectable, Logger } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'

@Injectable()
export class SchedulesService {
  constructor(private httpService: HttpService) {}

  private readonly logger = new Logger(SchedulesService.name)
  private readonly storeRefreshTimes = ['12:00', '12:04', '16:00', '16:04', '20:00', '20:04']
  private readonly stallRefreshTimes = ['23:55', '00:00']

  @Cron('0 * * * * *')
  async tradeRefresh() {
    if (process.env.NODE_ENV !== 'local') {
      const currentDate = new Date()
      const dateString = `${currentDate.toLocaleDateString('en-GB')}`
      const timeString = `${currentDate.toLocaleTimeString('en-GB', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Asia/Bangkok',
      })}`
      this.logger.log(`${dateString} ${timeString}`)
      try {
        if (this.storeRefreshTimes.includes(timeString)) {
          const minutes = parseInt(this.storeRefreshTimes.find((time) => time == timeString)?.slice(-2))
          if (!isNaN(minutes)) {
            const content = `${process.env.MEMBER_ROLE} ดึงการ์ด อีก ${5 - minutes} นาที`
            this.sendMessage(process.env.WEBHOOK_REMINDER, content)
          }
        }
        if (this.stallRefreshTimes.includes(timeString)) {
          const minutes = parseInt(this.stallRefreshTimes.find((time) => time == timeString)?.slice(-2))
          const timeDiffText = !isNaN(minutes) && minutes != 0 ? `อีก ${60 - minutes} นาที` : ''
          if (!isNaN(minutes)) {
            const content = `${process.env.MEMBER_ROLE} ขายของ ${timeDiffText}`
            this.sendMessage(process.env.WEBHOOK_REMINDER, content)
          }
        }
      } catch (error) {
        this.logger.error(error.message)
        this.sendMessage(process.env.WEBHOOK_ERROR, `${process.env.OWNER} Webhook error with message: ${error.message}`)
      }
    }
  }

  async sendMessage(url: string, content: any) {
    await this.httpService.axiosRef
      .post(url, { content: content }, { headers: { 'Content-Type': 'application/json; charset=UTF-8' } })
      .then(() => {
        this.logger.log('Send message success')
      })
  }
}
