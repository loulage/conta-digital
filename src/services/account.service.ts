import { Body, Injectable, NotFoundException} from "@nestjs/common";
import { AccountModel } from "src/models/account.model";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class AccountService {
    constructor(@InjectRepository(AccountModel) private model: Repository<AccountModel>) {}

    async getAll(): Promise<AccountModel[]> {
        const list = await this.model.find();
        return list;
    }

    async getOne(id) : Promise<AccountModel> {
        const account = await this.model.findOne({ where: { id } });

        if (!account) {
            throw new NotFoundException(`There is no account with id = ${id}`)
        }
        return account;
    }

    async create(body): Promise<AccountModel> {
        const accountCreated = await this.model.save(body)
        return accountCreated
    } 

    async update(id, body): Promise<AccountModel> {
        const account = await this.model.findOne({ where: { id } });

        if (!account) {
            throw new NotFoundException(`There is no account with id = ${id}`)
        }
        await this.model.update({ id }, body)
        // refatorar
        return await this.model.findOne({ where: { id } });
    }

    async delete(id): Promise<string> {
        const account = await this.model.findOne({ where: { id } });

        if (!account) {
            throw new NotFoundException(`There is no account with id = ${id}`)
        }

        await this.model.delete(id);
        return `A pessoa com id ${id} foi deletada com sucesso`;
    }
}