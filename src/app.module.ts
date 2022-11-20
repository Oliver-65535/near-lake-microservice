import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NearLakeModule } from './near-lake/near-lake.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    NearLakeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
