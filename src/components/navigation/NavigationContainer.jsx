import {connect} from "react-redux";
import Navigation from "./Navigation";

const mapStateToProps = (state) => {
    return {
        friends: state.aside.friendsData,
    }
}

const NavigationContainer = connect(mapStateToProps) (Navigation);

export default NavigationContainer;
