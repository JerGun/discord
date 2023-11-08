import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { BaseService } from '../base/base.service'
import { Session, SessionDocument } from './entity/session.entity'

@Injectable()
export class SessionService extends BaseService<SessionDocument> {
  constructor(@InjectRepository(Session) repo: Repository<SessionDocument>) {
    super(repo)
  }
}
