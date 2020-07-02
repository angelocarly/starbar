import { ConnectionOptions } from 'typeorm';

import { Category } from './entities/category';
import { Consumption } from './entities/consumption';

const typeOrmConfig: ConnectionOptions = {
	type: "sqlite",
	database: "database/excuze.sqlite",
	synchronize: false,
	logging: false,
	entities: [
		Category,
		Consumption
	]
};

export { typeOrmConfig };