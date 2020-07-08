import { getRepository, MigrationInterface, QueryRunner } from "typeorm";
import { UserSeed } from "../seeds/user.seed";

export class seedUser1593697645912 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await getRepository("user").save(UserSeed);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
	}

}
