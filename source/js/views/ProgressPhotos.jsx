import React, { Component } from 'react';
import { connect } from 'react-redux';
import FitnessHeader from '../components/global/FitnessHeader';
import FitnessNav from '../components/global/FitnessNav';
import { getUserProgressPhotoRequest, loadMoreUserProgressPhotoRequest, deleteUserProgressPhotoRequest, setProgressPhoto } from '../actions/userProgressPhotos';
import { FaCircleONotch } from "react-icons/lib/fa";
import ErrorCloud from "svg/error-cloud.svg";
import ProfilePhotoBlock from '../components/Profile/ProfilePhotoBlock';
import Lightbox from 'react-images';
import { SERVER_BASE_URL } from '../constants/consts';
import { routeCodes } from '../constants/routes';
import { Link } from "react-router-dom";
import NoRecordFound from '../components/Common/NoRecordFound';
import SweetAlert from "react-bootstrap-sweetalert";
import { showPageLoader, hidePageLoader } from '../actions/pageLoader';
import { te, ts, tw, isOnline, connectIDB } from '../helpers/funs';
import { IDB_TBL_PROGRESS_PHOTO, IDB_READ_WRITE, IDB_READ } from '../constants/idb';

class ProgressPhotos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lightBoxOpen: false,
            currentImage: 0,
            lightBoxImages: [],

            showImageDeleteAlert: false,
            typeOfImageToDelete: null,
            deleteImageData: null,
        };
        this.iDB;
    }

    render() {
        const { loading, progressPhotos, error, photoLoadMoreLoading, photoDataOver, match, loggedUserData } = this.props;
        const { lightBoxOpen, currentImage, lightBoxImages, showImageDeleteAlert } = this.state;
        return (
            <div className="fitness-progress-photos-wrapper">
                <FitnessHeader />
                <FitnessNav />
                <section className="body-wrap">
                    <div className="body-head space-btm-45 d-flex justify-content-start front-white-header">
                        <div className="body-head-l">
                            <h2>Progress Photos</h2>
                            <p>Your goal choice shapes how your fitness assistant will ceate your meal and exercise plans, it’s important that
                                you set goals which are achieveable. Keep updating your profile and your fitness assistant will keep you
                                on track and meeting the goals you’ve set out for yourself.</p>
                        </div>
                        <div className="body-head-r space-btm-20">
                            <Link to={routeCodes.PROFILEPHOTOS.replace('{username}', match.params.username)} className="white-btn">
                                <i className="icon-arrow_back"></i>
                                <span>Back</span>
                            </Link>
                        </div>
                    </div>

                    <div className="body-content">
                        {loading &&
                            <div className="no-content-loader">
                                <FaCircleONotch className="loader-spinner fs-100" />
                            </div>
                        }

                        {!loading && progressPhotos && progressPhotos.length > 0 &&
                            <div className="white-box">
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
                                                allowDelete={(loggedUserData && match.params && loggedUserData.username && match.params.username && loggedUserData.username === match.params.username)}
                                            />
                                        </li>
                                    ))}
                                </ul>
                                {!photoLoadMoreLoading && !photoDataOver &&
                                    <button type="button" className="photo-load-more-btn progress-photos" onClick={this.handleLoadMore}>
                                        <span>Load More</span>
                                    </button>
                                }
                                {photoLoadMoreLoading &&
                                    <button type="button" className="photo-load-more-btn progress-photos" disabled={true}>
                                        <FaCircleONotch className="loader-spinner loader-spinner-icon" />
                                        <span>Loading...</span>
                                    </button>
                                }
                            </div>
                        }

                        {!loading && (!progressPhotos || progressPhotos.length <= 0) && error && error.length <= 0 &&
                            <NoRecordFound />
                        }

                        {!loading && (!progressPhotos || progressPhotos.length <= 0) && error && error.length > 0 &&
                            <div className="server-error-wrapper">
                                <ErrorCloud />
                                <h4>Something went wrong! please try again.</h4>
                            </div>
                        }
                    </div>
                </section>
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
        const { dispatch, match } = this.props;

        connectIDB()().then((connection) => {
            this.handleIDBOpenSuccess(connection);
        });

        if(isOnline()) {
            dispatch(getUserProgressPhotoRequest(match.params.username, 0, 10, -1));
        }
    }

    handleIDBOpenSuccess = (connection) => {
        this.iDB = connection.result;
        if(!isOnline()) {
            // get data from idb
            this.getDataFromIDB()
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { dispatch, deleteLoading, deleteError, loading } = this.props;
        if (!deleteLoading && prevProps.deleteLoading !== deleteLoading) {
            this.handleCancelDeleteImage();
            dispatch(hidePageLoader());
            if (deleteError && deleteError.length > 0) {
                te('Something went wrong! please try again later.');
            } else {
                ts('Progress photo deleted successfully.');
            }
        }
        if(!loading && prevProps.loading !== loading) { 
            this.setdataInDB();
        }
    }

    setdataInDB = () => {
        console.log("setdataInDB");
        const { progressPhotos } = this.props;
        try {
            const idbData = { type: IDB_TBL_PROGRESS_PHOTO, data: JSON.stringify(progressPhotos) };
            const transaction = this.iDB.transaction([IDB_TBL_PROGRESS_PHOTO], IDB_READ_WRITE);
            const objectStore = transaction.objectStore(IDB_TBL_PROGRESS_PHOTO);
            const iDBGetReq = objectStore.get(IDB_TBL_PROGRESS_PHOTO);
            iDBGetReq.onsuccess = (event) => {
                const { target: { result } } = event;
                if (result) {
                    objectStore.put(idbData);
                } else {
                    objectStore.add(idbData);
                }
            }
        } catch (error) {
            console.log("error =>", error);
        }
    }

    getDataFromIDB = () => {

        const { dispatch } = this.props;
        const idbTbls = [IDB_TBL_PROGRESS_PHOTO];
        try {
            const transaction = this.iDB.transaction(idbTbls, IDB_READ);
            if (transaction) {
                const osFriend = transaction.objectStore(IDB_TBL_PROGRESS_PHOTO);
                const iDBGetReq = osFriend.get(IDB_TBL_PROGRESS_PHOTO);
                iDBGetReq.onsuccess = (event) => {
                    const { target: { result } } = event;
                    if (result) {
                        const resultObj = JSON.parse(result.data);
                        const data = { progressPhotos: resultObj }
                        dispatch(setProgressPhoto(data));
                    } else {
                        const data = { progressPhotos: [] }
                        dispatch(setProgressPhoto(data));
                    }
                }
            }
        } catch (error) {
            const data = { progressPhotos: [] }
            dispatch(setProgressPhoto(data));
        }

    }

    handleOpenLightbox = (openFor = 'progress_photos', startFrom = 0) => {
        const { progressPhotos } = this.props;
        let lightBoxImages = [];
        let setState = false;
        if (openFor === 'progress_photos' && progressPhotos && progressPhotos.length > 0) {
            setState = true;
            progressPhotos.map((photo) => {
                lightBoxImages.push({ src: SERVER_BASE_URL + photo.image });
            });
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

    handleLoadMore = () => {
        const { match, dispatch, photoStart, photoLimit } = this.props;
        let _photoStart = parseInt(photoStart) + parseInt(photoLimit);
        dispatch(loadMoreUserProgressPhotoRequest(match.params.username, _photoStart, photoLimit, -1));
    }

    handleShowDeleteImageAlert = (type, imageData) => {
        if(isOnline()){
            this.setState({ showImageDeleteAlert: true, typeOfImageToDelete: type, deleteImageData: imageData });
        } else {
            tw("You are offline, please check your internet connection");
        }
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
        } else {
            te('Something went wrong! please try again later.');
        }
        this.handleCancelDeleteImage();
    }

    componentWillUnmount() {
        try {
            const idbs = [IDB_TBL_PROGRESS_PHOTO];
            if (isOnline()) {
                const transaction = this.iDB.transaction(idbs, IDB_READ_WRITE);
                if (transaction) {
                    const osProgressPhoto = transaction.objectStore(IDB_TBL_PROGRESS_PHOTO);
                    osProgressPhoto.clear();
                }
            }
            this.iDB.close();
        } catch (error) { }
    }
}

const mapStateToProps = (state) => {
    const { userProgressPhotos, user } = state;
    return {
        loading: userProgressPhotos.get('loading'),
        progressPhotos: userProgressPhotos.get('progressPhotos'),
        error: userProgressPhotos.get('error'),
        photoLoadMoreLoading: userProgressPhotos.get('photoLoadMoreLoading'),
        photoStart: userProgressPhotos.get('photoStart'),
        photoLimit: userProgressPhotos.get('photoLimit'),
        photoDataOver: userProgressPhotos.get('photoDataOver'),
        deleteLoading: userProgressPhotos.get('deleteLoading'),
        deleteError: userProgressPhotos.get('deleteError'),

        loggedUserData: user.get('loggedUserData'),
    };
}

export default connect(
    mapStateToProps,
)(ProgressPhotos);