import React, {FC} from 'react'
import errorClasses from './error.module.css'

type PropsType = {
    errorMessage: string | null
}

const Error: FC<PropsType> = ({errorMessage}) => {
    return (
        <div className={errorClasses.error}>
            <p>{errorMessage}</p>
        </div>
    )
}

export default Error
