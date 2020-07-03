import { DeleteResult, InsertResult, UpdateResult } from "typeorm";

export interface GenericService<T> {
	findAll(): Promise<T[]>;
	insert(t: T): Promise<InsertResult>;
	update(id: number, t: T): Promise<UpdateResult>;
	find(id: number): Promise<T | undefined>;
	delete(id: number): Promise<DeleteResult>;
}
