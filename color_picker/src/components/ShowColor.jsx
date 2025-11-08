import { useState } from "react";
import hexColor from "./helper";
import ColorBox from "./ColorBox";
import "./ShowColor.css";
export default function ShowColor() {
  let [styles, setStyles] = useState({
    backgroundColor: "#121212",
  });
  const clickHandler = () => {
    setStyles({ ...styles, backgroundColor: hexColor() });
  };
  const copyToClipboard = (color) => {
    navigator.clipboard
      .writeText(`${color}`)
      .then(() => alert("Copied to clipboard"))
      .catch(() => alert("Something went wrong"));
  };
  return (
    <div className="maincode">
      <h1>Color Picker App</h1>
      <ColorBox styles={styles} />
      <div style={{ display: "flex", gap: "1.5rem" }}>
        <button className="changeBtn" onClick={clickHandler}>
          change color
        </button>
        <button
          className="changeBtn"
          onClick={() => copyToClipboard(styles.backgroundColor)}
        >
          Copy color
        </button>
      </div>
    </div>
  );
}
