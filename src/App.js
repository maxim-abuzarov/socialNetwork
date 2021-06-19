import './App.css'
import {Route, withRouter} from 'react-router-dom';
import React from "react";
import Footer from "./components/footer/Footer";
import MessagesContainer from "./components/messages/MessagesContainer";
import NavigationContainer from "./components/navigation/NavigationContainer";
import UsersContainer from "./components/users/UsersContainer";
import ContentContainer from "./components/content/ContentContainer";
import HeaderContainer from "./components/header/HeaderContainer";
import Login from "./components/login/Login";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/reducers/appReducer";
import Loading from "./components/common/loading/Loading";


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
                    <Route path='/messages' render={ () => <MessagesContainer /> }/>
                    <Route path='/users' render={ () => <UsersContainer /> }/>
                    <Route path='/login' render={ () => <Login /> }/>
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
