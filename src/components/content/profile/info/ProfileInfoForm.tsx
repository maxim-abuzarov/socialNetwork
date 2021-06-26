import React, {FC} from 'react'
import {Input, Textarea} from '../../../common/formsControl/FormsControl'
import {Field, InjectedFormProps, reduxForm} from 'redux-form'
import formControlClasses from '../../../common/formsControl/formscontol.module.css'
import profileClasses from '../profile.module.css'
import {ProfileType} from '../../../../types/types'

type PropsType = {
    profile: ProfileType
}

const ProfileInfoForm: FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = ({
                                                                                        handleSubmit,
                                                                                        profile,
                                                                                        error
}) => {
    return (
        <form onSubmit={handleSubmit} className={profileClasses.data}>
            <div className={profileClasses.dataItemName}>
                <h1>Full Name:</h1>
                <Field component={Input} name='fullName' placeholder='Full Name' className={profileClasses.field} />
            </div>

            <div className={profileClasses.dataItemCheck}>
                <h1>Looking for a job:</h1>
                <Field component={Input} name='lookingForAJob' type='checkbox'/>
            </div>

            <div className={profileClasses.dataItemField}>
                <h1>Professional skills:</h1>
                <Field component={Textarea} name='lookingForAJobDescription' placeholder='Professional skills' className={profileClasses.fieldText} />
            </div>

            <div className={profileClasses.dataItemField}>
                <h1>About me:</h1>
                <Field component={Textarea} name='aboutMe' placeholder='About me' className={profileClasses.fieldText} />
            </div>

            <div className={profileClasses.dataItemContacts}>
                <h1>Contacts:</h1>
                {Object.keys(profile.contacts).map(key => {
                    return <div key={key} className={profileClasses.contacts}>
                        <h2>{key}:</h2>
                        <Field component={Input} name={'contacts.' + key} placeholder={key} className={profileClasses.social}/>
                    </div>
                })}
            </div>

            {error && <div className={formControlClasses.formSummaryError}>{error}</div>}

            <div className={profileClasses.button}>
                <button>Save</button>
            </div>
        </form>
    )
}

export default reduxForm<ProfileType, PropsType>({form: 'editProfile'})(ProfileInfoForm)
