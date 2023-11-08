import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { BaseService } from '../base/base.service'
import { WebsiteEvent, WebsiteEventDocument } from './entity/website-event.entity'

@Injectable()
export class WebsiteEventService extends BaseService<WebsiteEventDocument> {
  constructor(@InjectRepository(WebsiteEvent) repo: Repository<WebsiteEventDocument>) {
    super(repo)
  }
}
