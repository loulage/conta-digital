import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { BadRequestException } from '@nestjs/common';
import { AccountBuilder } from '../../common/utils/builders/accountBuilder';
import { AccountDto } from '../dtos/account.dto';
import { AccountEntity } from '../entities/account.entity';
import { IAccountDAO } from '../interfaces/IAccountDAO';
import { IAccountService } from '../interfaces/IAccountService.interface';
import { AccountRepositoryImpl } from '../repositories/account.repository';
import { AccountServiceImpl } from './account.service';

describe('AccountsService', () => {
  let accountsDaoMock: DeepMocked<IAccountDAO>;
  let accountsService: IAccountService;

  const account: AccountEntity = AccountBuilder.buildAccounts(
    'Ursula LeGuin',
    '234.233.566-21',
    1,
  );
  const accountDto: AccountDto = AccountBuilder.buildAccounts(
    'Ursula LeGuin',
    '234.233.566-21',
  );

  beforeEach(() => {
    accountsDaoMock = createMock<IAccountDAO>();
    accountsService = new AccountServiceImpl(accountsDaoMock);
  });

  describe('createAccount', () => {
    it('should return an account succesfully', async () => {
      accountsDaoMock.getOneByDocument.mockResolvedValueOnce(undefined);
      accountsDaoMock.create.mockResolvedValueOnce(account);

      expect(await accountsService.createAccount(<AccountEntity>accountDto)).toEqual(
        account,
      );
      expect(accountsDaoMock.getOneByDocument).toBeCalledTimes(1);
      expect(accountsDaoMock.create).toBeCalledTimes(1);
      expect(accountsDaoMock.getOneByDocument).toBeCalledWith(account.document);
      expect(accountsDaoMock.create).toBeCalledWith(accountDto);
    });

    it('should fail if getOneByDocument throw an exception', async () => {
      accountsDaoMock.getOneByDocument.mockRejectedValueOnce(new Error());

      expect(accountsService.createAccount(<AccountEntity>accountDto)).rejects.toThrowError(
        new Error(),
      );

      expect(accountsDaoMock.getOneByDocument).toBeCalledWith(accountDto.document);
      expect(accountsDaoMock.getOneByDocument).toBeCalledTimes(1);
      expect(accountsDaoMock.create).toBeCalledTimes(0);
    });

    it('should throw a BadRequestException if accounts already exist', async () => {
      accountsDaoMock.getOneByDocument.mockResolvedValueOnce(account);

      expect(accountsService.createAccount(<AccountEntity>accountDto)).rejects.toThrow(
        new BadRequestException(
          'Document already registered. Failed to create account',
        ),
      );

      expect(accountsDaoMock.getOneByDocument).toBeCalledWith(accountDto.document);
      expect(accountsDaoMock.getOneByDocument).toBeCalledTimes(1);
      expect(accountsDaoMock.create).toBeCalledTimes(0);
    });

    it('should fail if save throws an exception', async () => {
      accountsDaoMock.create.mockRejectedValueOnce(new Error());
      accountsDaoMock.getOneByDocument.mockResolvedValueOnce(undefined);

      expect(accountsService.createAccount(<AccountEntity>accountDto)).rejects.toThrowError(
        new Error(),
      );

      expect(accountsDaoMock.getOneByDocument).toBeCalledTimes(1);
      expect(accountsDaoMock.getOneByDocument).toBeCalledWith(accountDto.document);
      expect(accountsDaoMock.create).toBeCalledTimes(0);
    });
  });

  describe('getByDocumentOrDie', () => {
    it('should return an account succesfully', async () => {
      
      accountsDaoMock.getByDocumentOrDie.mockResolvedValueOnce(account);

      expect(
        await accountsService.getByDocumentOrDie('234.233.566-21')
      ).toEqual(account);

      expect(accountsDaoMock.getByDocumentOrDie).toBeCalledWith('234.233.566-21');
      expect(accountsDaoMock.getByDocumentOrDie).toBeCalledTimes(1);
    });

    it('should throw a BadRequestException if account does not exist', async () => {
      accountsDaoMock.getByDocumentOrDie.mockResolvedValueOnce(undefined);

      expect(
        await accountsService.getByDocumentOrDie('234.233.566-21'),
      ).rejects.toThrow(
        new BadRequestException(
          'Document not registered. Please check this information and try again',
        ),
      );

      expect(accountsDaoMock.getByDocumentOrDie).toBeCalledWith('234.233.566-21');
      expect(accountsDaoMock.getByDocumentOrDie).toBeCalledTimes(1);
    });
  });
});