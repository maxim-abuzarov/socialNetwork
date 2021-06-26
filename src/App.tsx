import React, {ComponentType, FC} from 'react'
import {compose} from 'redux'
import {BrowserRouter, Redirect, Route, Switch, withRouter} from 'react-router-dom'
import {connect, Provider} from 'react-redux'
import {initializeApp} from './redux/reducers/appReducer'
import {withSuspense} from './hoc/withSuspense'
import './App.css'
import Footer from './components/footer/Footer'
import NavigationContainer from './components/navigation/NavigationContainer'
import ContentContainer from './components/content/ContentContainer'
import HeaderContainer from './components/header/HeaderContainer'
import Loading from './components/common/loading/Loading'
import Error from './components/common/error/Error'
import store, {AppStateType} from './redux/store'

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    initializeApp: () => void
}

// components for lazy loading
const MessagesContainer = React.lazy(() => import('./components/messages/MessagesContainer'))
const UsersContainer = React.lazy(() => import('./components/users/UsersContainer'))
const LoginPage = React.lazy(() => import('./components/login/Login'))

const SuspendedMessagesPage = withSuspense(MessagesContainer)
const SuspendedUsersPage = withSuspense(UsersContainer)
const SuspendedLoginPage = withSuspense(LoginPage)

class App extends React.Component<MapPropsType & DispatchPropsType> {
    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        if (!this.props.initialized) {
            return <Loading />
        }

        return (
            <div className='app-wrapper'>
                <HeaderContainer />
                {this.props.error && <Error errorMessage={this.props.errorMessage}/>}
                <NavigationContainer />
                <div className='app-content'>
                    <Switch>
                        <Route exact path='/' render={ () => <Redirect to='/profile' />} />
                        <Route path='/profile/:userId?' render={ () => <ContentContainer /> }/>
                        <Route path='/messages' render={ () => <SuspendedMessagesPage />}/>
                        <Route path='/users' render={ () => <SuspendedUsersPage />}/>
                        <Route path='/login' render={ () => <SuspendedLoginPage />}/>
                        <Route path='*' render={ () => <div className='page404'>404 :(</div> }/>
                    </Switch>
                </div>
                <Footer />
            </div>
        )
    }
}

const mapStateToProps = (state: AppStateType) => {
    return {
        initialized: state.app.initialized,
        error: state.error.error,
        errorMessage: state.error.errorMessage
    }
}

const AppContainer =  compose<ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeApp})
) (App)

const SocialNetworkApp: FC = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <AppContainer/>
            </Provider>
        </BrowserRouter>
    )
}

export default SocialNetworkApp
