// src/webhook/webhook.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WebhookController } from './webhook.controller';
import { WebhookService } from './webhook.service';
import {
  WebhookEvent,
  WebhookEventSchema,
  WebhookSubscription,
  WebhookSubscriptionSchema,
} from './webhook.schema';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      { name: WebhookEvent.name, schema: WebhookEventSchema },
      { name: WebhookSubscription.name, schema: WebhookSubscriptionSchema },
    ]),
  ],
  controllers: [WebhookController],
  providers: [WebhookService],
})
export class WebhookModule {}
