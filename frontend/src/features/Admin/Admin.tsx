import React, { FC, useState } from "react";
import Categories from "./Categories";
import Login from "./Login/Login";

const Admin: FC = () => {

	const [token, setToken] = useState<string>("");

	return (<>
		{
			token ?
				<Categories/> :
				<Login setToken={setToken}/>
		}
	</>);
};

export default Admin;