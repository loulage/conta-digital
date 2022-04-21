import { AccountEntity } from "../entities/account.entity";

export interface IAccountService {
    getAll(): Promise<AccountEntity[]>;
    findAccountByDocument(document: string): Promise<AccountEntity>;
    createAccount({ name, document, avaliableLimit }) : Promise<AccountEntity>;
    update(id: number, { name, document, avaliableLimit }) : Promise<AccountEntity>;
    delete(id: number) : Promise<string>;
}