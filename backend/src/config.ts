import { ConnectionOptions } from "typeorm";

import { Category } from "./entities/category.entity";
import { Consumption } from "./entities/consumption.entity";
import { User } from "./entities/user.entity";
import { join } from "path";

const typeOrmConfig: ConnectionOptions = {
	type: "sqlite",
	database: "database/excuze.sqlite",
	synchronize: true,
	logging: false,
	entities: [
		Category,
		Consumption,
		User
	],
	migrations: [
		join(__dirname, "./migrations/{.ts,*.js}")
	],
	migrationsRun: true
};

export { typeOrmConfig };