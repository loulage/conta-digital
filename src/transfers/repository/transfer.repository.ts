import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AccountEntity } from "src/accounts/entities/account.entity";
import { AccountRepositoryImpl } from "src/accounts/repositories/account.repository";
import { DIToken } from "src/common/enums/DItokens";
import { TransactionEntity } from "src/transactions/entities/transaction.entity";
import { Repository } from "typeorm";
import { ITransferLog } from "../interfaces/ITransferLog.interface";
import { ITransferRepository } from "../interfaces/ITransferRepository.interface";

@Injectable()
export class TransferRepositoryImpl implements ITransferRepository {
    constructor(
    @InjectRepository(TransactionEntity) private transactionRepository: Repository<TransactionEntity>,
    @Inject(DIToken.AccountsDao) private accountRepository: AccountRepositoryImpl
    ) {}

    async executeTransfer(
        senderAccount: AccountEntity, 
        receiverAccount: AccountEntity,
        transferValue: number,
        timeStamp: string
        ): Promise<ITransferLog> {

        // 1. Salvar o registro da transação na tabela transaction.
        await this.transactionRepository.save(<TransactionEntity> {
            senderDocument: senderAccount.document,
            receiverDocument: receiverAccount.document,
            value: transferValue,
            dateTime: timeStamp,
        })

        // 2. Atualizar o 'avaliableLimit' da conta que envia o dinheiro (-$)
        await this.accountRepository.subtractAvaliableLimit(senderAccount.id, transferValue)

        // 3. Atualizar o 'avaliableLimit' da conta que recebe o dinheiro (+$)
        await this.accountRepository.addAvaliableLimit(receiverAccount.id, transferValue)

        // consultando o mesmo cara várias vezes
        const updatedSenderAccount = await this.accountRepository.getByDocumentOrDie(senderAccount.document)

        // 4. Retornar o registro da transação da tabela transaction.
        return {
            senderAvailableLimit: updatedSenderAccount.avaliableLimit,
            receiverDocument: receiverAccount.document,
            senderDocument: senderAccount.document,
            dateTime: timeStamp
        }

    }

    async getTransactionsHistory(document: string): Promise<TransactionEntity[]> {
        return await this.transactionRepository.find({
          where: [{ receiverDocument: document }, { senderDocument: document }],
        });
      }
}