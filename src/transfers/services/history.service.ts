import { Inject, Injectable } from "@nestjs/common";
import { IAccountService } from "src/accounts/interfaces/IAccountService.interface";
import { DIToken } from "src/common/enums/DItokens";
import { IHistorySerivce } from "../interfaces/IHistoryService.interface";
import { ITransferRepository } from "../interfaces/ITransferRepository.interface";

@Injectable()
export class HistoryService implements IHistorySerivce {
  constructor(
    @Inject(DIToken.AccountService)
    private readonly accountsService: IAccountService,
    @Inject(DIToken.TransferDao)
    private readonly transfersDao: ITransferRepository,
  ) {}
  async getHistory(document: string) {
    await this.accountsService.getByDocumentOrDie(document);
    return await this.transfersDao.getTransactionsHistory(document);
  }
}