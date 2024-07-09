import React from 'react';

interface ShowWinnerProps {
  message: string;
}

const ShowWinner: React.FC<ShowWinnerProps> = ({ message }) => {
  if (message !== "") {
    return <h1>{message}</h1>;
  } else {
    return null; 
  }
};

export default ShowWinner;
