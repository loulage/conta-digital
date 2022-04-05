import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from './modules/account.module';

@Module({
  imports: [AccountModule, TypeOrmModule.forRoot()],

})
export class AppModule {}
