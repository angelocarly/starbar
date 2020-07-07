import React, { FC, useEffect, useState } from "react";
import { Category as CategoryModel } from "./Admin.d";
import Category from "./Category";

const Categories: FC = () => {

	const [categories, setCategories] = useState<CategoryModel[]>([]);

	useEffect(() => {
		fetch("https://localhost:3000/categories")
			.then(async c => setCategories(await c.json()));
	}, []);

	return (<>
		{
			categories.map((value, index) =>
				<Category key={index} category={value}/>)
		}
	</>);
};

export default Categories;