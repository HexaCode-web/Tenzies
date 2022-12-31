import React from "react";
import Number from "./assets/Number";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
export default function App() {
  const random = () => {
    return Math.floor(Math.random() * 6 + 1);
  };
  const AllNew = () => {
    const newDice = [];
    for (let index = 0; index < 10; index++) {
      let numberOBJ = {
        ID: nanoid(),
        value: random(),
        selected: false,
      };
      newDice.push(numberOBJ);
    }
    return newDice;
  };
  const [numbersList, SetNumberList] = React.useState(AllNew());
  const [isWon, setIsWon] = React.useState(false);
  const Selected = (ReceivedID) => {
    SetNumberList((oldList) =>
      oldList.map((object) => {
        return object.ID === ReceivedID
          ? { ...object, selected: !object.selected }
          : object;
      })
    );
  };
  let NumbersEl = numbersList.map((numberOBJ) => {
    return (
      <Number
        className="Number"
        number={numberOBJ.value}
        key={numberOBJ.ID}
        id={numberOBJ.ID}
        selected={numberOBJ.selected}
        HandleClick={Selected}
      />
    );
  });
  const Roll = () => {
    SetNumberList((prev) =>
      prev.map((object) => {
        return object.selected
          ? object
          : (object = { ID: nanoid(), value: random(), selected: false });
      })
    );
  };
  const FreshStart = () => {
    SetNumberList(AllNew);
  };
  React.useEffect(() => {
    let AllHeld = numbersList.every((object) => object.selected);
    let FirstValue = numbersList[0].value;
    console.log(FirstValue);
    let allSameValue = numbersList.every(
      (object) => object.value === FirstValue
    );
    if (AllHeld && allSameValue) {
      setIsWon(true);
      console.log("you won! kinda");
    }
  }, [numbersList]);
  return (
    <div className="Main">
      <div className="Intro">
        <h1>Tenzies</h1>
        <p>
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
      </div>
      <div className="NumberList">{NumbersEl}</div>
      {!isWon && (
        <button className="btn" onClick={Roll}>
          Roll
        </button>
      )}
      {isWon && (
        <button className="btn" onClick={FreshStart}>
          New Game
        </button>
      )}
      {isWon && <Confetti />}
      {isWon && <h1>You Won!!</h1>}
    </div>
  );
}
