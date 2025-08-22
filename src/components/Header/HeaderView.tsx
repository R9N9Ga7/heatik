import './Header.css';

type HeaderProps = {
  onAddTimer: () => void,
};

const HeaderView = ({ onAddTimer }: HeaderProps) => {
  return (
    <header>
      <button onClick={onAddTimer}>Add timer</button>
    </header>
  );
};

export default HeaderView;
