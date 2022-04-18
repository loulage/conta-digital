import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from './accounts/modules/account.module';
import { TransactionModule } from './transactions/modules/transacton.module';

@Module({
  imports: [AccountModule, TransactionModule, TypeOrmModule.forRoot()],
})
export class AppModule {}
