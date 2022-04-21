import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { DIToken } from "src/common/enums/DItokens";
import { TransactionEntity } from "src/transactions/entities/transaction.entity";
import { TransactionValidation } from "src/transactions/validations/transaction.validation";
import { ITransactionService } from "../interfaces/ITransactionService.interface";

@Controller('/transaction')
export class TransactionController {
    constructor(@Inject(DIToken.TransactionService) private service: ITransactionService ) { }

    @Get()
    public async getAll(): Promise<TransactionEntity[]> {
        const list = await this.service.getAll();
        return list;
    }


    @Post()
    public async create(@Body() body: TransactionValidation): Promise<TransactionEntity> {
        const accountCreated = await this.service.create(body)
        return accountCreated
    } 

    @Put(':id')
    public async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: TransactionValidation,
    ): Promise<TransactionEntity> {
        return await this.service.update(id, body);

    }

    @Delete(':id')
    public async delete(@Param('id', ParseIntPipe) id: number): Promise<string> {
        return await this.service.delete(id);
    }
}