import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { InvoicesController } from './invoices.controller';
import { InvoicesService } from './invoices.service';
import { CloudflareR2Service } from '../cloudflare-r2/cloudflare-r2.service';
import { Invoice } from './invoice.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Invoice])],
  controllers: [InvoicesController],
  providers: [InvoicesService, CloudflareR2Service],
})
export class InvoicesModule {}
