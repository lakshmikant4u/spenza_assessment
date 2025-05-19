// src/webhook/webhook.controller.ts
import {
    Controller,
    Post,
    Body,
    Headers,
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
  
    @Post('events')
    async handleWebhook(
      @Body() body: any,
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
  
      return this.webhookService.saveEvent(body);
    }
  }
  