import React, { Component } from 'react';
import { connect } from 'react-redux';
import FitnessHeader from '../components/global/FitnessHeader';
import FitnessNav from '../components/global/FitnessNav';
import { FaCircleONotch } from "react-icons/lib/fa";
import NoDataFoundImg from "img/common/no_datafound.png";
import ErrorCloud from "svg/error-cloud.svg";
import ProfilePhotoBlock from '../components/Profile/ProfilePhotoBlock';
import Lightbox from 'react-images';
import { SERVER_BASE_URL } from '../constants/consts';
import { routeCodes } from '../constants/routes';
import { Link } from "react-router-dom";
import { getUserGalleryPhotoRequest, loadMoreUserGalleryPhotoRequest } from '../actions/userGalleryPhotos';

class GalleryPhotos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lightBoxOpen: false,
            currentImage: 0,
            lightBoxImages: [],
        };
    }

    componentWillMount() {
        const { dispatch, match } = this.props;
        dispatch(getUserGalleryPhotoRequest(match.params.username, 0, 1, -1));
    }

    render() {
        const { loading, galleryPhotos, error, photoLoadMoreLoading, photoDataOver, match } = this.props;
        const { lightBoxOpen, currentImage, lightBoxImages } = this.state;
        let galleryPhotosArr = [];
        if (galleryPhotos && galleryPhotos.length > 0) {
            galleryPhotos.map((galleryPhoto) => {
                galleryPhoto.images.map((photo) => {
                    galleryPhotosArr.push(photo);
                });
            });
        }
        return (
            <div className="fitness-progress-photos-wrapper">
                <FitnessHeader />
                <FitnessNav />
                <section className="body-wrap">
                    <div className="body-head space-btm-45 d-flex justify-content-start">
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

                    {loading &&
                        <div className="no-content-loader">
                            <FaCircleONotch className="loader-spinner fs-100" />
                        </div>
                    }

                    {!loading && galleryPhotosArr && galleryPhotosArr.length > 0 &&
                        <div className="white-box">
                            <ul className="d-flex profile-list-ul">
                                {galleryPhotosArr.map((photo, index) => (
                                    <li key={index}>
                                        <ProfilePhotoBlock image={photo.image} caption={photo.date} handleOpenLightbox={this.handleOpenLightbox} index={index} blockFor="gallery_photos" />
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

                    {!loading && (!galleryPhotosArr || galleryPhotosArr.length <= 0) && error && error.length <= 0 &&
                        <div className="no-record-found-wrapper">
                            <img src={NoDataFoundImg} />
                        </div>
                    }

                    {!loading && (!galleryPhotosArr || galleryPhotosArr.length <= 0) && error && error.length > 0 &&
                        <div className="server-error-wrapper">
                            <ErrorCloud />
                            <h4>Something went wrong! please try again.</h4>
                        </div>
                    }
                </section>
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

    handleOpenLightbox = (openFor = 'gallery_photos', startFrom = 0) => {
        const { galleryPhotos } = this.props;
        let lightBoxImages = [];
        let setState = false;
        if (openFor === 'gallery_photos' && galleryPhotos && galleryPhotos.length > 0) {
            setState = true;
            let galleryPhotosArr = [];
            if (galleryPhotos && galleryPhotos.length > 0) {
                galleryPhotos.map((galleryPhoto) => {
                    galleryPhoto.images.map((photo) => {
                        galleryPhotosArr.push(photo);
                    });
                });
            }
            galleryPhotosArr.map((photo) => {
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
        dispatch(loadMoreUserGalleryPhotoRequest(match.params.username, _photoStart, photoLimit, -1));
    }
}

const mapStateToProps = (state) => {
    const { userGalleryPhotos } = state;
    return {
        loading: userGalleryPhotos.get('loading'),
        galleryPhotos: userGalleryPhotos.get('galleryPhotos'),
        error: userGalleryPhotos.get('error'),
        photoLoadMoreLoading: userGalleryPhotos.get('photoLoadMoreLoading'),
        photoStart: userGalleryPhotos.get('photoStart'),
        photoLimit: userGalleryPhotos.get('photoLimit'),
        photoDataOver: userGalleryPhotos.get('photoDataOver'),
    };
}

export default connect(
    mapStateToProps,
)(GalleryPhotos);