import { AccountEntity } from "src/accounts/entities/account.entity";
import { TransactionEntity } from "src/transactions/entities/transaction.entity";
import { ITransferLog } from "./ITransferLog.interface";

export interface ITransferRepository {
    executeTransfer(
        senderAccount: AccountEntity,
        receiverAccount: AccountEntity,
        transferValue: number,
        timeStamp: string,
    ) : Promise<ITransferLog>

    getTransactionsHistory(document: string): Promise<TransactionEntity[]>
}