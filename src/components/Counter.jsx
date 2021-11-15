import React, { useEffect, useState, useRef } from 'react';
import { Grommet, Main } from 'grommet';
import { STATUS } from '../Consts'
import HandleButtons from './HandleButtons';
import FormTimeInput from './FormTimeInput';
import DiagramPercentage from './DiagramPercentage';
import DisplayInfo from './DisplayInfo';
import DisplayStatus from './DisplayStatus';
import HeaderInfo from './HeaderInfo';
import ErrorMessage from './ErrorMessage';
import { ERROR } from '../ErrorMessagesConst'

let secondsAll = null;
const changeSecondsAll = (secondsAll, newValue) => {
    return newValue
}
function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

function Counter() {
    const [secondsRemaining, setSecondsRemaining] = useState(null);
    const [secondsElapsed, setSecondsElapsed] = useState(0);
    const [errorMessage, seterrorMessage] = useState('');
    const [formValues, setformValues] = useState({ hours: 0, mins: 0, sec: 0 });
    const [status, setStatus] = useState(STATUS.STOPPED);

    const secondsToDisplay = secondsRemaining % 60;
    const minutesRemaining = (secondsRemaining - secondsToDisplay) / 60;
    const minutesToDisplay = minutesRemaining % 60;
    const hoursToDisplay = (minutesRemaining - minutesToDisplay) / 60;

    const getPercent = () => {
        if (secondsRemaining && secondsAll) {
            return Math.floor((secondsRemaining / secondsAll) * 100);
        }
        return 0;
    };

    const resetCounter = (s) => {
        const { hours, mins, sec } = formValues;
        seterrorMessage('')

        if (isNaN(hours)) {
            seterrorMessage(ERROR.HOURS)
            return
        }
        if (isNaN(mins)) {
            seterrorMessage(ERROR.MINUTES)
            return
        }
        if (isNaN(sec)) {
            seterrorMessage(ERROR.SECONDS)
            return
        }

        secondsAll = parseInt(hours * 3600) + parseInt(mins * 60) + parseInt(sec);
        setSecondsRemaining(secondsAll);
        setStatus(s);
    };

    const handleStart = () => {
        resetCounter(STATUS.STARTED);
    };
    const handlePause = () => {
        if (!secondsAll) {
            handleStart();
            return;
        }
        if (status === STATUS.STOPPED || status === STATUS.PAUSED) {
            setStatus(STATUS.STARTED);
        }
        if (status === STATUS.STARTED) {
            setStatus(STATUS.PAUSED);
        }
    };
    const handleStop = () => {
        resetCounter(STATUS.STOPPED);
        setSecondsElapsed(0);
        secondsAll = null
    };

    useInterval(
        () => {
            if (secondsRemaining > 0) {
                setSecondsRemaining(secondsRemaining - 1);
                setSecondsElapsed(secondsElapsed + 1);
            } else {
                setStatus(STATUS.STOPPED);
                secondsAll = null
            }
        },
        status === STATUS.STARTED ? 1000 : null
        // passing null stops the interval
    );

    return (
        <Grommet>
            <Main pad="large">
                <div className="App">
                    <HeaderInfo />
                    <DiagramPercentage
                        getPercent={getPercent}
                    />
                    <DisplayStatus
                        status={status}
                        getPercent={getPercent} />
                    {status === STATUS.STOPPED &&
                        <FormTimeInput
                            status={status}
                            formValues={formValues}
                            setformValues={setformValues}
                            secondsAll={secondsAll}
                            changeSecondsAll={changeSecondsAll}
                        />
                    }
                    <ErrorMessage
                        errorMessage={errorMessage} />
                    {status !== STATUS.STOPPED &&
                        <DisplayInfo
                            hoursToDisplay={hoursToDisplay}
                            minutesToDisplay={minutesToDisplay}
                            secondsToDisplay={secondsToDisplay}
                            secondsElapsed={secondsElapsed}
                        />
                    }
                    <HandleButtons
                        status={status}
                        handleStart={handleStart}
                        handlePause={handlePause}
                        handleStop={handleStop}
                        secondsAll={secondsAll} />
                </div>
            </Main>
        </Grommet >
    );
}

export default Counter
