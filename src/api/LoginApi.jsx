import { api } from "./api"
export const LoginApi = async (username, password) => {

    const res = await fetch(`${api}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            "username": username,
            "password": password
        })
    });
    const data = await res.json();
    if (data.success == false) {
        return false;
    }
    if (data.username) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);
        return true;
    }
}