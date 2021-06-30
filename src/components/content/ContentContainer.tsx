import React, {ComponentType} from 'react'
import Content from './Content'
import {connect} from 'react-redux'
import {getStatus, getUserProfile, savePhoto, saveProfileData, updateStatus} from '../../redux/reducers/profileReducer'
import {RouteComponentProps, withRouter} from 'react-router-dom'
import {compose} from 'redux'
import {AppStateType} from '../../redux/store'
import {ProfileType} from '../../types/types'
import {follow, isFollowedUser, unfollow} from '../../redux/reducers/usersReducer'

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    getUserProfile: (userId: number) => void
    getStatus: (userId: number) => void
    updateStatus: (text: string) => void
    savePhoto: (file: File) => void
    saveProfileData: (profile: ProfileType) => Promise<any>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    isFollowedUser: (userId: number) => void
}
type PathParamsType = {
    userId: string
}
type PropsType = MapPropsType & DispatchPropsType & RouteComponentProps<PathParamsType>

class ContentContainer extends React.Component<PropsType> {
    refreshProfile() {
        let userId: number | null = +this.props.match.params.userId
        if (!userId) {
            userId = this.props.authorizedUserId

            if (!userId) {
                this.props.history.push('/login')
            }
        }
        this.props.getUserProfile(userId as number)
        this.props.isFollowedUser(userId as number)
        this.props.getStatus(userId as number)
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: PropsType, prevState: PropsType) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }

    render() {
        return <Content
            {...this.props}
            profile={this.props.profile}
            saveProfileData={this.props.saveProfileData}
            savePhoto={this.props.savePhoto}
            isOwner={!this.props.match.params.userId}
            status={this.props.status}
            updateStatus={this.props.updateStatus}
            isFollow={this.props.isFollow}
            follow={this.props.follow}
            unfollow={this.props.unfollow}
            authorizedUserId={this.props.authorizedUserId}
        />
    }
}

const mapStateToProps = (state: AppStateType) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedUserId: state.auth.userId,
        isAuth: state.auth.isAuth,
        isFollow: state.usersPage.isFollow,
    }
}

export default compose<ComponentType>(
    withRouter,
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus, savePhoto, saveProfileData, follow, unfollow, isFollowedUser})
)(ContentContainer)
