import "../styles/wordrow.css";
function WordRow({ wordRow, showAns, index }) {
  //   console.log(wordRow, "here");
  function getBgClass(item) {
    // console.log(keyVal, letterMap.get(keyVal));
    if (item.exist === "yes") return " green-key";
    if (item.exist === "no") return " darkGray-key";
    if (item.exist === "partial") return " yellow-key";
    return "";
  }
  function getLetters() {
    if (index > showAns) {
      return Array(5)
        .fill(0)
        .map((_, index) => <div className="atm-letter" key={index}></div>);
    }

    if (showAns === index) {
      const dipsArr = [];
      //   console.log(wordRow, "hey**");
      for (let i = 0; i < 5; i++) {
        const letterVal = wordRow[i]?.val || null;
        dipsArr.push(
          <div className="atm-letter" key={i}>
            {letterVal}
          </div>
        );
      }
      return dipsArr;
    }
    if (index < showAns) {
      return wordRow.map((item, index) => {
        const cl = "atm-letter " + getBgClass(item);
        return (
          <div className={cl} key={index}>
            {item.val}
          </div>
        );
      });
    }
  }
  const dispLetters = getLetters();
  return <div className="word-row">{dispLetters}</div>;
}

export default WordRow;
