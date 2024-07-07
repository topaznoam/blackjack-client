

type ButtonProps = {
    onClick: () => void;
};

const StartButton: React.FC<ButtonProps> = ({ onClick }) => (
    <div className="start-button-container">
        <button onClick={onClick}>Start</button>
    </div>
);

const StandButton: React.FC<ButtonProps> = ({ onClick }) => (
        <button onClick={onClick}>Stand</button>
);

const HitButton: React.FC<ButtonProps> = ({onClick}) => (
    <button onClick={onClick}>Hit</button>
);
export { StandButton, HitButton, StartButton };
