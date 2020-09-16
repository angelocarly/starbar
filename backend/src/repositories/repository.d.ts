import { DeleteResult } from "typeorm";

export interface GenericRepository<T> {
	findAll(): Promise<T[]>;
	insert(t: T): Promise<number>;
	find(id: number): Promise<T>;
	update(id: number, t: T): Promise<T>;
	delete(id: number): Promise<DeleteResult>;
}

