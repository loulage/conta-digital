import { AccountDto } from "../dtos/account.dto";
import { AccountEntity } from "../entities/account.entity";


export interface IAccountDAO {
    getAll(): Promise<AccountEntity[]>;
    getByDocumentOrDie(document: string): Promise<AccountEntity>
    create(account: AccountDto): Promise<AccountEntity>;
    update(id: number, account: AccountDto): Promise<AccountEntity>;
    subtractAvaliableLimit(id: number, value: number) : Promise<void>;
    addAvaliableLimit(id: number, value: number) : Promise<void>;
    delete(id: number) : Promise<string>
}