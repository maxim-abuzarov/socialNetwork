import {Redirect} from 'react-router-dom'
import React, {ComponentType, FC} from 'react'
import {connect} from 'react-redux'
import {AppStateType} from '../redux/store'

type MapPropsType = {
    isAuth: boolean
}
type DispatchPropsType = {}

let mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth
})

export function withAuthRedirect<WCP>(WrappedComponent: ComponentType<WCP>) {
    const RedirectComponent: FC<MapPropsType> = (props) => {
        const {isAuth, ...restProps} = props
        if (!isAuth) return <Redirect to='/login'/>

        return <WrappedComponent {...restProps as WCP} />
    }

    return connect<MapPropsType, DispatchPropsType, WCP, AppStateType>(mapStateToProps, {}) (RedirectComponent)
}
