import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DIToken } from "src/common/enums/DItokens";
import { TransactionController } from "src/transactions/controllers/transaction.controller";
import { TransactionEntity } from "src/transactions/entities/transaction.entity";
import { TransactionService } from "src/transactions/services/transaction.service";
import { TransactionDaoImpl } from "../repository/transaction.repository";

@Module({
    imports: [TypeOrmModule.forFeature([TransactionEntity])],
    controllers: [TransactionController],
    providers: [
        {provide: DIToken.TransactionService, useClass: TransactionService}, 
        {provide: DIToken.TransactionDao, useClass: TransactionDaoImpl}
    ]
})
export class TransactionModule {}