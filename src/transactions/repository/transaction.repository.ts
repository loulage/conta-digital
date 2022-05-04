import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TransactionEntity } from "src/transactions/entities/transaction.entity";
import { getManager, Repository } from "typeorm";
import { ITransactionDao } from "../interfaces/ITransactionDao.interface";

@Injectable()
export class TransactionDaoImpl implements ITransactionDao {
    constructor(@InjectRepository(TransactionEntity) private repository: Repository<TransactionEntity>) {}

    async getAll(): Promise<TransactionEntity[]> {
        const list = await this.repository.find();
        return list;
    }

    async getOne(id) : Promise<TransactionEntity> {
        const transaction = await this.repository.findOne({ where: { id } });

        if (!transaction) {
            throw new NotFoundException(`There is no transaction with id = ${id}`)
        }
        return transaction;
    }
    // CREATE
    // Service
    // c1 = accountRepository.getAccount(cpf)
    // c2 = accountRepository.getAccount(cpf)
    // Operação:
    // c1.amount = c1.amount - 100
    // c2.amount = c2.amount + 100
    // accounts = [c1, c2]

    // Repository (DAO)
    // await getManager().transaction(async transactionEntityManager => { await transactionalEntityManager.save(accounts)})

    // Refactor: utilizar transaction
    async create(body): Promise<TransactionEntity> {
        const { senderDocument, receiverDocument, value } = body;
/*         await this.repository.manager.transaction(async (transactionalEntityManger) => {

            const sender = await this.service.findAccountByDocument(senderDocument)
            const reciever = await this.service.findAccountByDocument(receiverDocument)
            await transactionalEntityManger.save(body)
        }) */
        const batch = { senderDocument, receiverDocument, value }
        const transactionCreated = await this.repository.save(batch)
        return transactionCreated
    } 

    async getMatchingTransfers(
        senderDoc: string,
        receiverDoc: string,
        transferValue: number,
      ) {
        const getMatchingTransfers = await this.repository.find({
          where: {
            senderDocument: senderDoc,
            receiverDocument: receiverDoc,
            value: transferValue,
          },
        });
    
        return getMatchingTransfers;
      }

    async update(id, body): Promise<TransactionEntity> {
        const transaction = await this.repository.findOne({ where: { id } });

        if (!transaction) {
            throw new NotFoundException(`There is no transaction with id = ${id}`)
        }
        await this.repository.update({ id }, body)
        // refatorar
        return await this.repository.findOne({ where: { id } });
    }

    async delete(id): Promise<string> {
        const transaction = await this.repository.findOne({ where: { id } });

        if (!transaction) {
            throw new NotFoundException(`There is no account with id = ${id}`)
        }

        await this.repository.delete(id);
        return `A pessoa com id ${id} foi deletada com sucesso`;
    }
}