import { api } from "./api"
export const LogoutApi = async () => {

    const res = await fetch(`${api}/auth/logout`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
    });
    const data = await res.json();
    //トークン削除
    localStorage.removeItem("token");
    //ユーザー名削除
    localStorage.removeItem("username");
    
    if (data.success == false) {
        return { message: data.message, success: data.success };
    } else {
        return { success: data.success };
    }
}