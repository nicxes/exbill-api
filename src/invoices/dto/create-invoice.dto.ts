import {
  IsEnum,
  IsOptional,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Currency, PaymentMethod } from '@/utils/schemas/enums';
import { CryptoPaymentDetailsDto } from '@/utils/dtos/payment-details/crypto-payment-details.dto';
import { BankPaymentDetailsDto } from '@/utils/dtos/payment-details/bank-payment-details.dto';

export type PaymentDetails = BankPaymentDetailsDto | CryptoPaymentDetailsDto;

export class CreateInvoiceDto {
  // Invoice properties
  @IsDate()
  issueDate: Date;

  @IsDate()
  dueDate: Date;

  @IsEnum(Currency)
  currency: Currency;

  @IsString()
  @IsOptional()
  notes: string;

  @IsNumber()
  @IsOptional()
  discount: number;

  @IsNumber()
  @IsOptional()
  taxes: number;

  // Payment properties
  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;

  @ValidateNested() // Validates the nested object
  @Type(() => Object) // Use dynamic validation based on paymentMethod
  paymentDetails: BankPaymentDetailsDto | CryptoPaymentDetailsDto;

  // From properties
  @IsEmail()
  @IsNotEmpty()
  fromEmail: string;

  @IsString()
  @IsNotEmpty()
  fromName: string;

  @IsString()
  @IsOptional()
  fromLogo: string;

  @IsString()
  fromAddress: string;

  @IsString()
  fromCity: string;

  @IsString()
  fromState: string;

  @IsString()
  fromZip: string;

  @IsString()
  fromCountry: string;

  // To properties
  @IsEmail()
  @IsNotEmpty()
  toEmail: string;

  @IsString()
  @IsNotEmpty()
  toName: string;

  @IsString()
  @IsOptional()
  toLogo: string;

  @IsString()
  toAddress: string;

  @IsString()
  toCity: string;

  @IsString()
  toState: string;

  @IsString()
  toZip: string;

  @IsString()
  toCountry: string;
}
