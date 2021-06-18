import React from 'react';

class ProfileStatus extends React.Component {
    state = {
        editMode: false,
        status: this.props.status,
    }

    onStatusChange = (e) => {
        this.setState({
            status: e.currentTarget.value,
        })
    }

    activateEditMode = () => {
        this.setState({
            editMode: true,
        })
    }

    deactivateEditMode = () => {
        this.setState({
            editMode: false,
        })
        this.props.updateStatus(this.state.status)
    }

    handleFocus = (e) => {
        e.target.select()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }

    render() {
        return (
            <div>
                {this.state.editMode
                    ?   <div> <input onChange={this.onStatusChange} onFocus={this.handleFocus} autoFocus={true} onBlur={this.deactivateEditMode} value={this.state.status}/> </div>
                    :   <div onClick={this.activateEditMode}> {this.props.status ? this.props.status : 'There could be a status here, but...'} </div>
                }
            </div>
        );
    }
}

export default ProfileStatus;
