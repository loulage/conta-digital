import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TransactionModel } from "src/models/transaction.model";
import { TransactionService } from "src/services/transaction.service";
import { TransactionValidation } from "src/validations/transaction.validation";
import { Repository } from "typeorm";

@Controller('/transaction')
export class TransactionController {
    constructor(@InjectRepository(TransactionModel) private model: Repository<TransactionModel>, private service: TransactionService) { }

    @Get()
    public async getAll(): Promise<TransactionModel[]> {
        const list = await this.service.getAll();
        return list;
    }

    @Get(':id')
    public async getOne(@Param('id', ParseIntPipe) id: number): Promise<TransactionModel> {
        const account = await this.service.getOne(id);
        return account;
    }

    @Post()
    public async create(@Body() body: TransactionValidation): Promise<TransactionModel> {
        const accountCreated = await this.service.create(body)
        return accountCreated
    } 

    @Put(':id')
    public async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: TransactionValidation,
    ): Promise<TransactionModel> {
        return await this.service.update(id, body);

    }

    @Delete(':id')
    public async delete(@Param('id', ParseIntPipe) id: number): Promise<string> {
        return await this.service.delete(id);
    }
}