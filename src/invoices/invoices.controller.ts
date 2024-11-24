import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';

@Controller('invoices')
export class InvoicesController {
  @Post()
  createInvoice(@Body(ValidationPipe) data: CreateInvoiceDto) {
    // Create invoice logic
    console.log(data);
  }
}
