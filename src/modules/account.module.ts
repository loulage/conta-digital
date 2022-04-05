import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AccountController } from "src/controllers/account.controller";
import { AccountModel } from "src/models/account.model";

@Module({
    imports: [TypeOrmModule.forFeature([AccountModel])],
    controllers: [AccountController]
})
export class AccountModule {}
