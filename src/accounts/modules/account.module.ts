import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AccountControllerImpl } from "src/accounts/controllers/account.controller";
import { AccountEntity } from "src/accounts/entities/account.entity";
import { AccountServiceImpl } from "src/accounts/services/account.service";
import { DIToken } from "src/common/enums/DItokens";
import { AccountRepositoryImpl } from "../repositories/account.repository";


    //1. criar DItoken no modulo e associar a classe a instancia da implementacao
    //2. quem for utilizar a dependencia, injetar DITOKEN e utilizar a interface.
    //3. função: garantir a separação de camada

@Module({
    imports: [TypeOrmModule.forFeature([AccountEntity])],
    controllers: [AccountControllerImpl],
    providers: [{ provide: DIToken.AccountsDao, useClass: AccountRepositoryImpl}, {provide: DIToken.AccountService, useClass: AccountServiceImpl}]
})
export class AccountModule {}
