import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AccountDto } from "src/accounts/dtos/account.dto";
import { AccountEntity } from "src/accounts/entities/account.entity";
import { Repository } from "typeorm";
import { IAccountDAO } from "../interfaces/IAccountDAO";

@Injectable()
export class AccountRepositoryImpl implements IAccountDAO {
    constructor(@InjectRepository(AccountEntity) private repository: Repository<AccountEntity>) {}

    async create(account: AccountDto): Promise<AccountEntity>  {
        return await this.repository.save(account)
    }

    async getAll(): Promise<AccountEntity[]> {
        const list = await this.repository.find();
        return list;
    }

    async getOneByDocument(document) : Promise<AccountEntity> {
        const account = await this.repository.findOne({ where: { document } });
        return account;
    }

    async getByDocumentOrDie(document) : Promise<AccountEntity> {
        const account = await this.repository.findOne( {where: { document }});
        if (!account) {
            throw new NotFoundException(`There is no account with document number: ${document}`)
        }
        return account;
    }

    async update(id, body): Promise<AccountEntity> {
        const account = await this.repository.findOne({ where: { id } });

        if (!account) {
            throw new NotFoundException(`There is no account with id = ${id}`)
        }
        await this.repository.update({ id }, body)
        // refatorar
        return await this.repository.findOne({ where: { id } });
    }

    // retornar conta atualizada
    async subtractAvaliableLimit(id: number, value: number) {
        const senderAccount = await this.repository.findOne({where: { id }});

        await this.repository.update(id, {
            avaliableLimit:  senderAccount.avaliableLimit - value
        })

    }

    async addAvaliableLimit(id: number, value: number) {
        const receiverAccount = await this.repository.findOne({where: { id }});

        await this.repository.update(id, {
            avaliableLimit:  receiverAccount.avaliableLimit + value
        })
    }



    async delete(id): Promise<string> {
        const account = await this.repository.findOne({ where: { id } });

        if (!account) {
            throw new NotFoundException(`There is no account with id = ${id}`)
        }

        await this.repository.delete(id);
        return `A pessoa com id ${id} foi deletada com sucesso`;
    }
}