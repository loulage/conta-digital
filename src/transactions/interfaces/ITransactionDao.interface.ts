import { TransactionEntity } from "../entities/transaction.entity";

export interface ITransactionDao {
    getAll(): Promise<TransactionEntity[]>
    create({ senderDocument, receiverDocument, value }): Promise<TransactionEntity>
    update(id: number, { senderDocument, receiverDocument, value }): Promise<TransactionEntity>
    delete(id: number): Promise<string>
}