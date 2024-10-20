import { useState } from "react";
import { LogoutApi } from "../api/LogoutApi"

export const useLogout = (resetLogin, resetFinish) => {
    const [message, setMessage] = useState("");
    const [logoutData, setLogoutData] = useState({});
    const logout = async () => {
        try {
            const logoData = await LogoutApi();
            if (logoData.success) {
                resetLogin();
                resetFinish();
                setLogoutData(logoData);
                return true;
            } else {
                setMessage(logoData.message);
                return false;
            }
        } catch (error) {
            return false;
        }
    }
    return { logout, message, logoutData }
}