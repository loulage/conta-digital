import { Controller, Get, Param } from "@nestjs/common";
import { HistoryService } from "../services/history.service";

@Controller('transfer-history')
export class TransferHistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Get(':document')
  getHistory(@Param('document') document: string) {
    return this.historyService.getHistory(document);
  }
}