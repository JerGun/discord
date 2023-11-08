import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Website, WebsiteDocument } from './entity/website.entity'
import { BaseService } from '../base/base.service'

@Injectable()
export class WebsiteService extends BaseService<WebsiteDocument> {
  constructor(@InjectRepository(Website) repo: Repository<WebsiteDocument>) {
    super(repo)
  }
}
