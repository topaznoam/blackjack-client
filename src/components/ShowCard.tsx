import { useEffect, useState } from "react";
import { BACK_CARD } from "../App";

type ShowCardProps = {
  name: string;
};

const ShowCard: React.FC<ShowCardProps> = ({ name }) => {
  const [flipped, setFlipped] = useState<boolean>(false);

  useEffect(() => {
    if (name !== BACK_CARD && name !== "") {
      const timer = setTimeout(() => {
        setFlipped(true);
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [name]);

  if (name !== "") {
    if (flipped) {
      return (
        <div className="flip-card flipped">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <img src={"/images/cards/back.png"} alt="back" />
            </div>
            <div className="flip-card-back">
              <img src={`/images/cards/${name}.png`} alt={name} />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <img src={"/images/cards/back.png"} alt="back" />
            </div>
            <div className="flip-card-back">
              <img src={`/images/cards/${name}.png`} alt={name} />
            </div>
          </div>
        </div>
      );
    }
  } else {
    return null;
  }
};

export default ShowCard;
