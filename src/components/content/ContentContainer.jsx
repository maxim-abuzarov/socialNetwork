import React from 'react';
import Content from "./Content";
import {connect} from "react-redux";
import {getStatus, getUserProfile, savePhoto, saveProfileData, updateStatus} from "../../redux/reducers/profileReducer";
import {withRouter} from 'react-router-dom';
import {compose} from "redux";

class ContentContainer extends React.Component {
    refreshProfile() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId;

            if (!userId) {
                this.props.history.push('/login')
            }
        }
        this.props.getUserProfile(userId)
        this.props.getStatus(userId)
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }

    render() {
        return <Content {...this.props} profile={this.props.profile} saveProfileData={this.props.saveProfileData} savePhoto={this.props.savePhoto} isOwner={!this.props.match.params.userId} status={this.props.status} updateStatus={this.props.updateStatus} />
    }
}

const mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedUserId: state.auth.userId,
        isAuth: state.auth.isAuth,
    }
}

export default compose(
    withRouter,
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus, savePhoto, saveProfileData}),
)(ContentContainer);
