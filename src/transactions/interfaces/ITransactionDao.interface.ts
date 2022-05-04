import { TransactionEntity } from "../entities/transaction.entity";

export interface ITransactionDao {
    getOne(id): Promise<TransactionEntity>
    getAll(): Promise<TransactionEntity[]>
    getMatchingTransfers(senderDoc: string, receiverDoc: string, transferValue: number): Promise<TransactionEntity[]>
    create({ senderDocument, receiverDocument, value }): Promise<TransactionEntity>
    update(id: number, { senderDocument, receiverDocument, value }): Promise<TransactionEntity>
    delete(id: number): Promise<string>
}