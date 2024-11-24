import { IsString, IsOptional, IsEnum, IsNotEmpty } from 'class-validator';

export class BankPaymentDetailsDto {
  @IsString()
  @IsNotEmpty()
  accountHolderName: string;

  @IsString()
  @IsNotEmpty()
  bankName: string;

  @IsString()
  @IsNotEmpty()
  routingNumber: string;

  @IsString()
  @IsNotEmpty()
  accountNumber: string;

  @IsEnum(['CHECKING', 'SAVINGS'])
  accountType: 'CHECKING' | 'SAVINGS';

  @IsString()
  @IsNotEmpty()
  accountAddress: string;

  @IsString()
  @IsOptional()
  swiftCode?: string; // Optional for international transfers
}
