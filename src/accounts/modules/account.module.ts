import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AccountController } from "src/accounts/controllers/account.controller";
import { AccountEntity } from "src/accounts/entities/account.entity";
import { AccountService } from "src/accounts/services/account.service";

@Module({
    imports: [TypeOrmModule.forFeature([AccountEntity])],
    controllers: [AccountController],
    providers: [AccountService]
})
export class AccountModule {}
