import TimeTrackerView from "../TimeTracker/TimeTrackerView";
import type { TimeTracker } from "../TimeTracker/types";
import useTimeTrackerList from "./useTimeTrackerList";

type TimeTrackerListViewProps = {
  timeTrackers: TimeTracker[],
  onChange: (timeTrackers: TimeTracker[]) => void,
};

const TimeTrackerListView = ({ timeTrackers, onChange }: TimeTrackerListViewProps) => {
  const { handleOnChangeTimer } = useTimeTrackerList(timeTrackers, onChange);

  return (
    <div className='content'>
      {
        timeTrackers.map((timer, index) => timer.isEnabled ? (
          <TimeTrackerView
            key={timer.id}
            timeTracker={timer}
            onChange={(value) => handleOnChangeTimer(value, index)}
          />
        ) : null)
      }
    </div>
  );
};

export default TimeTrackerListView;
