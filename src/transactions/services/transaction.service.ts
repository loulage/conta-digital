import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DIToken } from "src/common/enums/DItokens";
import { TransactionEntity } from "src/transactions/entities/transaction.entity";
import { ITransactionDao } from "../interfaces/ITransactionDao.interface";
import { ITransactionService } from "../interfaces/ITransactionService.interface";

@Injectable()
export class TransactionService implements ITransactionService {
    constructor(@Inject(DIToken.TransactionDao) private dao: ITransactionDao) {}

    async getAll(): Promise<TransactionEntity[]> {
        const list = await this.dao.getAll();
        return list;
    }

    // CREATE
    // Service
    // c1 = accountdao.getAccount(cpf)
    // c2 = accountdao.getAccount(cpf)
    // Operação:
    // c1.amount = c1.amount - 100
    // c2.amount = c2.amount + 100
    // accounts = [c1, c2]

    // dao (DAO)
    // await getManager().transaction(async transactionEntityManager => { await transactionalEntityManager.save(accounts)})

    // Refactor: utilizar transaction
    async create(body): Promise<TransactionEntity> {
        //1.Conta não inicializada: não existe uma conta associada ao documento presente na operação;
        //2. Limite insuficiente: o limite disponível para o emissor é menor que o valor da transação;
        //3. Transação duplicada: uma transação de igual valor, igual emissor e igual receptor ocorreu nos 2 minutos anteriores à transação atual.
        const transactionCreated = await this.dao.create(body)
        return transactionCreated
    } 



    async update(id, body): Promise<TransactionEntity> {
        const transaction = await this.dao.getOne({ where: { id } });

        if (!transaction) {
            throw new NotFoundException(`There is no transaction with id = ${id}`)
        }
        await this.dao.update({ id }, body)
        // refatorar
        return await this.dao.getOne({ where: { id } });
    }

    async delete(id): Promise<string> {
        const transaction = await this.dao.getOne({ where: { id } });

        if (!transaction) {
            throw new NotFoundException(`There is no account with id = ${id}`)
        }

        await this.dao.delete(id);
        return `A pessoa com id ${id} foi deletada com sucesso`;
    }
}