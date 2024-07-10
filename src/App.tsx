import React, { useState } from 'react';
import './App.css';
import Buttons from './components/Buttons';
import ShowCard from './components/ShowCard';
import Points from './components/Points';
import { SendStartGame, SendHit, SendStand } from './api/SendMessages';
import ShowWinner from './components/ShowWinner';

function App() {
  const [backgroundClass, setBackgroundClass] = useState("startbackground");
  const [gameStarted, setGameStarted] = useState(false);
  const [playerCards, setPlayerCards] = useState(Array(8).fill(''));
  const [dealerCards, setDealerCards] = useState(Array(8).fill(''));
  const [playerPoints, setPlayerPoints] = useState(0);
  const [dealerPoints, setDealerPoints] = useState(null);
  const [winnerMessage, setWinnerMessage] = useState("");

  const resetGame = () => {
    setTimeout(() => {
      setBackgroundClass("startbackground");
      setGameStarted(false);
      setPlayerCards(Array(8).fill(''));
      setDealerCards(Array(8).fill(''));
      setPlayerPoints(0);
      setDealerPoints(null);
      setWinnerMessage("");
    }, 4000); 
  };


  const handleStartClick = async () => {
    setGameStarted(true);
    setBackgroundClass("background");
    const data = await SendStartGame();
    setPlayerCards((prev) => {
      const newCards = [...prev];
      newCards[0] = data.playerCards[0];
      newCards[1] = data.playerCards[1];
      return newCards;
    });
    setPlayerPoints(data.playerPoints);
    setDealerCards((prev) => {
      const newCards = [...prev];
      newCards[0] = "back";
      newCards[1] = data.dealerCard;
      return newCards;
    });
    if (data.howisthewinner) {
      setDealerCards((prev) => {
        const newCards = [...prev];
        newCards[0] = data.dealerfirstcard;
        return newCards;
      });
      setDealerPoints(data.delerPoints);
      setWinnerMessage(data.howisthewinner);
      resetGame();
    }
  };

  const handleHitClick = async () => {
    const data = await SendHit();
    setPlayerCards((prev) => {
      const newCards = [...prev];
      for (let i = 0; i < newCards.length; i++) {
        if (!newCards[i]) {
          newCards[i] = data.playerCard;
          break;
        }
      }
      return newCards;
    });
    setPlayerPoints(data.playerPoints);
    if (data.howisthewinner) {
      setDealerCards((prev) => {
        const newCards = [...prev];
        newCards[0] = data.dealerfirstcard;
        return newCards;
      });
      setDealerPoints(data.delerPoints);
      setWinnerMessage(data.howisthewinner);
      resetGame();
    }
  };

  const handleStandClick = async () => {
    const data = await SendStand();
    if (data.howisthewinner) {
      setDealerCards((prev) => {
        const newCards = [...prev];
        newCards[0] = data.dealerfirstcard;
        return newCards;
      });
      setDealerPoints(data.delerPoints);
      setWinnerMessage(data.howisthewinner);
      resetGame();
    }
  };

  return (
    <div className={backgroundClass}>
      {!gameStarted && <Buttons onClick={handleStartClick} name='Start Game' classname='start-button-container' />}
      {gameStarted && (
        <section>
          <div className="dealer">
            {dealerCards.map((card, index) => (
              <ShowCard key={index} name={card} />
            ))}
            <Points number={dealerPoints} />
          </div>
          <div className="button-container">
            <Buttons onClick={handleHitClick} name='Hit' classname='container' />
            <ShowWinner message={winnerMessage} />
            <Buttons onClick={handleStandClick} name='Stand' classname='container' />
          </div>
          <div className="player">
            {playerCards.map((card, index) => (
              <ShowCard key={index} name={card} />
            ))}
            <Points number={playerPoints} />
          </div>
        </section>
      )}
    </div>
  );
}

export default App;
