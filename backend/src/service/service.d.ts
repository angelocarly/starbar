export interface GenericService<T> {
	findAll(): Promise<T[]>;
	insert(t: T): Promise<T>;
	update(id: number, t: T): Promise<T>;
	find(id: number): Promise<T | undefined>;
}
