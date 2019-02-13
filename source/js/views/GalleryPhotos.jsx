import React, { Component } from 'react';
import { connect } from 'react-redux';
import FitnessHeader from '../components/global/FitnessHeader';
import FitnessNav from '../components/global/FitnessNav';
import { FaCircleONotch } from "react-icons/lib/fa";
import ErrorCloud from "svg/error-cloud.svg";
import ProfilePhotoBlock from '../components/Profile/ProfilePhotoBlock';
import Lightbox from 'react-images';
import { SERVER_BASE_URL } from '../constants/consts';
import { routeCodes } from '../constants/routes';
import { Link } from "react-router-dom";
import { getUserGalleryPhotoRequest, loadMoreUserGalleryPhotoRequest, deleteUserGalleryPhotoRequest } from '../actions/userGalleryPhotos';
import NoRecordFound from '../components/Common/NoRecordFound';
import SweetAlert from "react-bootstrap-sweetalert";
import { showPageLoader, hidePageLoader } from '../actions/pageLoader';
import { te, ts } from '../helpers/funs';

class GalleryPhotos extends Component {
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
    }

    componentWillMount() {
        const { dispatch, match } = this.props;
        dispatch(getUserGalleryPhotoRequest(match.params.username, 0, 10, -1));
    }

    render() {
        const { loading, galleryPhotos, error, photoLoadMoreLoading, photoDataOver, match, loggedUserData } = this.props;
        const { lightBoxOpen, currentImage, lightBoxImages, showImageDeleteAlert } = this.state;
        return (
            <div className="fitness-gallery-photos-wrapper">
                <FitnessHeader />
                <FitnessNav />
                <section className="body-wrap">
                    <div className="body-head space-btm-45 d-flex justify-content-start front-white-header">
                        <div className="body-head-l">
                            <h2>Gallery Photos</h2>
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

                        {!loading && galleryPhotos && galleryPhotos.length > 0 &&
                            <div className="white-box">
                                <ul className="d-flex profile-list-ul">
                                    {galleryPhotos.map((o, index) => {
                                        let photo = o.images ? o.images : null;
                                        if (!photo) return;
                                        return (
                                            <li key={index}>
                                                <ProfilePhotoBlock
                                                    imageData={photo}
                                                    image={photo.image}
                                                    caption={photo.date}
                                                    handleOpenLightbox={this.handleOpenLightbox}
                                                    index={index}
                                                    blockFor="gallery_photos"
                                                    handleShowDeleteImageAlert={this.handleShowDeleteImageAlert}
                                                    allowDelete={(loggedUserData && match.params && loggedUserData.username && match.params.username && loggedUserData.username === match.params.username)}
                                                />
                                            </li>
                                        )
                                    })}
                                </ul>
                                {!photoLoadMoreLoading && !photoDataOver &&
                                    <button type="button" className="photo-load-more-btn gallery-photos" onClick={this.handleLoadMore}>
                                        <span>Load More</span>
                                    </button>
                                }
                                {photoLoadMoreLoading &&
                                    <button type="button" className="photo-load-more-btn gallery-photos" disabled={true}>
                                        <FaCircleONotch className="loader-spinner loader-spinner-icon" />
                                        <span>Loading...</span>
                                    </button>
                                }
                            </div>
                        }

                        {!loading && (!galleryPhotos || galleryPhotos.length <= 0) && error && error.length <= 0 &&
                            <NoRecordFound />
                        }

                        {!loading && (!galleryPhotos || galleryPhotos.length <= 0) && error && error.length > 0 &&
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

    componentDidUpdate(prevProps, prevState) {
        const { dispatch, deleteLoading, deleteError } = this.props;
        if (!deleteLoading && prevProps.deleteLoading !== deleteLoading) {
            this.handleCancelDeleteImage();
            dispatch(hidePageLoader());
            if (deleteError && deleteError.length > 0) {
                te('Something went wrong! please try again later.');
            } else {
                ts('Progress photo deleted successfully.');
            }
        }
    }

    handleOpenLightbox = (openFor = 'gallery_photos', startFrom = 0) => {
        const { galleryPhotos } = this.props;
        let lightBoxImages = [];
        let setState = false;
        if (openFor === 'gallery_photos' && galleryPhotos && galleryPhotos.length > 0) {
            setState = true;
            galleryPhotos.map((o) => {
                let photo = o.images ? o.images : null;
                if (photo) {
                    lightBoxImages.push({ src: SERVER_BASE_URL + photo.image });
                }
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
        dispatch(loadMoreUserGalleryPhotoRequest(match.params.username, _photoStart, photoLimit, -1));
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
        if (typeOfImageToDelete === 'gallery_photos' && deleteImageData && deleteImageData._id) {
            dispatch(showPageLoader());
            dispatch(deleteUserGalleryPhotoRequest(deleteImageData._id, deleteImageData.postId));
        } else {
            te('Something went wrong! please try again later.');
        }
        this.handleCancelDeleteImage();
    }
}

const mapStateToProps = (state) => {
    const { userGalleryPhotos, user } = state;
    return {
        loading: userGalleryPhotos.get('loading'),
        galleryPhotos: userGalleryPhotos.get('galleryPhotos'),
        error: userGalleryPhotos.get('error'),
        photoLoadMoreLoading: userGalleryPhotos.get('photoLoadMoreLoading'),
        photoStart: userGalleryPhotos.get('photoStart'),
        photoLimit: userGalleryPhotos.get('photoLimit'),
        photoDataOver: userGalleryPhotos.get('photoDataOver'),
        deleteLoading: userGalleryPhotos.get('deleteLoading'),
        deleteError: userGalleryPhotos.get('deleteError'),

        loggedUserData: user.get('loggedUserData'),
    };
}

export default connect(
    mapStateToProps,
)(GalleryPhotos);