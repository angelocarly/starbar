import React, { FC, ReactNode } from "react";
import { createBrowserHistory } from "history";

interface RouterProps {
	routes: Record<string, ReactNode>
}

const Router: FC<RouterProps> = ({ routes }: RouterProps) => {

	const { location, push } = createBrowserHistory();

	const navigate = (path: string): void => {
		push(path);
	};

	return <>{routes[location.pathname]}</>;
};

export default Router;
