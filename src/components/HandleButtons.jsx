import React from 'react'
import { Button, Box, } from 'grommet';
import { Play, Pause, Stop } from 'grommet-icons';
import { STATUS } from '../Consts'

function HandleButtons(props) {
    const { status, handleStart, handlePause, handleStop, secondsAll } = props
    return (
        <Box direction="row" gap="medium" pad="medium" justify="center">
            {status === STATUS.STOPPED && (
                <Button
                    primary
                    onClick={handleStart}
                    type="button"
                    disabled={status === STATUS.STARTED}
                    icon={<Play size="large" color="white" />}
                />
            )}
            {(status === STATUS.STARTED || status === STATUS.PAUSED) && (
                <Button
                    primary
                    onClick={handlePause}
                    type="button"
                    icon={<Pause size="large" color="white" />}
                />
            )}
            <Button
                primary
                onClick={handleStop}
                type="button"
                disabled={status === STATUS.STOPPED || !secondsAll}
                icon={<Stop size="large" color="white" />}
            />
        </Box>
    )
}

export default HandleButtons
