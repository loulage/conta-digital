import { TransactionEntity } from "src/transactions/entities/transaction.entity";

export interface IHistorySerivce {
    getHistory(document: string): Promise<TransactionEntity[]>
}