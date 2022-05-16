import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AccountDto } from '../src/accounts/dtos/account.dto';
import { AccountEntity } from 'src/accounts/entities/account.entity';
import { AccountBuilder } from '../src/common/utils/builders/accountBuilder';
import { DIToken } from '../src/common/enums/DItokens';
import { AccountServiceImpl } from '../src/accounts/services/account.service';
import { AccountControllerImpl } from '../src/accounts/controllers/account.controller';
import { InMemoryAccRepo } from './InMemoryAccRepo';


describe('AccountsController (e2e)', () => {
  let app: INestApplication;
  let accountsDao;

  beforeEach(async () => {
    accountsDao = new InMemoryAccRepo();
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [AccountControllerImpl],
      providers: [
        { provide: DIToken.AccountService, useClass: AccountServiceImpl },
        { provide: DIToken.AccountsDao, useValue: accountsDao },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  // CREATE ACCOUNT
  describe('create account', () => {
    it('should create an account without error', async () => {
      const account: AccountEntity = AccountBuilder.buildAccounts(
        'Ursula LeGuin',
        '234.233.566-21',
        1,
      );

      const accountDto: AccountDto = AccountBuilder.buildAccounts(
        'Ursula LeGuin',
        '234.233.566-21',
        1
      );

      return await request(app.getHttpServer())
        .post('/account')
        .send(account)
        .expect(201)
        .expect(accountDto)
    })
  })

  it('should return a Bad_Request when request body is not valid ', async () => {
    return await request(app.getHttpServer())
      .post('/account')
      .send(<AccountEntity>{})
      .expect(400)
      .expect({
        statusCode: 400,
        error: 'Bad Request',
      });
  });

  it('should return a Conflict when account is already registred', async () => {
    const accountsDto: AccountDto = AccountBuilder.buildAccounts(
      'Ursula LeGuin',
      '234.233.566-21',
    )

    await accountsDao.create(<AccountEntity>{ ...accountsDto });

    return await request(app.getHttpServer())
      .post('/account')
      .send(<AccountEntity>accountsDto)
      .expect(409)
      .expect({
        statusCode: 409,
        message: 'Document already registered. Failed to create account',
        error: 'Conflict',
      });
  });

  afterEach(async () => {
    await app.close();
  })
})