import { BadRequestException, ConflictException, Inject, Injectable } from "@nestjs/common";
import { time } from "console";
import { IAccountDAO } from "src/accounts/interfaces/IAccountDAO";
import { IAccountService } from "src/accounts/interfaces/IAccountService.interface";
import { DIToken } from "src/common/enums/DItokens";
import { DateHandle } from "src/common/utils/dateHandle";
import { TransactionDto } from "../dtos/transaction.dto";
import { ITransactionDao } from "../interfaces/ITransactionDao.interface";

@Injectable()
export class TransactionValidation {
    constructor(
        @Inject(DIToken.TransactionDao) private transactionDao: ITransactionDao
    ){}
    async checkAvaliableLimit(availableLimit: number, transactionValue: number) {
        if(transactionValue > availableLimit) {
            throw new ConflictException(`Insufficient Credit - NOT enough credit to complete this transaction. Your avaliable Limit : ${availableLimit}`)
        }
        return true;
    }

    async checkTransferDedup(transaction: TransactionDto, timeStamp: string) {
        const { senderDocument, receiverDocument, value } = transaction
        const matchedTransaction = await this.transactionDao.getMatchingTransfers(senderDocument, receiverDocument, value)
        const transferTimeOut = 120000 //milliseconds

        const duplicatedTransaction = matchedTransaction.filter((transfer) => DateHandle.dateDifference(timeStamp, transfer.dateTime) <= transferTimeOut)
        if (duplicatedTransaction.length > 0) {
            const lastTransferTime = duplicatedTransaction[0].dateTime;
            const deltaTime = DateHandle.dateDifference(timeStamp, lastTransferTime);
            const awaitTime = (transferTimeOut - deltaTime) / 1000;
            throw new BadRequestException(
              `Duplicated Transfer. Wait ${awaitTime} seconds and try again.`,
            );
          }
        }
    }
// Validaçoes: Subtração de valor nao pode dar negativo, verificar tempo 2min de ultima transicao