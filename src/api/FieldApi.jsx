import { api } from "./api"
export const FieldApi = async () => {

    const res = await fetch(`${api}/fields`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
    });
    const data = await res.json();
    
    return data.objects;
}