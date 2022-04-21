import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AccountEntity } from "src/accounts/entities/account.entity";
import { AccountRepositoryImpl } from "src/accounts/repositories/account.repository";
import { TransactionEntity } from "src/transactions/entities/transaction.entity";
import { Repository } from "typeorm";
import { ITransferLog } from "../interfaces/ITransferLog.interface";
import { ITransferRepository } from "../interfaces/ITransferRepository.interface";

@Injectable()
export class transferRepositoryImpl implements ITransferRepository {
    constructor(
    @InjectRepository(TransactionEntity) private transactionRepository: Repository<TransactionEntity>,
    private accountRepository: AccountRepositoryImpl

    ) {}

    async moneyTransfer(
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

        // 4. Retornar o registro da transação da tabela transaction.
        return {
            availableLimit: senderAccount.avaliableLimit,
            receiverDocument: receiverAccount.document,
            senderDocument: senderAccount.document,
            dateTime: timeStamp
        }

    }
}