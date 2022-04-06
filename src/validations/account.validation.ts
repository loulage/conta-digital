import { IsInt, IsString, Length} from "class-validator";

export class AccountValidation {
    @IsString()
    @Length(3, 120)
    name: string;

    @IsString()
    @Length(14, 14)
    document: string;

    @IsInt()
    avaliableLimit: number;
}