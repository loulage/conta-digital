import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AccountEntity {

    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column()
    name: string;

    @Column()
	document : string;

    @Column('int')
	avaliableLimit: number;
}
 