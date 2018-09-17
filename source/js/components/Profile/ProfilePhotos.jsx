import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reset, initialize } from "redux-form";
import ProfilePhotoBlock from './ProfilePhotoBlock';
import AddProgressPhotoModal from '../Common/AddProgressPhotoModal';
import {
    addUserProgressPhotoRequest,
    getUserProgressPhotoRequest,
} from '../../actions/userProgressPhotos';
import { ts } from '../../helpers/funs';
import { FRIENDSHIP_STATUS_SELF, POST_TYPE_GALLERY, SERVER_BASE_URL } from '../../constants/consts';
import AddGalleryPhotoModal from './AddGalleryPhotoModal';
import { addUserGalleryPhotoRequest, getUserGalleryPhotoRequest } from '../../actions/userGalleryPhotos';
import { showPageLoader, hidePageLoader } from '../../actions/pageLoader';
import { FaCircleONotch } from "react-icons/lib/fa";
import NoDataFoundImg from "img/common/no_datafound.png";
import ErrorCloud from "svg/error-cloud.svg";
import Lightbox from 'react-images';
import { Link } from "react-router-dom";
import { routeCodes } from '../../constants/routes';

class ProfilePhotos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            progressPhotos: [],
            galleryPhotos: [],
            showAddProgressPhotoModal: false,
            saveProgressPhotoActionInit: false,
            initProgressPhotosAction: false,
            doLoadProgressPhotos: false,
            showGalleryPhotoModal: false,
            saveGalleryPhotoActionInit: false,
            forceResetGalleryModalState: false,
            initGalleryPhotosAction: false,
            doLoadGalleryPhotos: false,

            lightBoxOpen: false,
            currentImage: 0,
            lightBoxImages: [],
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
                initGalleryPhotosAction: true,
            });
            dispatch(getUserProgressPhotoRequest(username));
            dispatch(getUserGalleryPhotoRequest(username));
        } else {
            this.setState({
                doLoadProgressPhotos: true,
                doLoadGalleryPhotos: true,
            });
        }
    }

    render() {
        const {
            profile,
            progressPhotoloading,
            progressPhotoError,
            galleryPhotoloading,
            galleryPhotoError,
        } = this.props;
        const {
            progressPhotos,
            galleryPhotos,
            showAddProgressPhotoModal,
            showGalleryPhotoModal,
            forceResetGalleryModalState,
            lightBoxOpen,
            currentImage,
            lightBoxImages,
        } = this.state;
        let galleryPhotosArr = [];
        if (galleryPhotos && galleryPhotos.length > 0) {
            galleryPhotos.map((galleryPhoto) => {
                galleryPhoto.images.map((photo) => {
                    galleryPhotosArr.push(photo);
                });
            });
        }
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
                        {progressPhotoloading &&
                            <div className="text-c">
                                <FaCircleONotch className="loader-spinner fs-50" />
                            </div>
                        }
                        {!progressPhotoloading && (!progressPhotos || progressPhotos.length <= 0) && progressPhotoError && progressPhotoError.length <= 0 &&
                            <div className="no-record-found-wrapper">
                                <img src={NoDataFoundImg} />
                            </div>
                        }
                        {!progressPhotoloading && (!progressPhotos || progressPhotos.length <= 0) && progressPhotoError && progressPhotoError.length > 0 &&
                            <div className="server-error-wrapper">
                                <ErrorCloud />
                                <h4>Something went wrong! please try again.</h4>
                            </div>
                        }
                        {!progressPhotoloading && progressPhotos && progressPhotos.length > 0 &&
                            <ul className="d-flex profile-list-ul">
                                {progressPhotos.map((photo, index) => (
                                    <li key={index}>
                                        <ProfilePhotoBlock image={photo.image} caption={photo.date} handleOpenLightbox={this.handleOpenLightbox} index={index} blockFor="progress_photos" />
                                    </li>
                                ))}
                            </ul>
                        }
                        {profile && profile.username && !progressPhotoloading && progressPhotos && progressPhotos.length > 0 &&
                            <Link to={`${routeCodes.PROGRESS_PHOTOS}/${profile.username}`} className="fithub-photos-view-all-link">View All</Link>
                        }
                    </div>
                </div>

                <div className="white-box space-btm-20">
                    <div className="whitebox-head profile-head d-flex ">
                        <h3 className="title-h3 size-14">Photos Gallery</h3>
                        {profile && profile.friendshipStatus && profile.friendshipStatus === FRIENDSHIP_STATUS_SELF &&
                            <div className="whitebox-head-r">
                                <a href="javascript:void(0)" onClick={this.handleShowGalleryPhotoModal}>
                                    <span>Add Gallery Photo</span>
                                    <i className="icon-add_a_photo"></i>
                                </a>
                            </div>
                        }
                    </div>
                    <div className="whitebox-body profile-body">
                        {galleryPhotoloading &&
                            <div className="text-c">
                                <FaCircleONotch className="loader-spinner fs-50" />
                            </div>
                        }
                        {!galleryPhotoloading && (!galleryPhotos || galleryPhotos.length <= 0) && galleryPhotoError && galleryPhotoError.length <= 0 &&
                            <div className="no-record-found-wrapper">
                                <img src={NoDataFoundImg} />
                            </div>
                        }
                        {!galleryPhotoloading && (!galleryPhotos || galleryPhotos.length <= 0) && galleryPhotoError && galleryPhotoError.length > 0 &&
                            <div className="server-error-wrapper">
                                <ErrorCloud />
                                <h4>Something went wrong! please try again.</h4>
                            </div>
                        }
                        {!galleryPhotoloading && galleryPhotos && galleryPhotos.length > 0 &&
                            <ul className="d-flex profile-list-ul">
                                {galleryPhotosArr.map((photo, i) => {
                                    return (
                                        <li key={i}>
                                            <ProfilePhotoBlock image={photo.image} caption={photo.logDate} handleOpenLightbox={this.handleOpenLightbox} index={i} blockFor="gallery_photos" />
                                        </li>
                                    )
                                })}
                            </ul>
                        }
                        {!galleryPhotoloading && galleryPhotos && galleryPhotos.length > 0 &&
                            <Link to={`${routeCodes.GALLERY_PHOTOS}/${profile.username}`} className="fithub-photos-view-all-link">View All</Link>
                        }
                    </div>
                </div>

                <AddProgressPhotoModal
                    onSubmit={this.handleProgressPhotoSubmit}
                    show={showAddProgressPhotoModal}
                    handleClose={this.handleCloseAddProgressPhotoModal}
                />

                <AddGalleryPhotoModal
                    show={showGalleryPhotoModal}
                    handlePost={this.handleGalleryPhotoSubmit}
                    handleClose={this.handleCloseGalleryPhotoModal}
                    doResetState={forceResetGalleryModalState}
                    resetState={this.handleForceResetGalleryModalState}
                />

                {lightBoxImages && lightBoxImages.length > 0 &&
                    <Lightbox
                        images={lightBoxImages}
                        isOpen={lightBoxOpen}
                        onClickPrev={() => this.handleNavigation('prev')}
                        onClickNext={() => this.handleNavigation('next')}
                        onClose={this.handleCloseLightbox}
                        currentImage={currentImage}
                    />
                }
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
            doLoadGalleryPhotos,
        } = this.state;
        if ((doLoadProgressPhotos) && profile && Object.keys(profile).length > 0) {
            var username = profile.username;
            this.setState({
                initProgressPhotosAction: true,
            });
            dispatch(getUserProgressPhotoRequest(username));
        }
        if ((doLoadGalleryPhotos) && profile && Object.keys(profile).length > 0) {
            var username = profile.username;
            this.setState({
                initGalleryPhotosAction: true,
            });
            dispatch(getUserGalleryPhotoRequest(username, 0, 10));
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const {
            initProgressPhotosAction,
            saveProgressPhotoActionInit,
            saveGalleryPhotoActionInit,
            initGalleryPhotosAction,
        } = this.state;
        const {
            progressPhotoloading,
            progressPhotos,
            dispatch,
            profile,
            forceUpdateChildComponents,
            setForceUpdateChildComponents,
            galleryPhotoloading,
            galleryPhotos,
        } = this.props;
        const progressPhotosState = this.state.progressPhotos;
        const galleryPhotosState = this.state.galleryPhotos;
        if (initProgressPhotosAction && !progressPhotoloading && (progressPhotosState !== progressPhotos)) {
            this.setState({
                initProgressPhotosAction: false,
                progressPhotos,
                doLoadProgressPhotos: false,
            });
        }
        if (initGalleryPhotosAction && !galleryPhotoloading && (galleryPhotosState !== galleryPhotos)) {
            this.setState({
                initGalleryPhotosAction: false,
                galleryPhotos,
                doLoadGalleryPhotos: false,
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
                dispatch(getUserProgressPhotoRequest(username));
            }
        }
        if (saveGalleryPhotoActionInit && !galleryPhotoloading) {
            this.setState({ saveGalleryPhotoActionInit: false });
            ts('Gallery photos saved successfully!');
            this.handleCloseGalleryPhotoModal();
            dispatch(hidePageLoader());
            var username = profile.username;
            this.setState({
                initGalleryPhotosAction: true,
            });
            dispatch(getUserGalleryPhotoRequest(username, 0, 10));
        }
        if (forceUpdateChildComponents) {
            var username = profile.username;
            this.setState({
                initProgressPhotosAction: true,
            });
            dispatch(getUserProgressPhotoRequest(username));
            setForceUpdateChildComponents(false);
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

    handleGalleryPhotoSubmit = (data) => {
        const { dispatch } = this.props;
        var formData = new FormData();
        formData.append('description', data.description);
        formData.append('privacy', data.accessLevel);
        formData.append('postType', POST_TYPE_GALLERY);
        if (data.images.length > 0) {
            for (let index = 0; index < data.images.length; index++) {
                const file = data.images[index];
                formData.append('images', file);
            }
        }
        this.setState({ saveGalleryPhotoActionInit: true });
        dispatch(addUserGalleryPhotoRequest(formData));
        dispatch(showPageLoader());
    }

    handleShowGalleryPhotoModal = () => {
        this.setState({
            showGalleryPhotoModal: true,
        });
    }

    handleCloseGalleryPhotoModal = () => {
        this.setState({
            showGalleryPhotoModal: false,
        });
        this.handleForceResetGalleryModalState(true);
    }

    handleForceResetGalleryModalState = (flag) => {
        this.setState({
            forceResetGalleryModalState: flag,
        });
    }

    handleOpenLightbox = (openFor = 'gallery_photos', startFrom = 0) => {
        const { progressPhotos, galleryPhotos } = this.state;
        let lightBoxImages = [];
        let setState = false;
        if (openFor === 'progress_photos' && progressPhotos && progressPhotos.length > 0) {
            setState = true;
            progressPhotos.map((photo) => {
                lightBoxImages.push({ src: SERVER_BASE_URL + photo.image });
            });
        } else if (openFor === 'gallery_photos' && galleryPhotos && galleryPhotos.length > 0) {
            setState = true;
            galleryPhotos.map((galleryPhoto) => {
                return galleryPhoto.images.map((photo) => {
                    lightBoxImages.push({ src: SERVER_BASE_URL + photo.image });
                })
            })
        }
        if (setState) {
            this.setState({
                currentImage: startFrom,
                lightBoxOpen: true,
                lightBoxImages
            });
        }
    }

    handleCloseLightbox = () => {
        this.setState({
            currentImage: 0,
            lightBoxOpen: false,
            lightBoxImages: [],
        });
    }

    handleNavigation = (direction = 'next') => {
        const { currentImage, lightBoxImages } = this.state;
        let newCurrentImage = currentImage;
        if (direction === 'prev') {
            if (currentImage <= 0) {
                newCurrentImage = (lightBoxImages.length - 1);
            } else {
                newCurrentImage -= 1;
            }
        } else if (direction === 'next') {
            if (currentImage >= (lightBoxImages.length - 1)) {
                newCurrentImage = 0;
            } else {
                newCurrentImage += 1;
            }
        }
        this.setState({ currentImage: newCurrentImage });
    }
    //#endregion
}

const mapStateToProps = (state) => {
    const { userProgressPhotos, userGalleryPhotos } = state;
    return {
        progressPhotoloading: userProgressPhotos.get('loading'),
        progressPhotoError: userProgressPhotos.get('error'),
        progressPhotos: userProgressPhotos.get('progressPhotos'),
        galleryPhotoloading: userGalleryPhotos.get('loading'),
        galleryPhotoError: userGalleryPhotos.get('error'),
        galleryPhotos: userGalleryPhotos.get('galleryPhotos'),
    }
}

export default connect(mapStateToProps)(ProfilePhotos);