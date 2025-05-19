// src/webhook/webhook.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { WebhookEvent, WebhookEventDocument } from './webhook.schema';
import { Model } from 'mongoose';

@Injectable()
export class WebhookService {
  constructor(
    @InjectModel(WebhookEvent.name)
    private webhookModel: Model<WebhookEventDocument>,
  ) {}

  async saveEvent(payload: any): Promise<WebhookEvent> {
    const newEvent = new this.webhookModel({
      eventType: payload.eventType,
      data: payload.data,
    });
    return newEvent.save();
  }
}
