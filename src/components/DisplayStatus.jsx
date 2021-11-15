import React, { useEffect, useState } from 'react'
import { Box, Heading } from 'grommet';
import { STATUS } from '../Consts'

function DisplayStatus(props) {
    const { status, getPercent } = props
    const [textColor, settextColor] = useState('neutral-1')
    useEffect(() => {
        console.log(status);
        switch (status) {
            case STATUS.STARTED:
                settextColor('status-ok')
                break;
            case STATUS.STOPPED:
                settextColor('status-critical')
                break;
            case STATUS.PAUSED:
                settextColor('status-warning')
                break;

            default:
                settextColor('status-warning')
                break;
        }

    }, [status])

    return (
        <Box direction="column" gap="medium" pad="medium" justify="center">
            <Heading margin="none" alignSelf="center" level="3" color={textColor}>{status}</Heading>
            <Heading margin="none" alignSelf="center">{getPercent()}%</Heading>
        </Box>
    )
}

export default DisplayStatus
