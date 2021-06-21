import React, {useEffect, useState} from 'react';

const ProfileStatus = (props) => {
    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status);
    }, [props.status])

    const activateEditMode = () => {
        setEditMode(true);
    }

    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    }

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
    }

    const handleFocus = (e) => {
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
                :   <div onClick={activateEditMode} > {props.status
                            ? props.status
                            : 'There could be a status here, but...'}
                    </div>
            }
        </div>
    )
}

export default ProfileStatus;
