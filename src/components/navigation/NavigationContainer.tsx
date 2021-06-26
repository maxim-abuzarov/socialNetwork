import React from 'react'
import {connect} from 'react-redux'
import Navigation from './Navigation'
import {getFriendsList} from '../../redux/reducers/asideReducer'
import {AppStateType} from '../../redux/store'

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    getFriendsList: () => void
}
type PropsTypes = MapPropsType & DispatchPropsType

class NavigationContainer extends React.Component<PropsTypes> {
    componentDidMount() {
        this.props.getFriendsList()
    }

    render() {
        return <Navigation friends={this.props.friends} isLoading={this.props.isLoading} />
    }

    componentDidUpdate(prevProps:PropsTypes, prevState: PropsTypes) {
        if (this.props.friends !== prevProps.friends) {
        }
    }
}

const mapStateToProps = (state: AppStateType) => {
    return {
        friends: state.aside.friends,
        isLoading: state.aside.isLoading
    }
}

export default connect(mapStateToProps,
    {getFriendsList}
) (NavigationContainer)
