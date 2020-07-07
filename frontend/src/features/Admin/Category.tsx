import { Category as CategoryModel } from "./Admin.d";
import React, { FC } from "react";

interface CategoryProps {
    category: CategoryModel
}

const Category: FC<CategoryProps> = ({ category }: CategoryProps) => {
	return (<>
		{Object.entries((v: any) => <div>{v}</div>)}
	</>);
};

export default Category;

