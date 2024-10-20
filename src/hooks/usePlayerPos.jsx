import { useEffect, useRef, useState } from "react";

export const usePlayerPos = () => {
    const [playerPos, setPlayerPos] = useState({ y: 1, x: 1 });
    const previousPosRef = useRef({ y: null, x: null }); // 移動前のプレイヤー位置をuseRefで保持
    const [moveDire, setMoveDire] = useState("");
    // プレイヤー移動
    useEffect(() => {
        if (localStorage.getItem("player-pos")) {
            setPlayerPos(JSON.parse(localStorage.getItem("player-pos")));
        }
    }, []);
    const move = (e) => {
        setPlayerPos(prevPos => {
            let newY = prevPos.y;
            let newX = prevPos.x;
            previousPosRef.current = { y: newY, x: newX };
            switch (e.key) {
                case "ArrowLeft":
                    newX = Math.max(1, prevPos.x - 1);
                    setMoveDire("left");
                    break;
                case "ArrowRight":
                    newX = Math.min(3, prevPos.x + 1);
                    setMoveDire("right");
                    break;
                case "ArrowUp":
                    newY = Math.max(1, prevPos.y - 1);
                    setMoveDire("up");
                    break;
                case "ArrowDown":
                    newY = Math.min(2, prevPos.y + 1);
                    setMoveDire("down");
                    break;
                default:
                    break;
            }
            return { y: newY, x: newX };
        });
    };
    useEffect(() => {
        document.addEventListener("keydown", move);
        return () => {
            document.removeEventListener("keydown", move);
        }
    }, [playerPos]);
    const updatePos = (y, x) => {
        setPlayerPos({ y, x });
    }

    return { playerPos, previousPosRef, moveDire, updatePos }
}