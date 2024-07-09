

type ButtonProps = {
    onClick: () => void;
};

const StartButton: React.FC<ButtonProps> = ({ onClick }) => (
    <div className="start-button-container">
        <button onClick={onClick}><strong>Start</strong></button>
    </div>
);

const StandButton: React.FC<ButtonProps> = ({ onClick }) => (
        <button onClick={onClick}><strong>Stand</strong></button>
);

const HitButton: React.FC<ButtonProps> = ({onClick}) => (
    <button onClick={onClick}><strong>Hit</strong></button>
);
export { StandButton, HitButton, StartButton };
