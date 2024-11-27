import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { v4 as uuidv4 } from 'uuid';

// DTOs
import { CreateInvoiceDto } from './dto/create-invoice.dto';

// Services
import { CloudflareR2Service } from '../cloudflare-r2/cloudflare-r2.service';

@Controller('invoices')
export class InvoicesController {
  constructor(private readonly cloudflareR2Service: CloudflareR2Service) {}

  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  async createInvoice(
    @Body() data: CreateInvoiceDto,
    @UploadedFiles() files: Express.Multer.File[] = [],
  ) {
    const invoiceId = uuidv4();

    let fromLogoUrl: string | null = null;
    let toLogoUrl: string | null = null;

    for (const file of files) {
      const fileExtension = file.originalname.split('.').pop();

      if (file.fieldname === 'fromLogo') {
        const key = `invoices/${invoiceId}/from.${fileExtension}`;
        fromLogoUrl = await this.cloudflareR2Service.uploadFile(key, file);
      } else if (file.fieldname === 'toLogo') {
        const key = `invoices/${invoiceId}/to.${fileExtension}`;
        toLogoUrl = await this.cloudflareR2Service.uploadFile(key, file);
      }
    }

    data.fromLogo = fromLogoUrl;
    data.toLogo = toLogoUrl;

    return {
      message: 'Invoice created successfully',
      invoice: {
        id: invoiceId,
        ...data,
      },
    };
  }
}
