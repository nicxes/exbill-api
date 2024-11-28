import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InvoicesModule } from './invoices/invoices.module';
import { CloudflareR2Service } from './cloudflare-r2/cloudflare-r2.service';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [InvoicesModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService, CloudflareR2Service],
})
export class AppModule {}
