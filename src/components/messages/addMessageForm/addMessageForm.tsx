import React, {FC} from 'react'
import {Field, FormAction, InjectedFormProps, reduxForm, reset} from 'redux-form'
import {Textarea} from '../../common/formsControl/FormsControl'
import {maxLengthCreator, requiredField} from '../../../utils/validators/validators'
import {NewMessageValuesFormType} from '../Messages'

type PropsType = {}

const maxLength300 = maxLengthCreator(300) // create validator of max length
const afterSubmit = (result: any, dispatch: (arg0: FormAction) => any) => dispatch(reset('messagesAddMessageForm'))

export const MessageForm: FC<InjectedFormProps<NewMessageValuesFormType, PropsType> & PropsType> = ({handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit}>
            <Field component={Textarea} validate={[requiredField, maxLength300]} name='newMessageText'
                   placeholder='Write message to your friend'/>
            <button>Send</button>
        </form>
    )
}

export const AddMessageForm = reduxForm<NewMessageValuesFormType, PropsType>({form: 'messagesAddMessageForm', onSubmitSuccess: afterSubmit})(MessageForm)
