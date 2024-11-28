import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseService } from './database.service';
import { typeOrmAsyncConfig } from './database.config';

@Module({
  imports: [TypeOrmModule.forRootAsync(typeOrmAsyncConfig)],
  providers: [DatabaseService],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
