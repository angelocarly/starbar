import { DeleteResult, InsertResult, UpdateResult } from "typeorm";

export interface GenericRepository<T> {
	findAll(): Promise<T[]>;
	insert(t: T): Promise<InsertResult>;
	find(id: number): Promise<T >;
	update(id: number, t: T): Promise<UpdateResult>;
	delete(id: number): Promise<DeleteResult>;
}

