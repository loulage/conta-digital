import { Controller, Get, Post, Put, Delete } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AccountModel } from "src/models/account.model";
import { Repository } from "typeorm";

@Controller('/account')
export class AccountController {
    constructor(@InjectRepository(AccountModel) private  model: Repository<AccountModel> ) {}
    
    @Get()
    public async getAll(): Promise<{ data: AccountModel[] }> {
        const list = await this.model.find();
        return {data : list};
    }

    @Get(':id')
    public getOne(): any {
        return {data : 'getone'};
    }

    @Post()
    public create(): any {
        return {data : 'create'};
    }

    @Put(':id')
    public update(): any {
        return {data : 'update'};
    }

    @Delete(':id')
    public delete(): any {
        return {data : 'delete'};
    }
}