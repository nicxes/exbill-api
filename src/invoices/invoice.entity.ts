import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Currency, PaymentMethod } from '../../utils/schemas/enums';

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date' })
  issueDate: Date;

  @Column({ type: 'date' })
  dueDate: Date;

  @Column({ type: 'enum', enum: Currency })
  currency: Currency;

  @Column({ nullable: true })
  notes: string;

  @Column({ type: 'decimal', nullable: true })
  discount: number;

  @Column({ type: 'decimal', nullable: true })
  taxes: number;

  @Column({ type: 'enum', enum: PaymentMethod })
  paymentMethod: PaymentMethod;

  @Column({ type: 'json', nullable: true })
  paymentDetails: Record<string, any>;

  // From properties
  @Column()
  fromEmail: string;

  @Column()
  fromName: string;

  @Column({ nullable: true })
  fromLogo: string;

  @Column()
  fromAddress: string;

  @Column()
  fromCity: string;

  @Column()
  fromState: string;

  @Column()
  fromZip: string;

  @Column()
  fromCountry: string;

  // To properties
  @Column()
  toEmail: string;

  @Column()
  toName: string;

  @Column({ nullable: true })
  toLogo: string;

  @Column()
  toAddress: string;

  @Column()
  toCity: string;

  @Column()
  toState: string;

  @Column()
  toZip: string;

  @Column()
  toCountry: string;
}
