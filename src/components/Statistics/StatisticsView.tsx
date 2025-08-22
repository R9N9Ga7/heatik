import type { TimeTracker } from '../TimeTracker/types';
import { formatHMSFromSeconds } from '../TimeTracker/utils';
import './Statistics.css';
import useStatistics from './useStatistics';

type StatisticsViewProps = {
  timeTrackers: TimeTracker[],
};

const StatisticsView = ({ timeTrackers }: StatisticsViewProps) => {
  const { getTotalElapsedTime } = useStatistics();

  if (!timeTrackers.length)
    return null;

  return (
    <div className='statistics'>
      <details>
        <summary>
          Statistics
        </summary>
        {
          timeTrackers.map(timer => (
            <div className='item' key={timer.id + 'stats'}>
              <strong>{ timer.name }</strong>
              <span>{ formatHMSFromSeconds(getTotalElapsedTime(timer)) }</span>
            </div>
          ))
        }
      </details>
    </div>
  );
};

export default StatisticsView;
