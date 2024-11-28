import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invoice } from './invoice.entity';
import { CreateInvoiceDto } from './dto/create-invoice.dto';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
  ) {}

  async create(createInvoiceDto: CreateInvoiceDto): Promise<Invoice> {
    const invoice = this.invoiceRepository.create(createInvoiceDto);
    return this.invoiceRepository.save(invoice);
  }

  async update(id: string, updateData: Partial<Invoice>): Promise<Invoice> {
    await this.invoiceRepository.update(id, updateData);
    return this.findOne(id);
  }

  findAll(): Promise<Invoice[]> {
    return this.invoiceRepository.find();
  }

  findOne(id: string): Promise<Invoice> {
    return this.invoiceRepository.findOneBy({ id });
  }
}
