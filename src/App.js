import { useEffect, useState } from 'react';
import './App.css';
import { FieldScene } from './components/FieldScene';
import { LoginScene } from './components/LoginScene';
import { useField } from './hooks/useField';
import { useLogin } from './hooks/useLogin';
import { usePlayerPos } from './hooks/usePlayerPos';
import { ResultScene } from './components/ResultScene';
import { useLogout } from './hooks/useLogout';

function App() {
  const [time, setTime] = useState(0);
  const { handleClick, isLogin, resetLogin } = useLogin();
  const { playerPos, previousPosRef, moveDire, updatePos } = usePlayerPos();
  const { field, isFinish, moveCount, resetFinish, } = useField(playerPos, previousPosRef, moveDire, updatePos, isLogin,setTime);
  const { logout, message, logoutData } = useLogout(resetLogin,);

  useEffect(() => {
    let TIMER;
    if (isLogin && !isFinish) {
      TIMER = setInterval(() => {
        setTime(prev => prev + 1);
      }, 1000);
      return () => {
        clearInterval(TIMER);
      }
    }
    if (isFinish) {
      clearInterval(TIMER);
    }
  }, [isLogin, isFinish]);
  //時間計算
  const hour = Math.floor(time / 3600);
  const minute = Math.floor((time % 3600) / 60);
  const second = Math.floor(time % 60);
  const timer = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:${String(second).padStart(2, "0")}`

  useEffect(() => {
    //ローカルストレージに時間がセットされてたら
    if (localStorage.getItem("time")) {
      setTime(Number(localStorage.getItem("time")));
    }

  }, []);

  useEffect(() => {
    if (isLogin) {
      if (field.length === 0) return;
      //ローカルストレージセット
      localStorage.setItem("time", time);
      localStorage.setItem("move-count", moveCount);
      localStorage.setItem("field", JSON.stringify(field));
      localStorage.setItem("player-pos", JSON.stringify(playerPos));
    }
  }, [field, isLogin, moveCount, timer]);

  useEffect(() => {
    console.log(isFinish);

    if (isFinish || logoutData.success) {
      console.log(42342424);
      updatePos(1, 1);
      localStorage.removeItem("time");
      localStorage.setItem("move-count", 0);
      localStorage.removeItem("field");
      localStorage.removeItem("player-pos");
    }
  }, [isFinish, logoutData]);

  useEffect(() => {

  }, [isFinish]);

  return (
    <>
      {!isLogin && <LoginScene onLoginClick={handleClick} ></LoginScene>}
      {isLogin && isFinish && <ResultScene moveCount={moveCount} time={time}></ResultScene>}
      {isLogin && !isFinish && <FieldScene field={field} moveCount={moveCount} timer={timer} ></FieldScene>}
      {isLogin && <button onClick={() => { logout() }} >ログアウト</button>}
      {message && <div className='message' style={{ color: "red" }} >{message}</div>}
      {isLogin && isFinish && <button onClick={() => { resetFinish() }}>リプレイ</button>}
    </>
  );
}

export default App;
