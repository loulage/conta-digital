import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";

export class AccountDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    document: string;

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    avaliableLimit: number;
}