import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from './accounts/entities/account.entity';
import { AccountModule } from './accounts/modules/account.module';
import { DatabaseModule } from './database/modules/database.module';
import { TransactionEntity } from './transactions/entities/transaction.entity';
import { TransactionModule } from './transactions/modules/transacton.module';

@Module({
  imports: [AccountModule, TransactionModule, TypeOrmModule.forRoot(
    {
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '842708',
      database: 'desafio',
      entities: [AccountEntity, TransactionEntity],
      synchronize: true
  }
  ), ],
})
export class AppModule {}
