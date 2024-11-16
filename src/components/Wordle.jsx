import { useEffect, useState } from "react";
import KeyBoard from "./KeyBoard";
import { WORDS } from "../assets/words";
import WordRow from "./WordRow";

function Wordle() {
  const [randomWord, setRandomWord] = useState("");
  const [currentAttempt, setCurrentAttempt] = useState([]);
  const [allAttempts, setAllAttempts] = useState([]);
  const [letterMap, setLetterMap] = useState(new Map());
  const [gameOver, setGameOver] = useState("play");
  console.log(randomWord);
  function getRandomNum() {
    const randN = Math.floor(Math.random() * WORDS.length);
    setRandomWord(WORDS[randN]);
  }
  useEffect(() => {
    getRandomNum();
  }, []);
  function checkCorrectKey(keyVal) {
    const keyValIn = currentAttempt.length;
    if (randomWord[keyValIn] === keyVal) return "yes";
    else if (randomWord.includes(keyVal)) return "partial";
    else return "no";
  }
  function gameOverFun(result) {
    setTimeout(() => {
      setGameOver(result);
    }, 1000);
  }
  function onKeyPress(keyVal) {
    // console.log(keyVal);
    if (keyVal === "ENTER") {
      //     const newCurrentAttempt = [...currentAttempt, newKey];
      //   setCurrentAttempt(newCurrentAttempt);

      let fl = 0;
      for (let i = 0; i < currentAttempt.length; i++) {
        if (!(randomWord[i] === currentAttempt[i].val)) fl = 1;
      }
      if (!fl) {
        gameOverFun("won");
      }

      if (currentAttempt.length < 5) {
        alert("Enter 5 letters");
        return;
      }
      const newAllAttempts = [...allAttempts];
      newAllAttempts.push(currentAttempt);
      if (newAllAttempts.length === 6) {
        gameOverFun("lost");
      }
      setCurrentAttempt([]);
      setAllAttempts(newAllAttempts);
      const newLetterMap = structuredClone(letterMap);
      currentAttempt.forEach((item) => {
        if (!(letterMap.get(item.val) === "yes"))
          newLetterMap.set(item.val, item.exist);
      });
      setLetterMap(newLetterMap);
    } else if (keyVal === "DEL") {
      const newCurrentAttempt = [...currentAttempt];
      newCurrentAttempt.pop();
      setCurrentAttempt(newCurrentAttempt);
    } else {
      if (currentAttempt.length >= 5) {
        alert("Press Enter/Del");
        return;
      }

      const newKey = {
        val: keyVal,
        exist: checkCorrectKey(keyVal),
        show: false,
      };
      const newCurrentAttempt = [...currentAttempt, newKey];
      setCurrentAttempt(newCurrentAttempt);
    }
  }
  //   console.log(currentAttempt, allAttempts, "check");
  const showAns = allAttempts.length;
  return (
    <div>
      {gameOver === "play" && (
        <>
          <div>Wordle- Guess the word</div>
          <div className="word-row-parent">
            {Array(6)
              .fill(0)
              .map((item, index) => {
                let wordRowVal = [];
                if (index < showAns) {
                  wordRowVal = allAttempts[index];
                } else if (index === showAns) {
                  wordRowVal = [...currentAttempt];
                }
                return (
                  <WordRow
                    key={index}
                    wordRow={wordRowVal}
                    showAns={allAttempts.length}
                    index={index}
                  />
                );
              })}
          </div>
          <KeyBoard
            onKeyPress={onKeyPress}
            currentAttempt={currentAttempt}
            letterMap={letterMap}
          />
        </>
      )}
      {gameOver !== "play" && (
        <div className="game-over">
          <p>Game Over- You {gameOver}</p>
          <button
            onClick={(e) => {
              setCurrentAttempt([]);
              setAllAttempts([]);
              setLetterMap(new Map());
              setGameOver("play");
              getRandomNum();
            }}
          >
            Restart
          </button>
        </div>
      )}
    </div>
  );
}

export default Wordle;
