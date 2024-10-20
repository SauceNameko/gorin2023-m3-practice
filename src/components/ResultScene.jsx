import "./ResultScene.css";
import { useEffect, useState } from "react"
import { ResultsApi } from "../api/resultsApi"
import { postResultsApi } from "../api/postResultsApi";

export const ResultScene = ({moveCount,time }) => {
    const [results, setResults] = useState([]);
    useEffect(() => {
        const getResults = async () => {
            const data = await ResultsApi();
            const sortData = data.sort((a, b) => a.time - b.time);
            const sliceData = sortData.slice(0, 3);
            setResults(sliceData);
        }
        getResults();
    }, []);
    console.log(results);

    return (
        <div className="result">
            <div className="clear-text">ゲームクリア</div>
            <table>
                <tr>
                    <th>user</th>
                    <th>block_moves</th>
                    <th>time</th>
                </tr>
                {results.map((result, index) => {
                    return (
                        <tr>
                            <td className={`${result.user == localStorage.getItem("username") ? "active" : ""}`}>{result.user}</td>
                            <td>{result.block_moves}</td>
                            <td>{result.time}</td>
                        </tr>
                    )
                })}
            </table>
            <div className="">結果投稿</div>
            <button onClick={()=>{postResultsApi(moveCount,time)}}>投稿する</button>
        </div>
    )
}