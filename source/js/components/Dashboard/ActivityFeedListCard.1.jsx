import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import moment from 'moment';
import { POST_TYPE_TIMELINE, POST_TYPE_GALLERY, POST_TYPE_PROGRESS_PHOTO, ACCESS_LEVEL_PUBLIC, ACCESS_LEVEL_FRIENDS, ACCESS_LEVEL_PRIVATE, SERVER_BASE_URL } from '../../constants/consts';
import _ from "lodash";
import noProfileImg from 'img/common/no-profile-img.png';
import noImg from 'img/common/no-img.png';
import { routeCodes } from '../../constants/routes';
import { FaGlobe, FaLock, FaGroup } from 'react-icons/lib/fa';
import ReactHtmlParser from "react-html-parser";
import cns from 'classnames';
import ShowMore from "react-show-more";
import Lightbox from 'react-images';

class ActivityFeedListCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lightBoxOpen: false,
            currentImage: 0,
            lightBoxImages: [],
        }
    }

    render() {
        const { lightBoxOpen, currentImage, lightBoxImages } = this.state;
        const { post, loggedUserData } = this.props;
        if (!post) {
            return null;
        }
        var createdBy = (post.created_by && Object.keys(post.created_by).length > 0) ? post.created_by : null;
        if (!createdBy) {
            return null;
        }
        var postCreatedAt = post.createdAt;
        postCreatedAt = moment.utc(postCreatedAt).toDate();
        postCreatedAt = moment(postCreatedAt).local().format('Do MMM [at] hh:mm');
        var type = post.type;
        var description = '';
        var images = [];
        if (type === POST_TYPE_TIMELINE || type === POST_TYPE_GALLERY) {
            description = post.post_description;
            images = post.post_images;
        } else if (type === POST_TYPE_PROGRESS_PHOTO) {
            description = post.progress_description;
            images = post.progress_photos;
        } else {
            return null;
        }
        var imagesCount = images.length;
        var postImageDisplayClass = '';
        if (imagesCount === 2) {
            postImageDisplayClass = 'second_row';
        } else if (imagesCount === 3) {
            postImageDisplayClass = 'third_row';
        } else if (imagesCount === 4) {
            postImageDisplayClass = 'forth_row';
        } else if (imagesCount > 4) {
            postImageDisplayClass = 'forth_row';
        }
        var comments = post.comments;
        var totalComments = comments.length;
        var lastComment = {};
        var lastCommentCreatedAt = null;
        if (totalComments > 0) {
            lastComment = comments[(totalComments - 1)];
            lastCommentCreatedAt = lastComment.create_date;
            lastCommentCreatedAt = moment.utc(lastCommentCreatedAt).toDate();
            lastCommentCreatedAt = moment(lastCommentCreatedAt).local().format('Do MMM [at] hh:mm');
        }
        var likes = post.likes;
        var totalLikes = likes.length;
        var likesStr = '';
        var isLikedByLoggedUser = false;
        if (totalLikes > 0) {
            var likedOfLoggedUser = _.find(likes, ['authUserId', loggedUserData.authId]);
            if (likedOfLoggedUser) {
                isLikedByLoggedUser = true;
            }
            if (totalLikes > 2) {
                for (let i = 0; i < 2; i++) {
                    const obj = likes[i];
                    if (obj) {
                        likesStr += obj.firstName;
                        if (obj.lastName) {
                            likesStr += ' ' + obj.lastName;
                        }
                        if (i !== (2 - 1)) {
                            likesStr += ', ';
                        }
                    }
                }
                likesStr += ' and ' + (totalLikes - 2) + ' more liked this';
            } else {
                for (let i = 0; i < totalLikes; i++) {
                    const obj = likes[i];
                    likesStr += obj.firstName;
                    if (obj.lastName) {
                        likesStr += ' ' + obj.lastName;
                    }
                    if (i !== (totalLikes - 1)) {
                        likesStr += ', ';
                    }
                }
                likesStr += ' liked this';
            }
        }
        return (
            <div className="post-type timeline-infinite-scroll">
                <div className="posttype-head d-flex justify-content-start">
                    <span>
                        <img
                            src={createdBy.avatar}
                            alt={createdBy.firstName}
                            onError={(e) => {
                                e.target.src = noProfileImg
                            }}
                        />
                    </span>
                    <h4 className="head_post_f">
                        <big>
                            <NavLink to={`${routeCodes.PROFILE}/${createdBy.username}`}>
                                {`${createdBy.firstName} ${(createdBy.lastName) ? createdBy.lastName : ''}`}
                            </NavLink>
                        </big>
                        <small><Link to={`${routeCodes.POST}/${createdBy.username}/${post._id}`}>{(post.tag_line) ? post.tag_line : ''}</Link></small>
                        <p className="">
                            {postCreatedAt}
                            {post.privacy == ACCESS_LEVEL_PUBLIC && <FaGlobe />}
                            {post.privacy == ACCESS_LEVEL_FRIENDS && <FaGroup />}
                            {post.privacy == ACCESS_LEVEL_PRIVATE && <FaLock />}
                        </p>
                    </h4>
                </div>
                <div className="posttype-body">
                    {description &&
                        <div className="posttype-body-white">
                            <ShowMore
                                lines={3}
                                more='Show more'
                                less='Show less'
                                anchorClass='show-more-less-link'
                            >
                                {ReactHtmlParser(description)}
                            </ShowMore>
                        </div>
                    }
                    <div className={cns("posttype-body-grey", postImageDisplayClass)}>
                        {images && images.length > 0 &&
                            images.map((imageD, imageI) => {
                                if (imageI >= 4) {
                                    return null;
                                }
                                return (
                                    <a href="javascript:void(0)" key={imageI} onClick={() => this.handleOpenLightbox(images, imageI)}>
                                        <span>
                                            <img
                                                src={SERVER_BASE_URL + imageD.image}
                                                onError={(e) => {
                                                    e.target.src = noImg
                                                }}
                                            />
                                        </span>
                                    </a>
                                )
                            })
                        }
                        {(likesStr || totalComments > 0) &&
                            <p>
                                {likesStr &&
                                    <Link to={`${routeCodes.POST}/${createdBy.username}/${post._id}`}>{likesStr}</Link>
                                }
                                {totalComments > 0 &&
                                    <Link to={`${routeCodes.POST}/${createdBy.username}/${post._id}`} className="pull-right">Comments {totalComments}</Link>
                                }
                            </p>
                        }
                    </div>
                </div>
                {totalComments > 0 &&
                    <div className="post-comment d-flex">
                        <span>
                            <img
                                src={lastComment.avatar}
                                alt={lastComment.firstName}
                                onError={(e) => {
                                    e.target.src = noProfileImg
                                }}
                            />
                        </span>
                        <div className="post-comment-r">
                            <h4>
                                <NavLink to={`${routeCodes.PROFILE}/${lastComment.username}`}>
                                    {lastComment.firstName} {(lastComment.lastName) ? lastComment.lastName : ''}
                                </NavLink> {(lastComment.comment)}
                            </h4>
                            <div className="post-comment-r-btm d-flex">
                                <p>{lastCommentCreatedAt}</p>
                            </div>
                        </div>
                    </div>
                }
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

    handleOpenLightbox = (images, startFrom = 0) => {
        let lightBoxImages = [];
        images.map((photo) => {
            lightBoxImages.push({ src: SERVER_BASE_URL + photo.image });
        });
        this.setState({ currentImage: startFrom, lightBoxOpen: true, lightBoxImages });
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
    const { user } = state;
    return {
        loggedUserData: user.get('loggedUserData'),
    };
}

export default connect(
    mapStateToProps,
)(ActivityFeedListCard);