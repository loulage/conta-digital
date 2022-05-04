import { BadRequestException, ConflictException, Inject, Injectable, NotFoundException} from "@nestjs/common";
import { AccountEntity } from "src/accounts/entities/account.entity";
import { IAccountService } from "../interfaces/IAccountService.interface";
import { DIToken } from "src/common/enums/DItokens";
import { IAccountDAO } from "../interfaces/IAccountDAO";
import { AccountDto } from "../dtos/account.dto";

@Injectable()
export class AccountServiceImpl implements IAccountService {
    //Mudar o nome de repository para DAO data access object

    constructor(@Inject(DIToken.AccountsDao) private repository: IAccountDAO) {}

    async getAll(): Promise<AccountEntity[]> {
        const list = await this.repository.getAll();
        return list;
    }

    async findAccountByDocument(document: string) : Promise<AccountEntity> {
        const account = await this.repository.getByDocumentOrDie(document)
        return account;
    }

    async getByDocumentOrDie(document: string): Promise<AccountEntity> {
        const account = await this.repository.getByDocumentOrDie(document);
        if (!account) {
          throw new BadRequestException(
            'Document not registred. Please check this information and try again',
          );
        }
    
        return account;
      }
    async createAccount(accountDto: AccountDto): Promise<AccountEntity> {
        const { document } = accountDto

        //utlizar o metodo dto
        const accountDedup = await this.findAccountByDocument(document);
        if (accountDedup) {
            throw new ConflictException(`There is already an account associated with document number : ${document}`)
        }
        return await this.repository.create(accountDto)
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