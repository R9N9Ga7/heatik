import './App.css'
import HeaderView from '../components/Header/HeaderView';
import TimeTrackerListView from '../components/TimeTrackerList/TimeTrackerListView';
import useApp from './useApp';
import StatisticsView from '../components/Statistics/StatisticsView';

function App() {
  const {
    handleOnAddTimer,
    setTimeTrackers,
    timeTrackers,
  } = useApp();

  return (
    <div>
      <HeaderView onAddTimer={handleOnAddTimer} />
      <div className='app'>
        <StatisticsView timeTrackers={timeTrackers} />
        <TimeTrackerListView onChange={setTimeTrackers} timeTrackers={timeTrackers} />
      </div>
    </div>
  )
}

export default App
