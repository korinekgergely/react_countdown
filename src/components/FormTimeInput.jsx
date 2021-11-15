import React from 'react'
import { Form, FormField, Box, TextInput, } from 'grommet';
import { STATUS } from '../Consts'

function FormTimeInput(props) {
    const { status, formValues, secondsAll, setformValues, changeSecondsAll } = props
    return (
        <Form
            value={formValues}
            onChange={nextValue => {
                changeSecondsAll(secondsAll, null)
                return setformValues({ ...formValues, ...nextValue })
            }}
        >
            <Box direction="row" gap="medium" pad="medium" justify="center">
                <FormField name="hours" htmlFor="text-input-id" label="hours">
                    <TextInput id="text-input-id" name="hours" disabled={status === STATUS.STARTED || status === STATUS.PAUSED} value={formValues.hours} />
                </FormField>
                <FormField name="mins" htmlFor="text-input-id" label="mins">
                    <TextInput id="text-input-id" name="mins" disabled={status === STATUS.STARTED || status === STATUS.PAUSED} value={formValues.mins} />
                </FormField>
                <FormField name="sec" htmlFor="text-input-id" label="sec">
                    <TextInput id="text-input-id" name="sec" disabled={status === STATUS.STARTED || status === STATUS.PAUSED} value={formValues.sec} />
                </FormField>
            </Box>
        </Form>
    )
}

export default FormTimeInput
