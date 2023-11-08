import { Test, TestingModule } from '@nestjs/testing';
import { WebsiteEventService } from './website-event.service';

describe('WebsiteEventService', () => {
  let service: WebsiteEventService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebsiteEventService],
    }).compile();

    service = module.get<WebsiteEventService>(WebsiteEventService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
