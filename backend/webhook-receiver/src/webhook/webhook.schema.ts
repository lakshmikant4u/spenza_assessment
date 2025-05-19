// src/webhook/webhook.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WebhookEventDocument = WebhookEvent & Document;

@Schema()
export class WebhookEvent {
  @Prop({ required: true })
  eventType: string;

  @Prop({ type: Object })
  data: Record<string, any>;

  @Prop({ default: Date.now })
  receivedAt: Date;
}

export const WebhookEventSchema = SchemaFactory.createForClass(WebhookEvent);
