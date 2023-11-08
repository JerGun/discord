import { PaginatedResultDto } from '@/models/base/dto/base.dto'
import { plainToClass } from 'class-transformer'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'session' })
export class Session {
  @PrimaryGeneratedColumn()
  session_id: string

  @Column({ type: 'uuid', nullable: false })
  website_id: string

  @Column({ type: 'varchar', length: 100, nullable: true })
  hostname: string

  @Column({ type: 'timestamp', nullable: true, default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date

  public toPage(data: any) {
    return plainToClass(PaginatedResultDto, {
      items: data.items,
      ...data,
    })
  }
}

export type SessionDocument = Session
