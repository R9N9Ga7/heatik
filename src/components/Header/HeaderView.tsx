import './Header.css';

type HeaderProps = {
  onAddTimer: () => void,
};

const HeaderView = ({ onAddTimer }: HeaderProps) => {
  return (
    <header className='header'>
      <button className='control' onClick={onAddTimer}>Add timer</button>
    </header>
  );
};

export default HeaderView;
