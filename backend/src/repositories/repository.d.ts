import { DeleteResult, InsertResult, UpdateResult } from "typeorm";
import {Category} from "../entities/category.entity";

export interface GenericRepository<T> {
	findAll(): Promise<T[]>;
	insert(t: T): Promise<InsertResult>;
	find(id: number): Promise<T | undefined>;
	update(id: number, t: T): Promise<UpdateResult>;
	delete(id: number): Promise<DeleteResult>;
}

