import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TransactionController } from "src/controllers/transaction.controller";
import { TransactionModel } from "src/models/transaction.model";
import { TransactionService } from "src/services/transaction.service";

@Module({
    imports: [TypeOrmModule.forFeature([TransactionModel])],
    controllers: [TransactionController],
    providers: [TransactionService]
})
export class TransactionModule {}