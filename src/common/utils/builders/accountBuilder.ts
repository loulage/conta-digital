import { AccountEntity } from 'src/accounts/entities/account.entity';

export class AccountsBuilder {
  static buildAccounts(name: string, document: string, id?: number): AccountEntity {
    return <AccountEntity>{
      id: id,
      name: name,
      document: document,
      avaliableLimit: 2000,
    };
  }
}