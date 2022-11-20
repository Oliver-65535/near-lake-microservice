import { Inject, Injectable } from '@nestjs/common';
import { startStream, types } from 'near-lake-framework';
import { HttpService } from '@nestjs/axios';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
require('dotenv').config();

const lakeConfig: types.LakeConfig = {
  s3BucketName: process.env.AWS_BUCKET_NAME,
  s3RegionName: process.env.AWS_REGION_NAME,
  startBlockHeight: 100767387, //91922247,
};
const data = {
  jsonrpc: '2.0',
  id: 'dontcare',
  method: 'block',
  params: {
    finality: 'final',
  },
};

const options = {
  headers: { 'content-type': 'application/json' },
};

@Injectable()
export class NearLakeService {
  client: ClientProxy;

  constructor(private readonly httpService: HttpService) {
    this.client = ClientProxyFactory.create({
      transport: Transport.REDIS,
      options: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
      },
    });
  }
  handleStreamerMessage(streamerMessage: types.StreamerMessage): Promise<void> {
    console.log(
      `Block #${streamerMessage.block.header.height} Shards: ${streamerMessage.shards.length}`,
    );
    this.publishEvent(streamerMessage);
    return;
  }

  async getStart() {
    const res = await this.httpService
      .post(process.env.NEAR_NODE_URL, data, options)
      .toPromise();

    //console.log(res.data);
    console.log(res.data.result.header.height);

    lakeConfig.startBlockHeight = res.data.result.header.height;
    await startStream(lakeConfig, this.handleStreamerMessage.bind(this));
  }

  async publishEvent(block: any) {
    this.client.emit('near-lake-new-block', block);
  }
}
