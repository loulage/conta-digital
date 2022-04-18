import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TransactionController } from "src/transactions/controllers/transaction.controller";
import { TransactionEntity } from "src/transactions/entities/transaction.entity";
import { TransactionService } from "src/transactions/services/transaction.service";

@Module({
    imports: [TypeOrmModule.forFeature([TransactionEntity])],
    controllers: [TransactionController],
    providers: [TransactionService]
})
export class TransactionModule {}