import './App.css'
import {Route} from 'react-router-dom';
import Footer from "./components/footer/Footer";
import MessagesContainer from "./components/messages/MessagesContainer";
import NavigationContainer from "./components/navigation/NavigationContainer";
import UsersContainer from "./components/users/UsersContainer";
import ContentContainer from "./components/content/ContentContainer";
import HeaderContainer from "./components/header/HeaderContainer";
import Login from "./components/login/Login";


function App() {
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

export default App;
