import { api } from "./api"
export const postResultsApi = async (block_moves, time) => {
    const res = await fetch(`${api}/results`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ "block_moves": block_moves, "time": time })
    });
    const data = await res.json();
    console.log(data);

    if (data.success == false) {
        return { message: data.message, success: data.success };
    } else {
        window.alert("投稿が完了しました");
        return { success: data.success };
    }
}