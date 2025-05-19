// src/webhook/webhook.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  WebhookEvent,
  WebhookEventDocument,
  WebhookSubscription,
  WebhookSubscriptionDocument,
} from './webhook.schema';
import { Model } from 'mongoose';

@Injectable()
export class WebhookService {
  constructor(
    @InjectModel(WebhookEvent.name)
    private webhookEventModel: Model<WebhookEventDocument>,
    @InjectModel(WebhookSubscription.name)
    private webhookSubscriptionModel: Model<WebhookSubscriptionDocument>,
  ) {}

  // ✅ Save verified event to DB
  async handleEvent(eventType: string, data: any) {
    const event = new this.webhookEventModel({ eventType, data });
    return event.save();
  }

  // ✅ Subscribe to webhook
  async subscribe(sourceUrl: string, callbackUrl: string) {
    const existing = await this.webhookSubscriptionModel.findOne({
      sourceUrl,
      callbackUrl,
    });

    if (existing) return existing;

    const sub = new this.webhookSubscriptionModel({ sourceUrl, callbackUrl });
    return sub.save();
  }

  // ✅ List subscriptions
  async getSubscriptions() {
    return this.webhookSubscriptionModel.find().exec();
  }

  // ✅ Delete a subscription
  async unsubscribe(id: string) {
    const result = await this.webhookSubscriptionModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException('Subscription not found');
    return { message: 'Unsubscribed successfully' };
  }
}
