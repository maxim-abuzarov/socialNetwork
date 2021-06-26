import React, {FC} from 'react'
import formControlClasses from './formscontol.module.css'
import {WrappedFieldProps} from 'redux-form'

export const Textarea: FC<WrappedFieldProps> = ({input, meta, ...props}) => {
    const hasError = meta.touched && meta.error

    return (
        <div className={formControlClasses.formControl + ' ' + (hasError ? formControlClasses.error : '')}>
            <textarea {...input} {...props} />
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}

export const Input: FC<WrappedFieldProps> = ({input, meta, ...props}) => {
    const hasError = meta.touched && meta.error

    return (
        <div className={formControlClasses.formControl + ' ' + (hasError ? formControlClasses.error : '')}>
            <input {...input} {...props} />
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}
