import {
  Get,
  Post,
  Body,
  Param,
  Delete,
  Controller,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

// DTOs
import { CreateInvoiceDto } from './dto/create-invoice.dto';

// Entities
import { Invoice } from './invoice.entity';

// Services
import { CloudflareR2Service } from '../cloudflare-r2/cloudflare-r2.service';

@Controller('invoices')
export class InvoicesController {
  constructor(
    private readonly cloudflareR2Service: CloudflareR2Service,
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
  ) {}

  /**
   * Retrieve all invoices.
   * @returns A list of all invoices.
   */
  @Get()
  findAll() {
    return this.invoiceRepository.find();
  }

  /**
   * Retrieve a specific invoice by its ID.
   * @param id The ID of the invoice to retrieve.
   * @returns The requested invoice.
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invoiceRepository.findOneBy({ id });
  }

  /**
   * Create a new invoice and optionally upload associated logos.
   * @param data The data for the invoice.
   * @param files Optional logo files (fromLogo, toLogo).
   * @returns The created invoice with updated logo URLs.
   */
  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  async create(
    @Body() data: CreateInvoiceDto,
    @UploadedFiles() files: Express.Multer.File[] = [],
  ) {
    // Create and save invoice
    const invoice = this.invoiceRepository.create(data);
    const savedInvoice = await this.invoiceRepository.save(invoice);

    // Upload logos to Cloudflare R2
    let fromLogoUrl: string | null = null;
    let toLogoUrl: string | null = null;

    for (const file of files) {
      const fileExtension = file.originalname.split('.').pop();

      if (file.fieldname === 'fromLogo') {
        const key = `invoices/${savedInvoice.id}/from.${fileExtension}`;
        fromLogoUrl = await this.cloudflareR2Service.uploadFile(key, file);
      } else if (file.fieldname === 'toLogo') {
        const key = `invoices/${savedInvoice.id}/to.${fileExtension}`;
        toLogoUrl = await this.cloudflareR2Service.uploadFile(key, file);
      }
    }

    // Update invoice with logo URLs
    savedInvoice.fromLogo = fromLogoUrl;
    savedInvoice.toLogo = toLogoUrl;
    await this.invoiceRepository.save(savedInvoice);

    return {
      message: 'Invoice created successfully',
      invoice: savedInvoice,
    };
  }

  /**
   * Delete an invoice by its ID.
   * @param id The ID of the invoice to delete.
   * @returns A message indicating the result of the operation.
   */
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const result = await this.invoiceRepository.delete(id);

    if (result.affected === 0) {
      return { message: `Invoice with ID ${id} not found.` };
    }

    return { message: `Invoice with ID ${id} deleted successfully.` };
  }
}
