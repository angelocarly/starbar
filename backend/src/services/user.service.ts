import { User } from "../models/entities";
import { Inject, Service } from "typedi";
import { UserRepository } from "../repositories/user.repository";
import { DeleteResult, InsertResult, UpdateResult } from "typeorm";
import { InvalidLoginError } from "../exceptions/errors";

@Service()
export default class UserService {

	@Inject()
	public repository!: UserRepository;

	find(id: number): Promise<User> {
		return this.repository.find(id);
	}

	findAll(): Promise<User[]> {
		return this.repository.findAll();
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

	async login(username: string, password: string): Promise<string> {
		if (!await this.repository.exists(username)) {
			throw new InvalidLoginError(username);
		}

		const user = await this.repository.findByName(username);
		if (user.validatePassword(password)) {
			return user.generateJWT();
		} else {
			throw new InvalidLoginError(username);
		}
	}

	async changePassword(username: string, password: string): Promise<string> {
	    // Verify that the user exists
		if (!await this.repository.exists(username)) {
			throw new InvalidLoginError(username);
		}

		// Update the user's password
		const user = await this.repository.findByName(username);
		user.setPassword(password)
		await this.repository.update(user.id!, user);

		return user.generateJWT();
	}
}
