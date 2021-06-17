import React from "react";
import {connect} from "react-redux";
import Navigation from "./Navigation";
import {getFriends, toggleIsLoading} from "../../redux/reducers/asideReducer";
import {usersAPI} from "../../api/api";

class NavigationContainer extends React.Component {
    componentDidMount() {
        if (this.props.friends.length === 0) {
            this.props.toggleIsLoading(true);
            usersAPI.getFriends()
                .then(data => {
                    this.props.toggleIsLoading(false);
                    this.props.getFriends(data.items)
                });
        }
    }

    render() {
        return <Navigation friends={this.props.friends} isLoading={this.props.isLoading} />
    }
}

const mapStateToProps = (state) => {
    return {
        friends: state.aside.friends,
        isLoading: state.aside.isLoading,

    }
}

export default connect(mapStateToProps,
    {getFriends, toggleIsLoading}
) (NavigationContainer);
