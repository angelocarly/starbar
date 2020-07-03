import { ConnectionOptions } from "typeorm";

import { Category } from "./entities/category.entity";
import { Consumption } from "./entities/consumption.entity";

const typeOrmConfig: ConnectionOptions = {
	type: "sqlite",
	database: "database/excuze.sqlite",
	synchronize: true,
	logging: false,
	entities: [
		Category,
		Consumption
	]
};

export { typeOrmConfig };