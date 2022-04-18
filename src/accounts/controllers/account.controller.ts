import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AccountEntity } from "src/accounts/entities/account.entity";
import { AccountService } from "src/accounts/services/account.service";
import { AccountValidation } from "src/accounts/validations/account.validation";
import { Repository } from "typeorm";

@Controller('/account')
export class AccountController {
    constructor(@InjectRepository(AccountEntity) private model: Repository<AccountEntity>, private service: AccountService) { }

    @Get()
    public async getAll(): Promise<AccountEntity[]> {
        const list = await this.service.getAll();
        return list;
    }

    @Get(':id')
    public async getOne(@Param('id', ParseIntPipe) id: number): Promise<AccountEntity> {
        const account = await this.service.getOne(id);
        return account;
    }

    @Post()
    public async create(@Body() body: AccountValidation): Promise<AccountEntity> {
        const accountCreated = await this.service.createAccount(body)
        return accountCreated
    } 

    @Put(':id')
    public async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: AccountValidation,
    ): Promise<AccountEntity> {
        return await this.service.update(id, body);

    }

    @Delete(':id')
    public async delete(@Param('id', ParseIntPipe) id: number): Promise<string> {
        return await this.service.delete(id);
    }
}