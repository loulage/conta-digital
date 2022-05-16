import { TransactionEntity } from "src/transactions/entities/transaction.entity";

export class TransfersEntityBuilder {
  static buildTransfers(id?: number, dateTime?: string): TransactionEntity {
    return <TransactionEntity>{
      senderDocument: '865.615.970-44',
      receiverDocument: '111.111.111-11',
      value: 10,
      id: id,
      dateTime: dateTime,
    };
  }
}