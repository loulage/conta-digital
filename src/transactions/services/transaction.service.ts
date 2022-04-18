import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TransactionEntity } from "src/transactions/entities/transaction.entity";
import { Repository } from "typeorm";

@Injectable()
export class TransactionService {
    constructor(@InjectRepository(TransactionEntity) private model: Repository<TransactionEntity>) {}

    async getAll(): Promise<TransactionEntity[]> {
        const list = await this.model.find();
        return list;
    }

    async getOne(id) : Promise<TransactionEntity> {
        const transaction = await this.model.findOne({ where: { id } });

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
        const transactionCreated = await this.model.save(body)
        return transactionCreated
    } 



    async update(id, body): Promise<TransactionEntity> {
        const transaction = await this.model.findOne({ where: { id } });

        if (!transaction) {
            throw new NotFoundException(`There is no transaction with id = ${id}`)
        }
        await this.model.update({ id }, body)
        // refatorar
        return await this.model.findOne({ where: { id } });
    }

    async delete(id): Promise<string> {
        const transaction = await this.model.findOne({ where: { id } });

        if (!transaction) {
            throw new NotFoundException(`There is no account with id = ${id}`)
        }

        await this.model.delete(id);
        return `A pessoa com id ${id} foi deletada com sucesso`;
    }
}