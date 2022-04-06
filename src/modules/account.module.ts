import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AccountController } from "src/controllers/account.controller";
import { AccountModel } from "src/models/account.model";
import { AccountService } from "src/services/account.service";

@Module({
    imports: [TypeOrmModule.forFeature([AccountModel])],
    controllers: [AccountController],
    providers: [AccountService]
})
export class AccountModule {}
