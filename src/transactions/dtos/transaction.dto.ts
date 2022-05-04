import { IsNumber, IsString, Length } from "class-validator";

export class TransactionDto {

    @IsString()
    @Length(14)
    senderDocument: string;

    @IsString()
    @Length(14, 14)
    receiverDocument : string;

    @IsNumber()
    value: number;
}