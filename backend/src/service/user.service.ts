import { User } from "../entities/user.entity";
import { Service, Container, Inject } from "typedi";
import { UserRepository } from "../repositories/user.repository";
import { GenericService } from "./service";
import { DeleteResult, InsertResult, UpdateResult } from "typeorm";
import { UsernameTakenError, InvalidLoginError } from "../exceptions/errors";

@Service()
export default class UserService implements GenericService<User> {

	@Inject()
	public repository!: UserRepository;

	find(id: number): Promise<User | undefined> {
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

	async register(username: string, password: string): Promise<string> {
		if (await this.repository.exists(username)) {
			throw new UsernameTakenError(username);
		}

		let u = new User();
		u.name = username;
		u.setPassword(password);
		await this.repository.insert(u);

		return u.generateJWT();
	}

	async login(username: string, password: string): Promise<string> {
		if (!await this.repository.exists(username)) {
			throw new InvalidLoginError(username);
		}

		const user: User = await this.repository.findByName(username);
		if (user.validatePassword(password)) {
			return user.generateJWT();
		} else {
			throw new InvalidLoginError(username);
		}

	}

}