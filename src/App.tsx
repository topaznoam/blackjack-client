import React, { useState } from "react";
import "./App.css";
import Buttons from "./components/Buttons";
import ShowCard from "./components/ShowCard";
import { sendStartGame, sendHit, sendStand } from "./api/SendMessages";

enum Background {
  START = "startbackground",
  DEFULT = "background",
}
export const BACK_CARD = "back";
const FOUR_SEC_DELAY = 4 * 1000;
const TWO_SEC_DELAY = 2 * 1000;
const SEC_DELAY = 1 * 1000;

function App() {
  const [backgroundClass, setBackgroundClass] = useState(Background.START);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [gameEnd, setGameEnd] = useState<boolean>(false);
  const [playerCards, setPlayerCards] = useState<string[]>([]);
  const [dealerCards, setDealerCards] = useState<string[]>([]);
  const [playerPoints, setPlayerPoints] = useState<number>(0);
  const [dealerPoints, setDealerPoints] = useState<number>(0);
  const [sumCardsInDeck, setSumCardsInDeck] = useState<number>(54);
  const [winnerMessage, setWinnerMessage] = useState<string>("");

  const resetGame = () => {
    setTimeout(() => {
      setBackgroundClass(Background.START);
      setGameStarted(false);
      setGameEnd(false);
      setPlayerCards([]);
      setDealerCards([]);
      setPlayerPoints(0);
      setDealerPoints(0);
      setWinnerMessage("");
    }, FOUR_SEC_DELAY);
  };

  const handleStartClick = async () => {
    setGameStarted(true);
    setBackgroundClass(Background.DEFULT);
    const data = await sendStartGame();
    setPlayerCards([data.playerCards[0], data.playerCards[1]]);
    setPlayerPoints(data.playerPoints);
    setSumCardsInDeck(data.sumCardsInDeck);
    setDealerCards([BACK_CARD, data.dealerCard]);
    if (data.howisthewinner) {
      setGameEnd(true);
      setDealerCards([data.dealerfirstcard, data.dealerCard]);
      setDealerPoints(data.dealerPoints);
      setTimeout(() => {
        setWinnerMessage(data.howisthewinner);
        resetGame();
      }, TWO_SEC_DELAY);
    }
  };

  const handleHitClick = async () => {
    if (!gameEnd) {
      const data = await sendHit();
      setPlayerCards((prev) => [...prev, data.playerCard]);
      setPlayerPoints(data.playerPoints);
      setSumCardsInDeck(data.sumCardsInDeck);
      if (data.howisthewinner) {
        setGameEnd(true);
        const rememberCard = dealerCards[1];
        setDealerCards([data.dealerfirstcard, rememberCard]);
        setDealerPoints(data.dealerPoints);
        setTimeout(() => {
          setWinnerMessage(data.howisthewinner);
          resetGame();
        }, SEC_DELAY);
      }
    }
  };

  const handleStandClick = async () => {
    if (!gameEnd) {
      const data = await sendStand();
      setSumCardsInDeck(data.sumCardsInDeck);
      if (data.howisthewinner) {
        setGameEnd(true);
        setDealerCards((prev) => {
          const newCards = [...prev];
          newCards[0] = data.dealerfirstcard;
          return newCards;
        });
        setDealerPoints(data.dealerPoints);
        setTimeout(() => {
          setWinnerMessage(data.howisthewinner);
          resetGame();
        }, SEC_DELAY);
      } else {
        setDealerCards((prev) => {
          const newCards = [...prev];
          newCards[0] = data.dealerfirstcard;
          if (data.dealerNewCard) {
            newCards.push(data.dealerNewCard);
          }
          return newCards;
        });
        setDealerPoints(data.dealerPoints);
        setTimeout(() => {
          handleStandClick();
        }, TWO_SEC_DELAY);
      }
    }
  };

  return (
    <div className={backgroundClass}>
      {!gameStarted && (
        <Buttons
          onClick={handleStartClick}
          name="Start Game"
          classname="start-button-container"
        />
      )}
      {gameStarted && (
        <section>
          <h2 className="sum-of-deck">{sumCardsInDeck}</h2>
          <div className="dealer">
            {dealerCards.map((card, index) => (
              <ShowCard key={index} name={card} />
            ))}
            <h1>{!!dealerPoints && dealerPoints}</h1>
          </div>
          <div className="button-container">
            <Buttons
              onClick={handleHitClick}
              name="Hit"
              classname="container"
            />
            <h1>{winnerMessage}</h1>
            <Buttons
              onClick={handleStandClick}
              name="Stand"
              classname="container"
            />
          </div>
          <div className="player">
            {playerCards.map((card, index) => (
              <ShowCard key={index} name={card} />
            ))}
            <h1>{playerPoints}</h1>
          </div>
        </section>
      )}
    </div>
  );
}

export default App;
