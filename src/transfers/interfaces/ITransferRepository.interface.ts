import { AccountEntity } from "src/accounts/entities/account.entity";
import { ITransferLog } from "./ITransferLog.interface";

export interface ITransferRepository {
    moneyTransfer(
        senderAccount: AccountEntity,
        receiverAccount: AccountEntity,
        transferValue: number,
        timeStamp: string,
    ) : Promise<ITransferLog>
}