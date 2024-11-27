import { Module } from '@nestjs/common';
import { InvoicesController } from './invoices.controller';
import { InvoicesService } from './invoices.service';
import { CloudflareR2Service } from '../cloudflare-r2/cloudflare-r2.service';

@Module({
  controllers: [InvoicesController],
  providers: [InvoicesService, CloudflareR2Service],
})
export class InvoicesModule {}
