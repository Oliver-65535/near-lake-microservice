import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { NearLakeService } from './near-lake/near-lake.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //await app.listen(3000);
  const appService = app.get(NearLakeService).getStart();
}
bootstrap();
