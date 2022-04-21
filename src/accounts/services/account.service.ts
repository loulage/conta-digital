import { ConflictException, Inject, Injectable, NotFoundException} from "@nestjs/common";
import { AccountEntity } from "src/accounts/entities/account.entity";
import { IAccountService } from "../interfaces/IAccountService.interface";
import { DIToken } from "src/common/enums/DItokens";
import { IAccountDAO } from "../interfaces/IAccountDAO";

@Injectable()
export class AccountServiceImpl implements IAccountService {
    //Mudar o nome de repository para DAO data access object

    constructor(@Inject(DIToken.AccountsDao) private repository: IAccountDAO) {}

    async getAll(): Promise<AccountEntity[]> {
        const list = await this.repository.getAll();
        return list;
    }

    async findAccountByDocument(document) : Promise<AccountEntity> {
        const account = await this.repository.getOneByDocument(document)
        return account;
    }

    //tipar o body
    async createAccount(body): Promise<AccountEntity> {
        //verificar se o cpf já foi utilizado (conta já criada)
        const { name, document, avaliableLimit } = body

        //Mudar o nome da variavel 'dedup' (evitar duplicaocao)
        const searchIfAccountExists = await this.findAccountByDocument(document);
        if (searchIfAccountExists) {
            throw new ConflictException(`There is already an account associated with document number : ${document}`)
        }
        //verificar os se os dados são válidos / não brancos
        const accountCreated = await this.repository.create(body)
        // return direto
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
        await this.repository.delete(id);
        return `account with id ${id} is deleted`;
    }
}