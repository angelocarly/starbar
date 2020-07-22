import React, {FC, useEffect} from "react";
import Categories from "./Categories";
import Login from "./Login/Login";
import {useDispatch, useSelector} from "react-redux";
import {fetchCategories, token} from "./Admin.slice";
import {AppDispatch} from "../../app/store";

// Hier menu object/state bijhouden en doorgeven aan views
const Admin: FC = () => {

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    return useSelector(token) ?
        <>
            <Categories/>
        </>
        : <Login/>;
}
export default Admin;
