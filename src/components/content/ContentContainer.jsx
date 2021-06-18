import React from 'react';
import Content from "./Content";
import {connect} from "react-redux";
import {getStatus, getUserProfile, updateStatus} from "../../redux/reducers/profileReducer";
import {withRouter} from 'react-router-dom';
import {compose} from "redux";

class ContentContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.match.params.userId;
        // todo custom userid
        if (!userId) {
            userId = 17108;
        }
        this.props.getUserProfile(userId)
        this.props.getStatus(userId)
    }

    render() {
        return <Content {...this.props} profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateStatus} />
    }
}

const mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status
    }
}

export default compose(
    withRouter,
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus}),
)(ContentContainer);
