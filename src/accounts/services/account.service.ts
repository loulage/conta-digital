import { ConflictException, Injectable, NotFoundException} from "@nestjs/common";
import { AccountEntity } from "src/accounts/entities/account.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AccountRepository } from "../repositories/account.repository";

@Injectable()
export class AccountService {
    constructor(@InjectRepository(AccountEntity) private repository: AccountRepository) {}

    async getAll(): Promise<AccountEntity[]> {
        const list = await this.repository.getAll();
        return list;
    }

    async getOne(id) : Promise<AccountEntity> {
        const account = await this.repository.getOne(id);

        if (!account) {
            throw new NotFoundException(`There is no account with id = ${id}`)
        }
        return account;
    }

    async findAccountByDocument(document) : Promise<AccountEntity> {
        const account = await this.repository.getOneByDocument(document)
        return account;
    }

    async createAccount(body): Promise<AccountEntity> {
        //verificar se o cpf já foi utilizado (conta já criada)
        const { name, document, avaliableLimit } = body
        const searchIfAccountExists = await this.findAccountByDocument(document);
        if (searchIfAccountExists) {
            throw new ConflictException(`There is already an account associated with document number : ${document}`)
        }
        //verificar os se os dados são válidos / não brancos
        const accountCreated = await this.repository.create(body)
        return accountCreated
    } 

    async update(id, body): Promise<AccountEntity> {
        const account = await this.repository.update(id, body);

        if (!account) {
            throw new NotFoundException(`There is no account with id = ${id}`)
        }
        // refatorar
        return await account;
    }

    async delete(id): Promise<string> {
        const account = await this.repository.delete(id);
        return account;
    }
}