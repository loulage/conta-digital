import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AccountModule } from "src/accounts/modules/account.module";
import { AccountServiceImpl } from "src/accounts/services/account.service";
import { DIToken } from "src/common/enums/DItokens";
import { TransactionController } from "src/transactions/controllers/transaction.controller";
import { TransactionEntity } from "src/transactions/entities/transaction.entity";
import { TransactionService } from "src/transactions/services/transaction.service";
import { TransferRepositoryImpl } from "src/transfers/repository/transfer.repository";
import { TransactionDaoImpl } from "../repository/transaction.repository";
import { TransactionValidation } from "../validations/transaction.validation";

@Module({
    imports: [TypeOrmModule.forFeature([TransactionEntity]), AccountModule],
    controllers: [TransactionController],
    providers: [
        {provide: DIToken.TransactionService, useClass: TransactionService}, 
        {provide: DIToken.TransactionDao, useClass: TransactionDaoImpl},
        {provide: DIToken.TransactionValidation, useClass: TransactionValidation},
        {provide: DIToken.TransferDao, useClass: TransferRepositoryImpl},
        { provide: DIToken.AccountService, useClass: AccountServiceImpl }

    ]
    
})
export class TransactionModule {}