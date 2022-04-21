import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TransactionEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    senderDocument: string;

    @Column()
	receiverDocument : string;

    @Column('int')
	value: number;

    @CreateDateColumn()
    dateTime: string;
}