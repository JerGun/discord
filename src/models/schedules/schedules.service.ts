import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'

@Injectable()
export class SchedulesService {
  constructor(private httpService: HttpService) {}

  private readonly storeRefreshTimes = ['12:00', '12:04', '16:00', '16:04', '20:00', '20:04']
  private readonly stallRefreshTimes = ['23:55', '00:00']

  @Cron('*/10 * * * * *')
  async tradeRefresh() {
    const currentDate = new Date()
    const timeString = `${currentDate.toLocaleTimeString('en-GB', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Bangkok',
    })}`
    if (this.storeRefreshTimes.includes(timeString)) {
      const minutes = parseInt(this.storeRefreshTimes.find((time) => time == timeString)?.slice(-2))
      if (!isNaN(minutes)) {
        const content = `${process.env.MEMBER_ROLE} ดึงการ์ด อีก ${5 - minutes} นาที}`
        this.sendMessage(content)
      }
    }
    if (this.stallRefreshTimes.includes(timeString)) {
      const minutes = parseInt(this.stallRefreshTimes.find((time) => time == timeString)?.slice(-2))
      const timeDiffText = !isNaN(minutes) && minutes != 0 ? `อีก ${60 - minutes} นาที` : ''
      if (!isNaN(minutes)) {
        const content = `${process.env.MEMBER_ROLE} ขายของ ${timeDiffText}`
        this.sendMessage(content)
      }
    }
  }

  async sendMessage(content: any) {
    await this.httpService.axiosRef.post(
      process.env.WEBHOOK_REMINDER,
      { content: content },
      { headers: { 'Content-Type': 'application/json; charset=UTF-8' } },
    )
  }
}