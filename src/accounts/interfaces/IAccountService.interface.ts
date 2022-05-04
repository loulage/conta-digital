import { AccountDto } from "../dtos/account.dto";
import { AccountEntity } from "../entities/account.entity";

export interface IAccountService {
    getAll(): Promise<AccountEntity[]>;
    getByDocumentOrDie(senderDocument: string) : Promise<AccountEntity>
    findAccountByDocument(document: string): Promise<AccountEntity>;
    createAccount(accountDto: AccountDto) : Promise<AccountEntity>;
    update(id: number, { name, document, avaliableLimit }) : Promise<AccountEntity>;
    delete(id: number) : Promise<string>;
}