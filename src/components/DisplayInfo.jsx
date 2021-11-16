import React from 'react'
import { Box, Card, CardHeader, CardBody, Text, Heading } from 'grommet';
import { seconds_to_days_hours_mins_secs_str, twoDigits } from '../utils/SecondsToDisplay'

function DisplayInfo(props) {
    const { hoursToDisplay, minutesToDisplay, secondsToDisplay, secondsElapsed } = props
    return (
        <Box direction="row" gap="medium" pad="medium" justify="center">
            <Card height="small" width="small" background="light-1">
                <CardHeader pad="medium">
                    <Heading margin="none" level="3" textAlign="center">Time remaining</Heading></CardHeader>
                <CardBody pad="medium">
                    <Text color="neutral-1" size="large" textAlign="center">{twoDigits(hoursToDisplay)}:{twoDigits(minutesToDisplay)}:
                        {twoDigits(secondsToDisplay.toFixed(1))}</Text>
                </CardBody>
            </Card>
            <Card height="small" width="small" background="light-1">
                <CardHeader pad="medium">
                    <Heading margin="none" level="3" textAlign="center">Time elapsed</Heading></CardHeader>
                <CardBody pad="medium">
                    <Text color="neutral-4" size="large" textAlign="center">{seconds_to_days_hours_mins_secs_str(secondsElapsed)}</Text>
                </CardBody>
            </Card>
        </Box>
    )
}

export default DisplayInfo
