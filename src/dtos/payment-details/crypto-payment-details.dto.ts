import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Network } from 'src/schemas/enums';

export class CryptoPaymentDetailsDto {
  @IsEnum(Network)
  network: Network;

  @IsString()
  @IsNotEmpty()
  address: string;
}
