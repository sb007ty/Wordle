import { keys } from "../assets/keys";
import "../styles/keyboard.css";
function KeyBoard({ currentWord, onKeyPress, letterMap }) {
  // console.log(letterMap, "lett");
  function getBgClass(keyVal) {
    // console.log(keyVal, letterMap.get(keyVal));
    if (letterMap.get(keyVal) === "yes") return " green-key";
    if (letterMap.get(keyVal) === "no") return " darkGray-key";
    if (letterMap.get(keyVal) === "partial") return " yellow-key";
    return "";
  }
  function getKeys() {
    let r1, r2, r3;
    r1 = keys[0].map((item) => {
      let cl = "keyboard-btn";
      return (
        <button
          key={item}
          className={cl + getBgClass(item)}
          data-btn-val={item}
        >
          {item}
        </button>
      );
    });
    r2 = keys[1].map((item) => {
      let cl = "keyboard-btn";
      return (
        <button
          key={item}
          className={cl + getBgClass(item)}
          data-btn-val={item}
        >
          {item}
        </button>
      );
    });
    r3 = keys[2].map((item) => {
      let cl = "keyboard-btn";
      if (item === "ENTER" || item === "DEL") cl += " special-key";
      return (
        <button
          key={item}
          className={cl + getBgClass(item)}
          data-btn-val={item}
        >
          {item}
        </button>
      );
    });
    return (
      <div
        className="keyboard"
        onClick={(e) => {
          const keyVal = e.target.getAttribute("data-btn-val");
          if (keyVal) {
            onKeyPress(keyVal);
          }
        }}
      >
        <div className="k-r1">{r1}</div>
        <div className="k-r2">{r2}</div>
        <div className="k-r3">{r3}</div>
      </div>
    );
  }
  const displayKeys = getKeys();
  return <>{displayKeys}</>;
}

export default KeyBoard;
