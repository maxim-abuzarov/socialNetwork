import './App.css'
import Header from "./components/header/Header";
import Navigation from "./components/navigation/Navigation";
import Content from "./components/content/Content";
import Footer from "./components/footer/Footer";

function App() {
    return (
        <div className='app-wrapper'>
            <Header />
            <Navigation />
            <Content />
            <Footer />
        </div>
    );
}

export default App;
