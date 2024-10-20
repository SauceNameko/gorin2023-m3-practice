import { api } from "./api"
export const ResultsApi = async () => {

    const res = await fetch(`${api}/results`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
    });
    const data = await res.json();
    return data;
}