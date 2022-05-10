import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AccountEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
	document : string;

    @Column('int')
	avaliableLimit: number;
}
 