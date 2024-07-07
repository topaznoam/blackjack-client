import React from 'react';

interface ShowCardProps {
    name: string;
}

const ShowCard: React.FC<ShowCardProps> = ({ name }) => {
    if (name !== "") {
        console.log(name);
        if (name === "back") {
            return <img src={'/images/cards/back.png'} alt={name} style={{ marginRight: 10, marginLeft: 10 }} />;
        } else {
            return (
                <div className="flip-card">
                    <div className="flip-card-inner">
                        <div className="flip-card-front">
                            <img src={'/images/cards/back.png'} alt="back" />
                        </div>
                        <div className="flip-card-back">
                            <img src={`/images/cards/${name}.png`} alt={name} />
                        </div>
                    </div>
                </div>
            )
        }
    } else {
        return null;
    }
};

export default ShowCard;
