import React from 'react'
import Header, {DispatchPropsTypes, MapPropsTypes} from './Header'
import {connect} from 'react-redux'
import {logout} from '../../redux/reducers/authReducer'
import {AppStateType} from '../../redux/store'

class HeaderContainer extends React.Component<MapPropsTypes & DispatchPropsTypes> {
    render() {
        return <Header {...this.props} />
    }
}

const mapStateToProps = (state: AppStateType) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login
    }
}

export default connect(mapStateToProps,
    {logout}
) (HeaderContainer)
