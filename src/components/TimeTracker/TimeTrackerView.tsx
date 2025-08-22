import './TimeTracker.css';
import { type TimeTrackerViewProps } from './types';
import useTimeTracker from './useTimeTracker';

const TimeTrackerView = ({
  timeTracker: timer,
  onChange,
}: TimeTrackerViewProps) => {
  const {
    handleOnStart,
    handleOnStop,
    handlOnChangeTargetTime,
    handleOnReset,
    handleOnChangeName,
    handleOnRemove,
    handleOnBlurTargetName,
  } = useTimeTracker({ timeTracker: timer, onChange });

  return (
    <div className='timer'>
      <div className='header'>
        <input
          type='text'
          className='name'
          value={timer.name}
          onChange={(event) => handleOnChangeName(event.target.value)}
        />
      </div>
      <div className='body'>
        <h3 className='remaining-time'>{ timer.remainingTime }</h3>
        <input
          type='text'
          className='target-time'
          value={timer.targetTime}
          onChange={(event) => handlOnChangeTargetTime(event.target.value)}
          onBlur={handleOnBlurTargetName}
        />
      </div>
      <div className='footer'>
        <button
          className='control'
          onClick={() => timer.isRunning ? handleOnStop() : handleOnStart()}
        >
          {
            timer.isRunning ? (
              <svg viewBox="-1 0 8 8" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <g id="Page-1" stroke="none">
                  <g id="Dribbble-Light-Preview" transform="translate(-227.000000, -3765.000000)">
                    <g id="icons" transform="translate(56.000000, 160.000000)">
                      <path d="M172,3605 C171.448,3605 171,3605.448 171,3606 L171,3612 C171,3612.552 171.448,3613 172,3613 C172.552,3613 173,3612.552 173,3612 L173,3606 C173,3605.448 172.552,3605 172,3605 M177,3606 L177,3612 C177,3612.552 176.552,3613 176,3613 C175.448,3613 175,3612.552 175,3612 L175,3606 C175,3605.448 175.448,3605 176,3605 C176.552,3605 177,3605.448 177,3606"></path>
                    </g>
                  </g>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.4086 9.35258C23.5305 10.5065 23.5305 13.4935 21.4086 14.6474L8.59662 21.6145C6.53435 22.736 4 21.2763 4 18.9671L4 5.0329C4 2.72368 6.53435 1.26402 8.59661 2.38548L21.4086 9.35258Z"/>
              </svg>
            )
          }
        </button>
        <button onClick={handleOnReset} className='control'>Reset</button>
        <button onClick={handleOnRemove} className='control'>
          <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.8,16l5.5-5.5c0.8-0.8,0.8-2,0-2.8l0,0C24,7.3,23.5,7,23,7c-0.5,0-1,0.2-1.4,0.6L16,13.2l-5.5-5.5  c-0.8-0.8-2.1-0.8-2.8,0C7.3,8,7,8.5,7,9.1s0.2,1,0.6,1.4l5.5,5.5l-5.5,5.5C7.3,21.9,7,22.4,7,23c0,0.5,0.2,1,0.6,1.4  C8,24.8,8.5,25,9,25c0.5,0,1-0.2,1.4-0.6l5.5-5.5l5.5,5.5c0.8,0.8,2.1,0.8,2.8,0c0.8-0.8,0.8-2.1,0-2.8L18.8,16z"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TimeTrackerView;
