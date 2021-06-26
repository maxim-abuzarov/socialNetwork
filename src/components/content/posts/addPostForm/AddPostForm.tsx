import {maxLengthCreator, requiredField} from '../../../../utils/validators/validators'
import {Field, FormAction, InjectedFormProps, reduxForm, reset} from 'redux-form'
import {Textarea} from '../../../common/formsControl/FormsControl'
import React, {FC} from 'react'
import { NewPostValuesFormType } from '../Posts'

type PropsType = {}

const maxLength30 = maxLengthCreator(30) // create validator of max length
const afterSubmit = (result: any, dispatch: (arg0: FormAction) => any) => dispatch(reset('postForm'))

const PostForm: FC<InjectedFormProps<NewPostValuesFormType, PropsType> & PropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field name='newPostText' component={Textarea} placeholder='Add your post' validate={[requiredField, maxLength30]} />
            <div><button>Add</button></div>
        </form>
    )
}

export const AddPostForm = reduxForm<NewPostValuesFormType, PropsType>({form: 'postForm', onSubmitSuccess: afterSubmit})(PostForm)
