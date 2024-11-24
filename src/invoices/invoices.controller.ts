import { Body, Controller, Post } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';

@Controller('invoices')
export class InvoicesController {
  @Post()
  createInvoice(@Body() data: CreateInvoiceDto) {
    // Create invoice logic
    console.log(data);
  }
}
