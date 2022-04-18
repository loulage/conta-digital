import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TransactionEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    senderDocument: string;

    @Column()
	receiverDocument : string;

    @Column('int')
	value: number;

    @CreateDateColumn()
    datetime: Date;
}