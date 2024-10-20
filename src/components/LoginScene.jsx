import { useRef } from "react"

export const LoginScene = ({ onLoginClick }) => {
    const nameRef = useRef();
    const passwordRef = useRef();
    return (
        <>
            <div className="login">
                <input type="text" name="name" id="" ref={nameRef} defaultValue={localStorage.getItem("username")}  />
                <input type="text" name="password" id="" ref={passwordRef} />
                <button onClick={() => { onLoginClick(nameRef.current.value, passwordRef.current.value) }} >ログイン</button>
            </div>
        </>
    )
}