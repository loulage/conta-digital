import { IsDate, IsInt, IsString, Length } from "class-validator";

export class TransactionValidation {

    @IsString()
    @Length(14)
    senderDocument: string;

    @IsString()
    @Length(14, 14)
    receiverDocument : string;

    @IsInt()
    value: number;
}