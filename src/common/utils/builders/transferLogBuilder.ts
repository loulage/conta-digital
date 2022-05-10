import { ITransferLog } from 'src/transfers/interfaces/ITransferLog.interface';
import { DateHandle } from '../dateHandle';

export class TransferLogBuilder {
  static buildTransfersLog(): ITransferLog {
    return <ITransferLog>{
      senderAvailableLimit: 990,
      receiverDocument: '222.222.444-45',
      senderDocument: '110.363.056-35',
      dateTime: DateHandle.timeStamp(),
    };
  }
}