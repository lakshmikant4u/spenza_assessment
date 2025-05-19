// src/webhook/webhook.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WebhookEventDocument = WebhookEvent & Document;
export type WebhookSubscriptionDocument = WebhookSubscription & Document;

@Schema({ timestamps: true })
export class WebhookEvent {
  @Prop({ required: true })
  eventType: string;

  @Prop({ type: Object })
  data: any;
}
export const WebhookEventSchema = SchemaFactory.createForClass(WebhookEvent);

@Schema({ timestamps: true })
export class WebhookSubscription {
  @Prop({ required: true })
  sourceUrl: string;

  @Prop({ required: true })
  callbackUrl: string;
}
export const WebhookSubscriptionSchema =
  SchemaFactory.createForClass(WebhookSubscription);
