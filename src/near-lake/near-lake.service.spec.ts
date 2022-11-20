import { Test, TestingModule } from '@nestjs/testing';
import { NearLakeService } from './near-lake.service';

describe('NearLakeService', () => {
  let service: NearLakeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NearLakeService],
    }).compile();

    service = module.get<NearLakeService>(NearLakeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
