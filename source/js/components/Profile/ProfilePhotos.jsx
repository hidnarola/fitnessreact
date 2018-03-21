import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProfilePhotosData } from '../../actions/profilePhotos';
import ProfilePhotoBlock from './ProfilePhotoBlock';

class ProfilePhotos extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(getProfilePhotosData());
    }

    render() {
        const { galleryPhotos, progressPhotos } = this.props;
        return (
            <div className="profilePhotosComponentWrapper">
                <div className="white-box space-btm-20">
                    <div className="whitebox-head profile-head d-flex">
                        <h3 className="title-h3 size-14">Progress Photos</h3>
                        <div className="whitebox-head-r">
                            <a href="" data-toggle="modal" data-target="#progress-gallery">
                                <span>Add Progress Photo</span>
                                <i className="icon-add_a_photo"></i>
                            </a>
                        </div>
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
                                        <ProfilePhotoBlock image={photo.image} caption={photo.logDate} />
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
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { profilePhotos } = state;
    return {
        loading: profilePhotos.get('loading'),
        error: profilePhotos.get('error'),
        progressPhotos: profilePhotos.get('progressPhotos'),
        galleryPhotos: profilePhotos.get('galleryPhotos'),
    }
}

export default connect(mapStateToProps)(ProfilePhotos);