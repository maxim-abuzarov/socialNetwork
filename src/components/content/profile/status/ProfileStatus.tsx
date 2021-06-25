import React, {ChangeEvent, FC, useEffect, useState} from 'react'

type PropsType = {
    status: string
    isOwner: boolean
    updateStatus: (status: string) => void
}

const ProfileStatus: FC<PropsType> = (props) => {
    const [editMode, setEditMode] = useState(false)
    const [status, setStatus] = useState(props.status)

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const activateEditMode = () => {
        if (props.isOwner) {
            setEditMode(true)
        }
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }

    const handleFocus = (e: ChangeEvent<HTMLInputElement>) => {
        e.target.select()
    }

    return (
        <div>
            {editMode
                ?   <div> <input onBlur={deactivateEditMode}
                                 autoFocus={true}
                                 onFocus={handleFocus}
                                 onChange={onStatusChange}
                                 value={status} />
                    </div>
                :   <div onClick={activateEditMode}> {props.status
                            ? props.status
                            : 'There could be a status here, but...'}
                    </div>
            }
        </div>
    )
}

export default ProfileStatus
