import { useState } from "react";
import "./Lottery.css";
import { genRandomNum } from "./helper";
import Ticket from "./Ticket";
export default function Lottery({ n = 3, winCond }) {
  let [arr, setArr] = useState(genRandomNum(n));
  let isWinner = winCond(arr);
  let reRoll = () => {
    setArr(genRandomNum(n));
  };
  return (
    <div className="ticket">
      <Ticket tickets={arr} />
      <div>
        <p>{isWinner && "Congratulations you just won fucking nothing !!!"}</p>
      </div>
      <button onClick={reRoll}>Re-roll</button>
    </div>
  );
}
