import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'website' })
export class Website {
  @PrimaryGeneratedColumn()
  website_id: string

  @Column({ type: 'varchar', length: 500, nullable: true })
  domain: string
}

export type WebsiteDocument = Website
