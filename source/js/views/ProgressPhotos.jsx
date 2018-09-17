import React, { Component } from 'react';
import { connect } from 'react-redux';
import FitnessHeader from '../components/global/FitnessHeader';
import FitnessNav from '../components/global/FitnessNav';
import { getUserProgressPhotoRequest } from '../actions/userProgressPhotos';
import { FaCircleONotch } from "react-icons/lib/fa";
import NoDataFoundImg from "img/common/no_datafound.png";
import ErrorCloud from "svg/error-cloud.svg";
import ProfilePhotoBlock from '../components/Profile/ProfilePhotoBlock';
import Lightbox from 'react-images';
import { SERVER_BASE_URL } from '../constants/consts';

class ProgressPhotos extends Component {
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
        dispatch(getUserProgressPhotoRequest(match.params.username, 0, 10, -1));
    }

    render() {
        const { loading, progressPhotos, error } = this.props;
        const { lightBoxOpen, currentImage, lightBoxImages } = this.state;
        return (
            <div className="fitness-progress-photos-wrapper">
                <FitnessHeader />
                <FitnessNav />
                <section className="body-wrap">
                    <div className="body-head space-btm-45 d-flex justify-content-start">
                        <div className="body-head-l">
                            <h2>Progress Photos</h2>
                            <p>Your goal choice shapes how your fitness assistant will ceate your meal and exercise plans, it’s important that
                                you set goals which are achieveable. Keep updating your profile and your fitness assistant will keep you
                                on track and meeting the goals you’ve set out for yourself.</p>
                        </div>
                        <div className="body-head-r space-btm-20">
                            <button type="button" className="white-btn">
                                <i className="icon-arrow_back"></i>
                                <span>Back</span>
                            </button>
                        </div>
                    </div>

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
                                        <ProfilePhotoBlock image={photo.image} caption={photo.date} handleOpenLightbox={this.handleOpenLightbox} index={index} blockFor="progress_photos" />
                                    </li>
                                ))}
                            </ul>
                            <button type="button" className="photo-load-more-btn progress-photos">
                                <span>Load More</span>
                            </button>
                        </div>
                    }

                    {!loading && (!progressPhotos || progressPhotos.length <= 0) && error && error.length <= 0 &&
                        <div className="no-record-found-wrapper">
                            <img src={NoDataFoundImg} />
                        </div>
                    }

                    {!loading && (!progressPhotos || progressPhotos.length <= 0) && error && error.length > 0 &&
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
}

const mapStateToProps = (state) => {
    const { userProgressPhotos } = state;
    return {
        loading: userProgressPhotos.get('loading'),
        progressPhotos: userProgressPhotos.get('progressPhotos'),
        error: userProgressPhotos.get('error'),
    };
}

export default connect(
    mapStateToProps,
)(ProgressPhotos);