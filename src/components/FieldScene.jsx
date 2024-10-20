import { fieldObjects } from "../fieldObjects";
import "./FieldScene.css";
export const FieldScene = ({ field, moveCount, timer }) => {

    return (
        <>
            <div className="move-count" >move-count: {moveCount}</div>
            <div className="timer" >timer: {timer}</div>
            <div className="field">
                {field.map((y, yIndex) => {
                    return y.map((x, xIndex) => {
                        return (
                            <>
                                {x == fieldObjects.none && <div className="none" key={xIndex} ></div>}
                                {x == fieldObjects.wall && <div className="wall" key={xIndex} ></div>}
                                {x == fieldObjects.player && <div className="player" key={xIndex} ></div>}
                                {x == fieldObjects.block && <div className="block" key={xIndex} ></div>}
                                {x == fieldObjects.exit && <div className="exit" key={xIndex} ></div>}
                            </>
                        )

                    })
                })}
            </div>
        </>
    )
}