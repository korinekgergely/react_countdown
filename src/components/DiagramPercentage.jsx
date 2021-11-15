import React from 'react'
import { Meter } from 'grommet';

function DiagramPercentage(props) {
    const { getPercent } = props

    return (
        <Meter
            type="circle"
            thickness="medium"
            size="small"
            background="status-ok"
            color="status-ok"
            values={[
                {
                    value: getPercent(),
                    label: 'sixty',
                },
            ]}
            aria-label="meter"
        />
    )
}

export default DiagramPercentage
