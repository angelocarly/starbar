import { DeleteResult } from "typeorm";

export interface Repository<T> {
	findAll(): Promise<T[]>;
	insert(t: T): Promise<T>;
	update(t: T): Promise<T>;
	find(id: number): Promise<T>;
	delete(id: number): Promise<DeleteResult>;
}

