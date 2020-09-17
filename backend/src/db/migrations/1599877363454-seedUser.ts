import { getRepository, MigrationInterface } from "typeorm";
import { UserSeed } from "../seeds/user.seed";

export class seedUser1599877363454 implements MigrationInterface {

	public async up(): Promise<void> {
		await getRepository("user").save(UserSeed);
	}

	public async down(): Promise<void> {
		return Promise.resolve(undefined);
	}

}
