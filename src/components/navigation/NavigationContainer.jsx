import React from "react";
import {connect} from "react-redux";
import Navigation from "./Navigation";
import {getFriendsList} from "../../redux/reducers/asideReducer";

class NavigationContainer extends React.Component {
    componentDidMount() {
        this.props.getFriendsList()
    }

    render() {
        return <Navigation friends={this.props.friends} isLoading={this.props.isLoading} />
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.friends !== prevProps.friends) {

        }
    }
}

const mapStateToProps = (state) => {
    return {
        friends: state.aside.friends,
        isLoading: state.aside.isLoading,
    }
}

export default connect(mapStateToProps,
    {getFriendsList}
) (NavigationContainer);
