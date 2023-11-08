import { PaginatedResultDto } from '@/models/base/dto/base.dto'
import { plainToClass } from 'class-transformer'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'website_event' })
export class WebsiteEvent {
  @PrimaryGeneratedColumn()
  event_id: string

  @Column({ type: 'uuid', nullable: false })
  website_id: string

  @Column({ type: 'uuid', nullable: false })
  session_id: string

  @Column({ type: 'timestamp', nullable: true, default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date

  public toPage(data: any) {
    return plainToClass(PaginatedResultDto, {
      items: data.items,
      ...data,
    })
  }
}

export type WebsiteEventDocument = WebsiteEvent
