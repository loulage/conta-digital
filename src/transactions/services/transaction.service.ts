import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { send } from "process";
import { IAccountDAO } from "src/accounts/interfaces/IAccountDAO";
import { IAccountService } from "src/accounts/interfaces/IAccountService.interface";
import { DIToken } from "src/common/enums/DItokens";
import { DateHandle } from "src/common/utils/dateHandle";
import { TransactionEntity } from "src/transactions/entities/transaction.entity";
import { ITransferLog } from "src/transfers/interfaces/ITransferLog.interface";
import { ITransferRepository } from "src/transfers/interfaces/ITransferRepository.interface";
import { TransactionDto } from "../dtos/transaction.dto";
import { ITransactionDao } from "../interfaces/ITransactionDao.interface";
import { ITransactionService } from "../interfaces/ITransactionService.interface";
import { TransactionValidation } from "../validations/transaction.validation";

@Injectable()
export class TransactionService implements ITransactionService {
    constructor(
        @Inject(DIToken.TransactionDao) private transactionDao: ITransactionDao,
        @Inject(DIToken.AccountService) private accountService: IAccountService,
        @Inject(DIToken.TransferDao) private transferDao: ITransferRepository,
        @Inject(DIToken.TransactionValidation) private transactionValidation: TransactionValidation
        ){}

    async getOne(id): Promise<TransactionEntity> {
        return await this.transactionDao.getOne(id);
        
    }

    async getAll(): Promise<TransactionEntity[]> {
        return await this.transactionDao.getAll();
    }

 
    async create(transaction: TransactionDto): Promise<ITransferLog> {
        const cleanedTransaction = transaction //Implementar função de limpeza
        const senderAccount = await this.accountService.getByDocumentOrDie(cleanedTransaction.senderDocument)
        const receiverAccount = await this.accountService.getByDocumentOrDie(cleanedTransaction.receiverDocument)
        const timeStamp = DateHandle.timeStamp()

        this.transactionValidation.checkAvaliableLimit(senderAccount.avaliableLimit, cleanedTransaction.value)
        await this.transactionValidation.checkTransferDedup(cleanedTransaction, timeStamp)
        
        
        return await this.transferDao.executeTransfer(senderAccount, receiverAccount, cleanedTransaction.value, timeStamp)
    } 



    async update(id: number, body): Promise<TransactionEntity> {
        const transaction = await this.transactionDao.getOne({ where: { id } });

        if (!transaction) {
            throw new NotFoundException(`There is no transaction with id = ${id}`)
        }
        await this.transactionDao.update(id, body)
        // refatorar
        return await this.transactionDao.getOne({ where: { id } });
    }

    async delete(id): Promise<string> {
        const transaction = await this.transactionDao.getOne({ where: { id } });

        if (!transaction) {
            throw new NotFoundException(`There is no account with id = ${id}`)
        }

        await this.transactionDao.delete(id);
        return `A pessoa com id ${id} foi deletada com sucesso`;
    }
}