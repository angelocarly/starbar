import { getRepository, MigrationInterface, QueryRunner } from "typeorm";
import { UserSeed } from "../seeds/user.seed";

export class seedUser1599877363454 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await getRepository("user").save(UserSeed);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
	}

}
