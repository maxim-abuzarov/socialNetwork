import React from 'react';
import Content from "./Content";
import * as axios from "axios";
import {connect} from "react-redux";
import {setUserProfile} from "../../redux/reducers/profileReducer";
import {withRouter} from 'react-router-dom';

class ContentContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.match.params.userId;
        // todo custom userid
        if (!userId) {
            userId = 17108;
        }
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId)
            .then(response => {
                this.props.setUserProfile(response.data)
            });
    }

    render() {
        return <Content {...this.props} profile={this.props.profile} />
    }
}

const mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
    }
}

let withUrlDataContainer = withRouter(ContentContainer);

export default connect(mapStateToProps,
    {setUserProfile}
) (withUrlDataContainer);
