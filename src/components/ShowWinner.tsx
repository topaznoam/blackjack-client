import React from 'react';

type ShowWinnerProps = {
    message: string;
}

const ShowWinner: React.FC<ShowWinnerProps> = ({ message }) => {
    return <h1>{message}</h1>;
};

export default ShowWinner;
