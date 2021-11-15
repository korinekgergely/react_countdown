import React from 'react'
import { Text } from 'grommet';

function ErrorMessage(props) {
    const { errorMessage } = props
    return (
        <Text color="status-error" size="large">{errorMessage}</Text>
        )
}

export default ErrorMessage
