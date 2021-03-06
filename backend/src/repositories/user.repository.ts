import { DeleteResult, getRepository } from "typeorm";
import { User } from "../models/entities";
import { Service } from "typedi";
import { GenericRepository } from "./repository";
import { UserNotFoundError } from "../exceptions/errors";

@Service()
export class UserRepository implements GenericRepository<User> {

	repository = getRepository(User);

	async find(id: number): Promise<User> {
		const user = await this.repository.findOne(id);
		if (!user) {
			throw new UserNotFoundError(undefined, id);
		}
		return user;
	}

	async findByName(username: string): Promise<User> {
		const user = await this.repository.findOne({ where: { name: username } });
		if (!user) {
			throw new UserNotFoundError(username);
		}
		return user;
	}

	findAll(): Promise<User[]> {
		return this.repository.find();
	}

	async insert(user: User): Promise<number> {
		return (await this.repository.insert(user)).raw;
	}

	update(id: number, user: User): Promise<User> {
		return this.repository.save({ ...user, id });
	}

	delete(id: number): Promise<DeleteResult> {
		return this.repository.delete(id);
	}

	async exists(username: string): Promise<boolean> {
		return !!await this.repository.findOne({ where: { name: username } });
	}

}
