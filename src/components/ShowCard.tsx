import { useEffect, useState } from "react";
import { BACK_CARD } from "../App";

type ShowCardProps = {
  name: string;
};

const ShowCard: React.FC<ShowCardProps> = ({ name }) => {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    if (name && name !== BACK_CARD) {
      const timer = setTimeout(() => setFlipped(true), 250);
      return () => clearTimeout(timer);
    }
  }, [name]);

  if (!name) return null;
  else {
    return (
      <div className={`flip-card ${flipped ? "flipped" : ""}`}>
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <img src="/images/cards/back.png" alt="back" />
          </div>
          <div className="flip-card-back">
            <img src={`/images/cards/${name}.png`} alt={name} />
          </div>
        </div>
      </div>
    );
  }
};

export default ShowCard;
