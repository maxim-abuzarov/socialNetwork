import './App.css'
import {Route} from 'react-router-dom';
import Header from "./components/header/Header";
import Content from "./components/content/Content";
import Footer from "./components/footer/Footer";
import MessagesContainer from "./components/messages/MessagesContainer";
import NavigationContainer from "./components/navigation/NavigationContainer";
import UsersContainer from "./components/users/UsersContainer";

function App() {
    return (
        <div className='app-wrapper'>
            <Header />
            <NavigationContainer />
            <div className='app-content'>
                <Route path='/profile' render={ () => <Content /> }/>
                <Route path='/messages' render={ () => <MessagesContainer /> }/>
                <Route path='/users' render={ () => <UsersContainer /> }/>
            </div>
            <Footer />
        </div>
    );
}

export default App;
