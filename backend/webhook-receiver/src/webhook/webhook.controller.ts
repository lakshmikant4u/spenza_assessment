// src/webhook/webhook.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  BadRequestException,
} from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

@Controller('webhooks')
export class WebhookController {
  constructor(
    private readonly webhookService: WebhookService,
    private readonly configService: ConfigService,
  ) {}

  // ✅ Securely handle incoming webhook events
  @Post('events')
  async handleWebhookEvent(
    @Body() body: { eventType: string; data: any },
    @Headers('x-signature') signature: string,
  ) {
    const secret = this.configService.get<string>('SHARED_SECRET');

    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(JSON.stringify(body))
      .digest('hex');

    if (signature !== expectedSignature) {
      throw new BadRequestException('Invalid signature');
    }

    return this.webhookService.handleEvent(body.eventType, body.data);
  }

  // ✅ Subscribe to a webhook
  @Post('subscribe')
  subscribe(@Body() body: { sourceUrl: string; callbackUrl: string }) {
    return this.webhookService.subscribe(body.sourceUrl, body.callbackUrl);
  }

  // ✅ Get all webhook subscriptions
  @Get('subscriptions')
  getAllSubscriptions() {
    return this.webhookService.getSubscriptions();
  }

  // ✅ Unsubscribe from a webhook by ID
  @Delete(':id/unsubscribe')
  unsubscribe(@Param('id') id: string) {
    return this.webhookService.unsubscribe(id);
  }
}
