import { ConnectionOptions } from "typeorm";

import { Category } from "./models/entities/category.entity";
import { Consumption } from "./models/entities/consumption.entity";
import { User } from "./models/entities/user.entity";
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