import { useState } from "react";
import { LoginApi } from "../api/LoginApi";

export const useLogin = () => {
    const [isLogin, setIsLogin] = useState(false);
    const handleClick = (username, password) => {
        const getLoginData = async () => {
            const data = await LoginApi(username, password);
            setIsLogin(data);
        };
        getLoginData();
    }
    const resetLogin = () => {
        setIsLogin(false);
    }
    return { handleClick, isLogin,resetLogin };
}