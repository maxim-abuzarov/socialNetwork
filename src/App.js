import './App.css'
import {Route} from 'react-router-dom';
import Header from "./components/header/Header";
import Navigation from "./components/navigation/Navigation";
import Content from "./components/content/Content";
import Messages from "./components/messages/Messages";
import Footer from "./components/footer/Footer";

function App(props) {
    return (
        <div className='app-wrapper'>
            <Header />
            <Navigation friendsList={props.state.asideFriends.friendsData}/>
            <div className='app-content'>
                <Route path='/profile' render={ () => <Content
                    postsData={props.state.profilePage.postsData}/>
                }/>
                <Route path='/messages' render={ () => <Messages
                    messagesData={props.state.messagesPage.messagesData}
                    friendsData={props.state.messagesPage.friendsData}/>
                }/>
            </div>
            <Footer />
        </div>
    );
}

export default App;
