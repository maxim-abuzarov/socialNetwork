import './App.css'
import {Route, withRouter} from 'react-router-dom';
import React from "react";
import Footer from "./components/footer/Footer";
import NavigationContainer from "./components/navigation/NavigationContainer";
import ContentContainer from "./components/content/ContentContainer";
import HeaderContainer from "./components/header/HeaderContainer";
import {connect} from "react-redux";
import {compose} from "redux";
import Loading from "./components/common/loading/Loading";
import {initializeApp} from "./redux/reducers/appReducer";
import {withSuspense} from "./hoc/withSuspense";

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
                <NavigationContainer />
                <div className='app-content'>
                    <Route path='/profile/:userId?' render={ () => <ContentContainer /> }/>
                    <Route path='/messages' render={withSuspense(MessagesContainer)}/>
                    <Route path='/users' render={withSuspense(UsersContainer)}/>
                    <Route path='/login' render={withSuspense(LoginPage)}/>
                </div>
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        initialized: state.app.initialized,
    }
}

export default compose(
    withRouter,
    connect(mapStateToProps, {initializeApp}))
(App);
