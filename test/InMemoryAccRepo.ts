import { AccountEntity } from "../src/accounts/entities/account.entity";


export class InMemoryAccRepo {
  private accounts: AccountEntity[] = [];
  private idCounter = 0;

  async getOneByDocument(document: string): Promise<AccountEntity> {
    return await this.accounts.find(
      (registeredAccount) => registeredAccount.document === document,
    );
  }

  async create(account: AccountEntity): Promise<AccountEntity> {
    this.idCounter++;
    const newAccount: AccountEntity = {
      id: this.idCounter,
      ...account,
    };
    await this.accounts.push(newAccount);
    return newAccount;
  }

  async update(id: number, updatedValue: number): Promise<void> {
    this.accounts.forEach((registeredAcc, index) => {
      if (registeredAcc.id === id) {
        return (this.accounts[index] = {
          ...registeredAcc,
          avaliableLimit: updatedValue,
        });
      }
      return registeredAcc;
    });
  }

 async getAll(): Promise<AccountEntity[]> {
   return
 }
  async getByDocumentOrDie(document): Promise<AccountEntity>{
    return
  } 
  async subtractAvaliableLimit(id: number, value: number) : Promise<void> {
    return
  }
  async addAvaliableLimit(id: number, value: number) : Promise<void> {
    return
  }
  async delete(id: number) : Promise<string> {
    return
  }
}
