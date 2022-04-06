import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AccountModel } from "src/models/account.model";
import { AccountService } from "src/services/account.service";
import { AccountValidation } from "src/validations/account.validation";
import { Repository } from "typeorm";

@Controller('/account')
export class AccountController {
    constructor(@InjectRepository(AccountModel) private model: Repository<AccountModel>, private service: AccountService) { }

    @Get()
    public async getAll(): Promise<AccountModel[]> {
        const list = await this.service.getAll();
        return list;
    }

    @Get(':id')
    public async getOne(@Param('id', ParseIntPipe) id: number): Promise<AccountModel> {
        const account = await this.service.getOne(id);
        return account;
    }

    @Post()
    public async create(@Body() body: AccountValidation): Promise<AccountModel> {
        const accountCreated = await this.service.create(body)
        return accountCreated
    } 

    @Put(':id')
    public async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: AccountValidation,
    ): Promise<AccountModel> {
        return await this.service.update(id, body);

    }

    @Delete(':id')
    public async delete(@Param('id', ParseIntPipe) id: number): Promise<string> {
        return await this.service.delete(id);
    }
}