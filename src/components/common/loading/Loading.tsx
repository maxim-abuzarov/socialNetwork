import React, {FC} from 'react'
import loadingClasses from './loading.module.css'

const Loading: FC = () => {
    return (
        <div className={loadingClasses.loading}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

export default Loading
