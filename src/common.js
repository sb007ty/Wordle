function getBgClass(keyVal) {
  // console.log(keyVal, letterMap.get(keyVal));
  if (letterMap.get(keyVal) === "yes") return " green-key";
  if (letterMap.get(keyVal) === "no") return " darkGray-key";
  if (letterMap.get(keyVal) === "partial") return " yellow-key";
  return "";
}
