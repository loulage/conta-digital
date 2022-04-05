import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AccountModel {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ length: 12 })
	document : string;

    @Column('int')
	avaliableLimit: number;
}
 