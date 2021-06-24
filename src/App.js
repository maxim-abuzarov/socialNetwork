import React from "react";
import {compose} from "redux";
import {Redirect, Route, withRouter, Switch} from 'react-router-dom';
import {connect} from "react-redux";
import {initializeApp} from "./redux/reducers/appReducer";
import {withSuspense} from "./hoc/withSuspense";
import './App.css'
import Footer from "./components/footer/Footer";
import NavigationContainer from "./components/navigation/NavigationContainer";
import ContentContainer from "./components/content/ContentContainer";
import HeaderContainer from "./components/header/HeaderContainer";
import Loading from "./components/common/loading/Loading";
import Error from "./components/common/error/Error";

// components for lazy loading
const MessagesContainer = React.lazy(() => import('./components/messages/MessagesContainer'));
const UsersContainer = React.lazy(() => import('./components/users/UsersContainer'));
const LoginPage = React.lazy(() => import('./components/login/Login'));

class App extends React.Component {
    componentDidMount() {
        this.props.initializeApp();
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
                        <Route path='/messages' render={withSuspense(MessagesContainer)}/>
                        <Route path='/users' render={withSuspense(UsersContainer)}/>
                        <Route path='/login' render={withSuspense(LoginPage)}/>
                        <Route path='*' render={ () => <div className='page404'>404 :(</div>}/>
                    </Switch>
                </div>
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        initialized: state.app.initialized,
        error: state.error.error,
        errorMessage: state.error.errorMessage,
    }
}

export default compose(
    withRouter,
    connect(mapStateToProps, {initializeApp}))
(App);
