import { IsNotEmpty, IsNumber } from "class-validator";

export class AccountDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    document: string;

    @IsNumber()
    avaliableLimit: number;
}