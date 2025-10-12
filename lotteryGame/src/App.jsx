import "./App.css";
import Lottery from "./Lottery";
import { sum } from "./helper";
function App() {
  let winningCondition = (ticket) => {
    return sum(ticket) === 15;
  };
  return (
    <>
      <Lottery n={3} winCond={winningCondition} />
    </>
  );
}

export default App;
