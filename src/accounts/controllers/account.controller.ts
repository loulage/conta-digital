import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, NotFoundException, Inject } from "@nestjs/common";
import { AccountEntity } from "src/accounts/entities/account.entity";
import { DIToken } from "../../common/enums/DItokens";
import { AccountDto } from "../dtos/account.dto";
import { IAccountService } from "../interfaces/IAccountService.interface";

@Controller('/account')
export class AccountControllerImpl {
    // Injetar via @Inject(DIToken.AccountService)
    constructor(@Inject(DIToken.AccountService) private service: IAccountService) { }

    @Get()
    public async getAll(): Promise<AccountEntity[]> {
        const list = await this.service.getAll();
        return list;
    }

    @Get(':document')
    public async findAccountByDocument(@Param('document', ParseIntPipe) document: string): Promise<AccountEntity> {
        const account = await this.service.findAccountByDocument(document);
        return account;
    }

    @Post()

    public async create(@Body() body: AccountDto): Promise<AccountEntity> {
        return await this.service.createAccount(body)
    } 

    @Put(':id')
    public async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: AccountDto,
    ): Promise<AccountEntity> {
        return await this.service.update(id, body);
    }

    @Delete(':id')
    public async delete(@Param('id', ParseIntPipe) id: number): Promise<string> {
        return await this.service.delete(id);
    }
}