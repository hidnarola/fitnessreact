import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reset, initialize } from "redux-form";
import ProfilePhotoBlock from './ProfilePhotoBlock';
import AddProgressPhotoModal from '../Common/AddProgressPhotoModal';
import {
    addUserProgressPhotoRequest,
    getUserLatestProgressPhotoRequest
} from '../../actions/userProgressPhotos';
import { ts } from '../../helpers/funs';
import { FRIENDSHIP_STATUS_SELF } from '../../constants/consts';

class ProfilePhotos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            progressPhotos: [],
            showAddProgressPhotoModal: false,
            saveProgressPhotoActionInit: false,
            initProgressPhotosAction: false,
            progressPhotos: [],
            doLoadProgressPhotos: false,
        }
    }

    componentWillMount() {
        const {
            dispatch,
            profile
        } = this.props;
        if (profile && Object.keys(profile).length > 0) {
            var username = profile.username;
            this.setState({
                initProgressPhotosAction: true,
            });
            dispatch(getUserLatestProgressPhotoRequest(username));
        } else {
            this.setState({ doLoadProgressPhotos: true });
        }
    }

    render() {
        const {
            galleryPhotos,
            profile
        } = this.props;
        const {
            progressPhotos,
            showAddProgressPhotoModal
        } = this.state;
        return (
            <div className="profilePhotosComponentWrapper">
                <div className="white-box space-btm-20">
                    <div className="whitebox-head profile-head d-flex">
                        <h3 className="title-h3 size-14">Progress Photos</h3>
                        {profile && profile.friendshipStatus && profile.friendshipStatus === FRIENDSHIP_STATUS_SELF &&
                            <div className="whitebox-head-r">
                                <a href="javascript:void(0)" onClick={this.handleShowAddProgressPhotoModal}>
                                    <span>Add Progress Photo</span>
                                    <i className="icon-add_a_photo"></i>
                                </a>
                            </div>
                        }
                    </div>
                    <div className="whitebox-body profile-body">
                        {!progressPhotos &&
                            <span>No progress image</span>
                        }
                        {progressPhotos && progressPhotos.length <= 0 &&
                            <span>No progress image</span>
                        }
                        {progressPhotos && progressPhotos.length > 0 &&
                            <ul className="d-flex profile-list-ul">
                                {progressPhotos.map((photo, index) => (
                                    <li key={index}>
                                        <ProfilePhotoBlock image={photo.image} caption={photo.date} />
                                    </li>
                                ))}
                            </ul>
                        }
                    </div>
                </div>

                <div className="white-box space-btm-20">
                    <div className="whitebox-head profile-head d-flex ">
                        <h3 className="title-h3 size-14">Photos Gallery</h3>
                        <div className="whitebox-head-r">
                            <a href="" data-toggle="modal" data-target="#photo-gallery">
                                <span>Add Gallery Photo</span>
                                <i className="icon-add_a_photo"></i>
                            </a>
                        </div>
                    </div>
                    <div className="whitebox-body profile-body">
                        {!galleryPhotos &&
                            <span>No progress image</span>
                        }
                        {galleryPhotos && galleryPhotos.length <= 0 &&
                            <span>No progress image</span>
                        }
                        {galleryPhotos && galleryPhotos.length > 0 &&
                            <ul className="d-flex profile-list-ul">
                                {galleryPhotos.map((photo, index) => (
                                    <li key={index}>
                                        <ProfilePhotoBlock image={photo.image} caption={photo.logDate} />
                                    </li>
                                ))}
                            </ul>
                        }
                    </div>
                </div>

                <AddProgressPhotoModal
                    onSubmit={this.handleProgressPhotoSubmit}
                    show={showAddProgressPhotoModal}
                    handleClose={this.handleCloseAddProgressPhotoModal}
                />
            </div>
        );
    }

    componentWillReceiveProps(nextProps) {
        const {
            profile,
            dispatch,
        } = nextProps;
        const {
            doLoadProgressPhotos,
        } = this.state;
        if ((doLoadProgressPhotos) && profile && Object.keys(profile).length > 0) {
            var username = profile.username;
            this.setState({
                initProgressPhotosAction: true,
            });
            dispatch(getUserLatestProgressPhotoRequest(username));
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const {
            initProgressPhotosAction,
            saveProgressPhotoActionInit,
        } = this.state;
        const {
            progressPhotoloading,
            progressPhotos,
            dispatch,
            profile
        } = this.props;
        const progressPhotosState = this.state.progressPhotos;
        if (initProgressPhotosAction && !progressPhotoloading && (progressPhotosState !== progressPhotos)) {
            this.setState({
                initProgressPhotosAction: false,
                progressPhotos,
                doLoadProgressPhotos: false,
            });
        }
        if (saveProgressPhotoActionInit && !progressPhotoloading) {
            this.setState({ saveProgressPhotoActionInit: false });
            ts('Progress photo saved successfully!');
            this.handleCloseAddProgressPhotoModal();
            if (profile && Object.keys(profile).length > 0) {
                var username = profile.username;
                this.setState({
                    initProgressPhotosAction: true,
                });
                dispatch(getUserLatestProgressPhotoRequest(username));
            }
        }
    }
    //#region funs
    handleShowAddProgressPhotoModal = () => {
        const { dispatch } = this.props;
        this.setState({ showAddProgressPhotoModal: true });
        dispatch(reset('addProgressPhotoModalForm'));
        var now = new Date();
        now.setHours(0, 0, 0, 0);
        var initialFormData = {
            photo_date: now,
        }
        dispatch(initialize('addProgressPhotoModalForm', initialFormData));
    }

    handleCloseAddProgressPhotoModal = () => {
        const { dispatch } = this.props;
        this.setState({ showAddProgressPhotoModal: false });
        dispatch(reset('addProgressPhotoModalForm'));
        var now = new Date();
        now.setHours(0, 0, 0, 0);
        var initialFormData = {
            photo_date: now,
        }
        dispatch(initialize('addProgressPhotoModalForm', initialFormData));
    }

    handleProgressPhotoSubmit = (data) => {
        const { dispatch } = this.props;
        this.setState({ saveProgressPhotoActionInit: true });
        var formData = new FormData();
        formData.append('description', (data.description) ? data.description : '');
        formData.append('date', data.photo_date);
        if (data.photo) {
            formData.append('image', data.photo[0]);
        }
        dispatch(addUserProgressPhotoRequest(formData));
    }
    //#endregion
}

const mapStateToProps = (state) => {
    const { userProgressPhotos } = state;
    return {
        progressPhotoloading: userProgressPhotos.get('loading'),
        progressPhotos: userProgressPhotos.get('progressPhotos'),
    }
}

export default connect(mapStateToProps)(ProfilePhotos);