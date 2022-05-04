import { ITransferLog } from "src/transfers/interfaces/ITransferLog.interface"
import { TransactionEntity } from "../entities/transaction.entity"

export interface ITransactionService {
    getAll(): Promise<TransactionEntity[]>
    create({ senderDocument, receiverDocument, value }): Promise<ITransferLog>
    update(id: number, { senderDocument, receiverDocument, value }): Promise<TransactionEntity>
    delete(id: number): Promise<string>
}