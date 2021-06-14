import './App.css'
import {Route} from 'react-router-dom';
import Header from "./components/header/Header";
import Navigation from "./components/navigation/Navigation";
import Content from "./components/content/Content";
import Messages from "./components/messages/Messages";
import Footer from "./components/footer/Footer";

function App() {
    return (
        <div className='app-wrapper'>
            <Header />
            <Navigation />
            <div className='app-content'>
                <Route path='/profile' component={Content} />
                <Route path='/messages' component={Messages} />
            </div>
            <Footer />
        </div>
    );
}

export default App;
