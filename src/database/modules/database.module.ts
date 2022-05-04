import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AccountEntity } from "src/accounts/entities/account.entity";
import { TransactionEntity } from "src/transactions/entities/transaction.entity";

@Module({
    imports: [TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '842708',
        database: 'desafio',
        entities: [AccountEntity, TransactionEntity],
        synchronize: true
    })]
})

export class DatabaseModule {}