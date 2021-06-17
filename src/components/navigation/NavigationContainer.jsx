import React from "react";
import {connect} from "react-redux";
import Navigation from "./Navigation";
import {getFriends, toggleIsLoading} from "../../redux/reducers/asideReducer";
import * as axios from "axios";

class NavigationContainer extends React.Component {
    //todo friends TRUE
    componentDidMount() {
        if (this.props.friends.length === 0) {
            this.props.toggleIsLoading(true);
            axios.get(`https://social-network.samuraijs.com/api/1.0/users?friend=false`)
                .then(response => {
                    this.props.toggleIsLoading(false);
                    this.props.getFriends(response.data.items)
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
