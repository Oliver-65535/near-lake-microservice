import { Module } from '@nestjs/common';
import { NearLakeService } from './near-lake.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [NearLakeService],
})
export class NearLakeModule {}
