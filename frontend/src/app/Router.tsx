import React, { FC, ReactNode } from "react";
import { createBrowserHistory } from "history";

interface RouterProps {
	routes: Record<string, ReactNode>
}

const Router: FC<RouterProps> = ({ routes }: RouterProps) => {

	const { location } = createBrowserHistory();

	return <>{
		routes[location.pathname]
	}</>;
};

export default Router;
