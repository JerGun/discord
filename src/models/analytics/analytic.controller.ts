import { Controller, Get, Query } from '@nestjs/common'
import { SessionService } from './session.service'
import { WebsiteEventService } from './website-event.service'
import { WebsiteService } from './website.service'

@Controller('analytic')
export class AnalyticController {
  constructor(
    private sessionService: SessionService,
    private websiteService: WebsiteService,
    private websiteEventService: WebsiteEventService,
  ) {}

  @Get('stats')
  async getStats(@Query() params: any): Promise<{ uniques: number; views: number }> {
    const { website_id } = await this.websiteService.findOne({ domain: params.domain })
    return {
      uniques: await this.sessionService.findCount({ website_id: website_id }),
      views: await this.websiteEventService.findCount({ website_id: website_id }),
    }
  }
}
