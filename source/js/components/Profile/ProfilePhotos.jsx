import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reset, initialize } from "redux-form";
import ProfilePhotoBlock from './ProfilePhotoBlock';
import AddProgressPhotoModal from '../Common/AddProgressPhotoModal';
import {
    addUserProgressPhotoRequest,
    getUserProgressPhotoRequest,
    deleteUserProgressPhotoRequest,
    removeSelectedProgressPhotosToUpload,
    setProgressPhoto
} from '../../actions/userProgressPhotos';
import { ts, te, tw, isOnline, connectIDB } from '../../helpers/funs';
import { FRIENDSHIP_STATUS_SELF, POST_TYPE_GALLERY, SERVER_BASE_URL } from '../../constants/consts';
import AddGalleryPhotoModal from './AddGalleryPhotoModal';
import { addUserGalleryPhotoRequest, getUserGalleryPhotoRequest, deleteUserGalleryPhotoRequest, setUserGalleryPhoto } from '../../actions/userGalleryPhotos';
import { showPageLoader, hidePageLoader } from '../../actions/pageLoader';
import { FaCircleONotch } from "react-icons/lib/fa";
import ErrorCloud from "svg/error-cloud.svg";
import Lightbox from 'react-images';
import { Link } from "react-router-dom";
import { routeCodes } from '../../constants/routes';
import NoRecordFound from '../Common/NoRecordFound';
import SweetAlert from "react-bootstrap-sweetalert";
import moment from "moment";
import { getUserBodypartsRequest } from '../../actions/userBodyparts';
import { IDB_TBL_PROFILE, IDB_READ_WRITE, IDB_READ } from '../../constants/idb';

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

            showImageDeleteAlert: false,
            typeOfImageToDelete: null,
            deleteImageData: null,
        }
        this.iDB;
    }

    render() {
        const {
            profile,
            progressPhotoloading,
            progressPhotoError,
            galleryPhotoloading,
            galleryPhotoError,
            progressPhotoDataOver,
            galleryPhotoDataOver,
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
            saveProgressPhotoActionInit,
            showImageDeleteAlert
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
                        {progressPhotoloading &&
                            <div className="text-c">
                                <FaCircleONotch className="loader-spinner fs-50" />
                            </div>
                        }
                        {!progressPhotoloading && (!progressPhotos || progressPhotos.length <= 0) && progressPhotoError && progressPhotoError.length <= 0 &&
                            <NoRecordFound title="Please add some progress photos" />
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
                                        <ProfilePhotoBlock
                                            imageData={photo}
                                            image={photo.image}
                                            caption={photo.date}
                                            handleOpenLightbox={this.handleOpenLightbox}
                                            index={index}
                                            blockFor="progress_photos"
                                            handleShowDeleteImageAlert={this.handleShowDeleteImageAlert}
                                            allowDelete={(profile && profile.friendshipStatus && profile.friendshipStatus === FRIENDSHIP_STATUS_SELF)}
                                        />
                                    </li>
                                ))}
                            </ul>
                        }
                        {profile && profile.username && !progressPhotoloading && progressPhotos && progressPhotos.length > 0 && (!progressPhotoDataOver) &&
                            <Link onClick={(e) => { !isOnline() && this.userOfflineMessage(e) }} to={`${routeCodes.PROGRESS_PHOTOS}/${profile.username}`} className="fithub-photos-view-all-link">View All</Link>
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
                            <NoRecordFound title="Please add some gallery photos" />
                        }
                        {!galleryPhotoloading && (!galleryPhotos || galleryPhotos.length <= 0) && galleryPhotoError && galleryPhotoError.length > 0 &&
                            <div className="server-error-wrapper">
                                <ErrorCloud />
                                <h4>Something went wrong! please try again.</h4>
                            </div>
                        }
                        {!galleryPhotoloading && galleryPhotos && galleryPhotos.length > 0 &&
                            <ul className="d-flex profile-list-ul">
                                {galleryPhotos.map((o, i) => {
                                    let photo = o.images ? o.images : null;
                                    if (!photo) return;
                                    return (
                                        <li key={i}>
                                            <ProfilePhotoBlock
                                                imageData={photo}
                                                image={photo.image}
                                                caption={photo.logDate}
                                                handleOpenLightbox={this.handleOpenLightbox}
                                                index={i}
                                                blockFor="gallery_photos"
                                                handleShowDeleteImageAlert={this.handleShowDeleteImageAlert}
                                                allowDelete={(profile && profile.friendshipStatus && profile.friendshipStatus === FRIENDSHIP_STATUS_SELF)}
                                                containerClass="profile_one"
                                            />
                                        </li>
                                    )
                                })}
                            </ul>
                        }
                        {!galleryPhotoloading && galleryPhotos && galleryPhotos.length > 0 && (!galleryPhotoDataOver) &&
                            <Link onClick={(e) => { !isOnline() && this.userOfflineMessage(e) }} to={`${routeCodes.GALLERY_PHOTOS}/${profile.username}`} className="fithub-photos-view-all-link">View All</Link>
                        }
                    </div>
                </div>

                <AddProgressPhotoModal
                    onSubmit={this.handleProgressPhotoSubmit}
                    show={showAddProgressPhotoModal}
                    handleOpen={this.handleShowAddProgressPhotoModal}
                    handleClose={this.handleCloseAddProgressPhotoModal}
                    isLoading={saveProgressPhotoActionInit}
                />

                <AddGalleryPhotoModal
                    show={showGalleryPhotoModal}
                    handlePost={this.handleGalleryPhotoSubmit}
                    handleClose={this.handleCloseGalleryPhotoModal}
                    doResetState={forceResetGalleryModalState}
                    resetState={this.handleForceResetGalleryModalState}
                />

                <SweetAlert
                    show={showImageDeleteAlert}
                    danger
                    showCancel
                    confirmBtnText="Yes, delete it!"
                    confirmBtnBsStyle="danger"
                    cancelBtnBsStyle="default"
                    title="Are you sure?"
                    onConfirm={this.handleDeleteImage}
                    onCancel={this.handleCancelDeleteImage}
                >
                    You will not be able to recover it!
                </SweetAlert>

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

    componentDidMount() {

        connectIDB()().then((connection) => {
            this.handleIDBOpenSuccess(connection);
        });
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
            if (isOnline()) {
                dispatch(getUserProgressPhotoRequest(username));
                dispatch(getUserGalleryPhotoRequest(username, 0, 10));
            }
        } else {
            this.setState({
                doLoadProgressPhotos: true,
                doLoadGalleryPhotos: true,
            });
        }
        if (isOnline()) {
            dispatch(getUserBodypartsRequest());
        }
    }

    handleIDBOpenSuccess = (connection) => {
        this.iDB = connection.result;
        if (!isOnline()) {
            // get data from idb
            this.getDataFromIDB()
        }
    }

    getDataFromIDB = () => {

        const { dispatch } = this.props;

        const idbTbls = [IDB_TBL_PROFILE];

        try {
            const transaction = this.iDB.transaction(idbTbls, IDB_READ);
            if (transaction) {
                const osPrivacy = transaction.objectStore(IDB_TBL_PROFILE);
                const iDBGetReq = osPrivacy.get('progressPhoto');
                iDBGetReq.onsuccess = (event) => {
                    const { target: { result } } = event;
                    if (result) {
                        const resultObj = JSON.parse(result.data);
                        const data = { progressPhoto: resultObj }
                        dispatch(setProgressPhoto(data));
                    } else {
                        const data = { progressPhoto: null }
                        dispatch(setProgressPhoto(data));
                    }
                }
            }
        } catch (error) {
            const data = { progressPhoto: null }
            dispatch(setProgressPhoto(data));
        }

        try {
            const transaction1 = this.iDB.transaction(idbTbls, IDB_READ);
            if (transaction1) {
                const osGalleryPhoto = transaction1.objectStore(IDB_TBL_PROFILE);
                const iDBGetReqGalleryPhoto = osGalleryPhoto.get('calender');
                iDBGetReqGalleryPhoto.onsuccess = (event) => {
                    const { target: { result } } = event;
                    if (result) {
                        const resultObjGalleryPhoto = JSON.parse(result.data);
                        const dataGalleryPhoto = { calender: resultObjGalleryPhoto }
                        dispatch(setUserGalleryPhoto(dataGalleryPhoto));
                    } else {
                        const dataGalleryPhoto = { calender: null }
                        dispatch(setUserGalleryPhoto(dataGalleryPhoto));
                    }
                }
            }
        } catch (error) {
            const dataGalleryPhoto = { calender: null }
            dispatch(setUserGalleryPhoto(dataGalleryPhoto));
        }

    }

    userOfflineMessage = (e) => {
        e.preventDefault();
        tw("You are offline, please check your internet connection");
    }

    setprogressPhotoDataInDB = () => {
        const { progressPhotos } = this.props;
        try {
            const idbData = { type: 'progressPhoto', data: JSON.stringify(progressPhotos) };
            const transaction = this.iDB.transaction([IDB_TBL_PROFILE], IDB_READ_WRITE);
            const objectStore = transaction.objectStore(IDB_TBL_PROFILE);
            const iDBGetReq = objectStore.get('progressPhoto');
            iDBGetReq.onsuccess = (event) => {
                const { target: { result } } = event;
                if (result) {
                    objectStore.put(idbData);
                } else {
                    objectStore.add(idbData);
                }
            }
        } catch (error) {
        }
    }

    setGalleryPhotosDataInDB = () => {
        const { galleryPhotos } = this.props;
        try {
            const idbData = { type: 'galleryPhotos', data: JSON.stringify(galleryPhotos) };
            const transaction = this.iDB.transaction([IDB_TBL_PROFILE], IDB_READ_WRITE);
            const objectStore = transaction.objectStore(IDB_TBL_PROFILE);
            const iDBGetReq = objectStore.get('galleryPhotos');
            iDBGetReq.onsuccess = (event) => {
                const { target: { result } } = event;
                if (result) {
                    objectStore.put(idbData);
                } else {
                    objectStore.add(idbData);
                }
            }
        } catch (error) {
        }
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
            if (isOnline()) {
                dispatch(getUserProgressPhotoRequest(username));
            }
        }
        if ((doLoadGalleryPhotos) && profile && Object.keys(profile).length > 0) {
            var username = profile.username;
            this.setState({
                initGalleryPhotosAction: true,
            });
            if (isOnline()) {
                dispatch(getUserGalleryPhotoRequest(username, 0, 10));
            }
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
            progressDeleteLoading,
            progressDeleteError,
            galleryDeleteLoading,
            galleryDeleteError,
            progressPhotoError
        } = this.props;
        const progressPhotosState = this.state.progressPhotos;
        const galleryPhotosState = this.state.galleryPhotos;
        if (initProgressPhotosAction && !progressPhotoloading && (progressPhotosState !== progressPhotos)) {
            this.setState({
                initProgressPhotosAction: false,
                progressPhotos,
                doLoadProgressPhotos: false,
            });
            if (isOnline()) {
                this.setprogressPhotoDataInDB()
            }
        }
        if (initGalleryPhotosAction && !galleryPhotoloading && (galleryPhotosState !== galleryPhotos)) {
            this.setState({
                initGalleryPhotosAction: false,
                galleryPhotos,
                doLoadGalleryPhotos: false,
            });
            if (isOnline()) {
                this.setGalleryPhotosDataInDB()
            }
        }
        if (saveProgressPhotoActionInit && !progressPhotoloading) {
            this.setState({ saveProgressPhotoActionInit: false });
            if (progressPhotoError && progressPhotoError.length <= 0) {
                ts('Progress photo saved successfully!');
            } else {
                te('Something went wrong while adding progress photo! Please try again.');
            }
            this.handleCloseAddProgressPhotoModal();
            dispatch(hidePageLoader());
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
        if (!progressDeleteLoading && prevProps.progressDeleteLoading !== progressDeleteLoading) {
            this.handleCancelDeleteImage();
            dispatch(hidePageLoader());
            if (progressDeleteError && progressDeleteError.length > 0) {
                te('Something went wrong! please try again later.');
            } else {
                ts('Progress photo deleted successfully.');
            }
            if (profile && Object.keys(profile).length > 0) {
                var username = profile.username;
                this.setState({ initProgressPhotosAction: true });
                dispatch(getUserProgressPhotoRequest(username));
            }
        }
        if (!galleryDeleteLoading && prevProps.galleryDeleteLoading !== galleryDeleteLoading) {
            this.handleCancelDeleteImage();
            dispatch(hidePageLoader());
            if (galleryDeleteError && galleryDeleteError.length > 0) {
                te('Something went wrong! please try again later.');
            } else {
                ts('Gallery photo deleted successfully.');
            }
            if (profile && Object.keys(profile).length > 0) {
                var username = profile.username;
                this.setState({ initGalleryPhotosAction: true });
                dispatch(getUserGalleryPhotoRequest(username, 0, 10));
            }
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
        if (isOnline()) {
            this.setState({ showAddProgressPhotoModal: true });
        } else {
            tw("You are offline, please check your internet connection");
        }
    }

    handleCloseAddProgressPhotoModal = (resetFormData = true) => {
        const { dispatch } = this.props;
        this.setState({ showAddProgressPhotoModal: false });
        if (resetFormData) {
            dispatch(reset('add_progress_photo_modal_form'));
            dispatch(removeSelectedProgressPhotosToUpload());
        }
    }

    handleProgressPhotoSubmit = (data) => {
        if (isOnline()) {
            const { dispatch, selectedPhotos } = this.props;
            if (selectedPhotos && selectedPhotos.length > 0) {
                let logDate = moment();
                let requestData = {
                    description: data.description ? data.description : '',
                    date: logDate,
                    progressPhotosData: selectedPhotos
                };
                this.setState({ saveProgressPhotoActionInit: true });
                dispatch(showPageLoader());
                dispatch(addUserProgressPhotoRequest(requestData));
            }
        } else {
            tw("You are offline, please check your internet connection");
        }
    }

    handleGalleryPhotoSubmit = (data) => {
        if (isOnline()) {
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
        } else {
            tw("You are offline, please check your internet connection");
        }
    }

    handleShowGalleryPhotoModal = () => {
        if (isOnline()) {
            this.setState({
                showGalleryPhotoModal: true,
            });
        } else {
            tw("You are offline, please check your internet connection");
        }
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
                let photo = galleryPhoto.images
                if (photo) {
                    lightBoxImages.push({ src: SERVER_BASE_URL + photo.image });
                }
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

    handleShowDeleteImageAlert = (type, imageData) => {
        this.setState({ showImageDeleteAlert: true, typeOfImageToDelete: type, deleteImageData: imageData });
    }

    handleCancelDeleteImage = () => {
        this.setState({ showImageDeleteAlert: false, typeOfImageToDelete: null, deleteImageData: null });
    }

    handleDeleteImage = () => {
        const { typeOfImageToDelete, deleteImageData } = this.state;
        const { dispatch } = this.props;
        if (typeOfImageToDelete === 'progress_photos' && deleteImageData && deleteImageData._id) {
            dispatch(showPageLoader());
            dispatch(deleteUserProgressPhotoRequest(deleteImageData._id));
        } else if (typeOfImageToDelete === 'gallery_photos' && deleteImageData && deleteImageData._id) {
            dispatch(showPageLoader());
            dispatch(deleteUserGalleryPhotoRequest(deleteImageData._id, deleteImageData.postId));
        } else {
            te('Something went wrong! please try again later.');
        }
        this.handleCancelDeleteImage();
    }
    //#endregion
}

const mapStateToProps = (state) => {
    const { userProgressPhotos, userGalleryPhotos } = state;
    return {
        progressPhotoloading: userProgressPhotos.get('loading'),
        progressPhotoError: userProgressPhotos.get('error'),
        progressPhotos: userProgressPhotos.get('progressPhotos'),
        progressDeleteLoading: userProgressPhotos.get('deleteLoading'),
        progressDeleteError: userProgressPhotos.get('deleteError'),
        progressPhotoDataOver: userProgressPhotos.get('photoDataOver'),
        selectedPhotos: userProgressPhotos.get('selectedProgressPhotos'),

        galleryPhotoloading: userGalleryPhotos.get('loading'),
        galleryPhotoError: userGalleryPhotos.get('error'),
        galleryPhotos: userGalleryPhotos.get('galleryPhotos'),
        galleryDeleteLoading: userGalleryPhotos.get('deleteLoading'),
        galleryDeleteError: userGalleryPhotos.get('deleteError'),
        galleryPhotoDataOver: userGalleryPhotos.get('photoDataOver'),

    }
}

export default connect(mapStateToProps)(ProfilePhotos);