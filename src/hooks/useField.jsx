import { useEffect, useRef, useState } from "react";
import { FieldApi } from "../api/FieldApi";
import { fieldObjects } from "../fieldObjects";
export const useField = (playerPos, previousPosRef, moveDire, updatePos, isLogin, setTime) => {
    const [field, setField] = useState([]);
    const [isFinish, setIsFinish] = useState(false);
    const [moveCount, setMoveCount] = useState(0);
    //初期フィールド配置
    const getFieldData = async () => {
        const data = await FieldApi();
        setField(data);
    }
    useEffect(() => {
        if (isLogin) {
            //ローカルストレージに移動数カウントがセットされてたら
            if (localStorage.getItem("move-count")) {
                setMoveCount(Number(localStorage.getItem("move-count")));
            }
            //ローカルストレージにフィールドがセットされてたら
            if (localStorage.getItem("field")) {
                setField(JSON.parse(localStorage.getItem("field")));
            } else {
                getFieldData();
            }
        }
    }, [isLogin]);

    useEffect(() => {
        if (field.length === 0) return; // フィールドがまだ初期化されていない場合は処理をスキップ
        const newField = [...field];
        const { y: playerY, x: playerX } = playerPos;

        // 移動先に何があるか確認
        const isBlocked = newField[playerY][playerX] === fieldObjects.block;
        const isGoal = newField[playerY][playerX] === fieldObjects.exit;
        const isEmpty = newField[playerY][playerX] === fieldObjects.none;
        if (isBlocked) {
            //プレイヤーの座標は更新されないので前回の値を代入
            updatePos(previousPosRef.current.y, previousPosRef.current.x);
            //キー入力の方向からblockの移動先を判定する
            if (moveDire == "right" && newField[playerY][playerX + 1] === fieldObjects.none) {
                newField[playerY][playerX + 1] = fieldObjects.block;
            } else if (moveDire == "left" && newField[playerY][playerX - 1] === fieldObjects.none) {
                newField[playerY][playerX - 1] = fieldObjects.block;
            } else if (moveDire == "top" && newField[playerY - 1][playerX] === fieldObjects.none) {
                newField[playerY - 1][playerX] = fieldObjects.block;
            } else if (moveDire == "down" && newField[playerY + 1][playerX] === fieldObjects.none) {
                newField[playerY + 1][playerX] = fieldObjects.block;
            } else {
                return;
            }
            //ブロックがある場合移動してもプレイヤーの座標は変わらない
            newField[playerY][playerX] = fieldObjects.none;
        } else if (isGoal) {
            setIsFinish(true);
        } else if (isEmpty) {
            newField[previousPosRef.current.y][previousPosRef.current.x] = fieldObjects.none;
            newField[playerY][playerX] = fieldObjects.player;
            updatePos(playerY, playerX);
            setMoveCount(prev => prev + 1);
        }
        setField(newField);
    }, [playerPos]);

    //終了判定リセット
    const resetFinish = () => {
        setIsFinish(false);
        getFieldData();
        setTime(0); 
        setMoveCount(0);
    }

    return { field, isFinish, moveCount, resetFinish, };
}