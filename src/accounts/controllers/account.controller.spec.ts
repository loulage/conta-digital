import { AccountControllerImpl } from "./account.controller";
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { AccountServiceImpl } from "../services/account.service";
import { AccountEntity } from "../entities/account.entity";
import { AccountBuilder } from "../../common/utils/builders/accountBuilder";
import { AccountDto } from "../dtos/account.dto";

describe('AccountsController unit test', () => {
    let accountsController: AccountControllerImpl;
    let accountsServiceMock: DeepMocked<AccountServiceImpl>;
  
    const account: AccountEntity = AccountBuilder.buildAccounts(
      'Ursula LeGuin',
      '234.233.566-21',
      1,
    );
  
    const accountsDto: AccountDto = AccountBuilder.buildAccounts(
      'Ursula LeGuin',
      '234.233.566-21',
    );
  
    beforeEach(() => {
      accountsServiceMock = createMock<AccountServiceImpl>();
      accountsController = new AccountControllerImpl(accountsServiceMock);
    });
  
    describe('create', () => {
      it('should create an account succesfully', async () => {
        accountsServiceMock.createAccount.mockResolvedValueOnce(account);
  
        expect(await accountsController.create(accountsDto)).toEqual(account);
  
        expect(accountsServiceMock.createAccount).toBeCalledWith(accountsDto);
        expect(accountsServiceMock.createAccount).toBeCalledTimes(1);
      });
  
      it('should fail if AccountServiceImpl createAccount() throw an exception ', async () => {
        accountsServiceMock.createAccount.mockRejectedValueOnce(new Error());
  
        expect(accountsController.create(accountsDto)).rejects.toThrowError();
  
        expect(accountsServiceMock.createAccount).toBeCalledWith(accountsDto);
        expect(accountsServiceMock.createAccount).toBeCalledTimes(1);
      });
  
      it('should return undefined if undefined is passed to accountsService create() ', async () => {
        accountsServiceMock.createAccount.mockResolvedValueOnce(undefined);
        const accountsDto = {
          name: 'Ana Pavlova',
          document: '111.111.111-11',
          avaliableLimit: 500,
        };
  
        expect(await accountsController.create(accountsDto)).toBeUndefined();
      });
    });
  });