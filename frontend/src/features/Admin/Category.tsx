import { Category as CategoryModel } from "../../common/models/Model";
import React, { FC } from "react";

interface CategoryProps {
    category: CategoryModel
}

const Category: FC<CategoryProps> = ({ category }: CategoryProps) => {
	return (
		<p>{category.name}</p>
	);
};

export default Category;

