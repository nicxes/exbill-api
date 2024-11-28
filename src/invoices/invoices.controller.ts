import {
  Get,
  Post,
  Body,
  Controller,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

// DTOs
import { CreateInvoiceDto } from './dto/create-invoice.dto';

// Services
import { CloudflareR2Service } from '../cloudflare-r2/cloudflare-r2.service';
import { InvoicesService } from './invoices.service';

@Controller('invoices')
export class InvoicesController {
  constructor(
    private readonly cloudflareR2Service: CloudflareR2Service,
    private readonly invoicesService: InvoicesService,
  ) {}

  @Get()
  findAll() {
    return this.invoicesService.findAll();
  }

  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  async createInvoice(
    @Body() data: CreateInvoiceDto,
    @UploadedFiles() files: Express.Multer.File[] = [],
  ) {
    // Save invoice and get the saved invoice
    let invoice = await this.invoicesService.create(data);

    // Upload logos to Cloudflare R2
    let fromLogoUrl: string | null = null;
    let toLogoUrl: string | null = null;

    for (const file of files) {
      const fileExtension = file.originalname.split('.').pop();

      if (file.fieldname === 'fromLogo') {
        const key = `invoices/${invoice.id}/from.${fileExtension}`;
        fromLogoUrl = await this.cloudflareR2Service.uploadFile(key, file);
      } else if (file.fieldname === 'toLogo') {
        const key = `invoices/${invoice.id}/to.${fileExtension}`;
        toLogoUrl = await this.cloudflareR2Service.uploadFile(key, file);
      }
    }

    // Update invoice with logo URLs
    invoice = await this.invoicesService.update(invoice.id, {
      fromLogo: fromLogoUrl,
      toLogo: toLogoUrl,
    });

    return {
      message: 'Invoice created successfully',
      invoice,
    };
  }
}
