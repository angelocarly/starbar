import { getRepository, DeleteResult, InsertResult, UpdateResult } from "typeorm";
import { User } from "../entities/user.entity";
import { Service } from "typedi";
import { GenericRepository } from "./repository";
import { UserNotFoundError} from "../exceptions/errors";


@Service()
export class UserRepository implements GenericRepository<User> {

	repository = getRepository(User);

	async find(id: number): Promise<User> {
		const user = await this.repository.findOne(id);
		if (!user) {
			throw new UserNotFoundError(id);
		}
		return user;
	}

	async findByName(username: String): Promise<User> {
		const user = await this.repository.findOne({ where: { name: username }});
		if (!user) {
			throw new UserNotFoundError(username);
		}
		return user;
	}

	findAll(): Promise<User[]> {
		return this.repository.find();
	}

	insert(user: User): Promise<InsertResult> {
		return this.repository.insert(user);
	}

	update(id: number, user: User): Promise<UpdateResult> {
		return this.repository.update(id, user);
	}

	delete(id: number): Promise<DeleteResult> {
		return this.repository.delete(id);
	}

	async exists(username: string): Promise<boolean> {
		const obj = await this.repository.findOne({ where: { name: username} });
		return obj != undefined;
	}

}