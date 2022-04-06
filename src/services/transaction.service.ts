import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TransactionModel } from "src/models/transaction.model";
import { Repository } from "typeorm";

@Injectable()
export class TransactionService {
    constructor(@InjectRepository(TransactionModel) private model: Repository<TransactionModel>) {}

    async getAll(): Promise<TransactionModel[]> {
        const list = await this.model.find();
        return list;
    }

    async getOne(id) : Promise<TransactionModel> {
        const transaction = await this.model.findOne({ where: { id } });

        if (!transaction) {
            throw new NotFoundException(`There is no transaction with id = ${id}`)
        }
        return transaction;
    }

    async create(body): Promise<TransactionModel> {
        const transactionCreated = await this.model.save(body)
        return transactionCreated
    } 

    async update(id, body): Promise<TransactionModel> {
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