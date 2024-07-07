import React, { useState } from 'react';
import './App.css';
import { StandButton, HitButton, StartButton } from './Buttons';
import ShowCard from './ShowCard';
import Points from './Points';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [playerCards, setPlayerCards] = useState(Array(8).fill(''));
  const [dealerCards, setDealerCards] = useState(Array(8).fill(''));
  const [playerPoints, setPlayerPoints] = useState(0);

  const handleStartClick = async () => {
    setGameStarted(true);
    try {
      const response = await fetch('http://localhost:5000/receive-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: 'Hello from client!' }),
      });
      const data = await response.json();
      console.log(data);
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
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleHitClick = async () => {
    try {
      const response = await fetch('http://localhost:5000/receive-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: 'get card' }),
      });
      const data = await response.json();
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
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleStandClick = async () => {
    // Handle the stand logic
  };

  return (
    <div className="background">
      {!gameStarted && <StartButton onClick={handleStartClick} />}
      {gameStarted && (
        <section>
          <div className="dealer">
            {dealerCards.map((card, index) => (
              <ShowCard key={index} name={card} />
            ))}
            <Points number={null} />
          </div>
          <div className="button-container">
            <HitButton onClick={handleHitClick} />
            <StandButton onClick={handleStandClick} />
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
