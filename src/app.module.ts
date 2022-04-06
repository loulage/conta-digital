import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from './modules/account.module';
import { TransactionModule } from './modules/transacton.module';
import { AccountService } from './services/account.service';

@Module({
  imports: [AccountModule, TransactionModule, TypeOrmModule.forRoot()],
})
export class AppModule {}
