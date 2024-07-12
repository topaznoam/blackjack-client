type ButtonProps = {
  onClick: () => void;
  name: string;
  classname: string;
};

const Buttons: React.FC<ButtonProps> = ({ onClick, name, classname }) => (
  <div className={classname}>
    <button onClick={onClick}>
      <strong>{name}</strong>
    </button>
  </div>
);

export default Buttons;
