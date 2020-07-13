import React, { FC, useEffect, useState } from "react";
import { Category as CategoryModel } from "../../common/models/Model";
import { Collapse } from "antd";
import Category from "./Category";

const Categories: FC = () => {

	const [categories, setCategories] = useState<CategoryModel[]>([]);

	useEffect(() => {
		fetch("/categories")
			.then(async c => setCategories(await c.json()));
	}, []);

	return (
		<Collapse defaultActiveKey={1} accordion>
			{
				categories.map((value, index) => <Collapse.Panel
					key={value.id || index}
					header={value.name}
				>
					<Category category={value}/>
				</Collapse.Panel>)
			}
		</Collapse>
	);
};

export default Categories;
