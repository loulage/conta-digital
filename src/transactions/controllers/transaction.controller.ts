import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TransactionEntity } from "src/transactions/entities/transaction.entity";
import { TransactionService } from "src/transactions/services/transaction.service";
import { TransactionValidation } from "src/transactions/validations/transaction.validation";
import { Repository } from "typeorm";

@Controller('/transaction')
export class TransactionController {
    constructor(@InjectRepository(TransactionEntity) private model: Repository<TransactionEntity>, private service: TransactionService) { }

    @Get()
    public async getAll(): Promise<TransactionEntity[]> {
        const list = await this.service.getAll();
        return list;
    }

    @Get(':id')
    public async getOne(@Param('id', ParseIntPipe) id: number): Promise<TransactionEntity> {
        const account = await this.service.getOne(id);
        return account;
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