import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import moment from 'moment';
import { POST_TYPE_TIMELINE, POST_TYPE_GALLERY, POST_TYPE_PROGRESS_PHOTO, ACCESS_LEVEL_PUBLIC, ACCESS_LEVEL_FRIENDS, ACCESS_LEVEL_PRIVATE, SERVER_BASE_URL, FRIENDSHIP_STATUS_FRIEND, POST_TYPE_WORKOUT } from '../../constants/consts';
import _ from "lodash";
import noProfileImg from 'img/common/no-profile-img.png';
import noImg from 'img/common/no-img.png';
import { routeCodes } from '../../constants/routes';
import { FaGlobe, FaLock, FaGroup } from 'react-icons/lib/fa';
import ReactHtmlParser from "react-html-parser";
import cns from 'classnames';
import Lightbox from 'react-images';
import LikeButton from '../Profile/LikeButton';
import CommentBoxForm from '../Profile/CommentBoxForm';
import LikesListModal from '../Common/LikesListModal';
import { replaceStringWithEmos } from '../../helpers/funs';

class ActivityFeedListCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lightBoxOpen: false,
            currentImage: 0,
            lightBoxImages: [],

            showLikes: false,
        }
        this.commentBoxRef = React.createRef();
    }

    render() {
        const { lightBoxOpen, currentImage, lightBoxImages, showLikes } = this.state;
        const { post, loggedUserData, index, postCommentLoading } = this.props;
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
        } else if (type === POST_TYPE_WORKOUT) {
            description = post.post_description;
        } else {
            return null;
        }
        description = replaceStringWithEmos(description);
        var imagesCount = images.length;
        var postImageDisplayClass = 'masonry';
        if (imagesCount === 1) {
            postImageDisplayClass += ' single';
        } else if (imagesCount <= 0) {
            postImageDisplayClass = '';
        }
        var comments = post.comments;
        var totalComments = comments.length;
        var lastComment = {};
        var lastCommentCreatedAt = null;
        if (totalComments > 0) {
            lastComment = comments[0];
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
                            <Link className="post_added" to={`${routeCodes.POST}/${createdBy.username}/${post._id}`}>{(post.tag_line) ? post.tag_line : ''}</Link>
                        </big>
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
                            {ReactHtmlParser(description)}
                        </div>
                    }
                    <div className={cns("posttype-body-grey dashboard-feedact", postImageDisplayClass)}>
                        {images && images.length > 0 &&
                            images.map((imageD, imageI) => {
                                if (imageI >= 5) {
                                    return null;
                                }
                                return (
                                    <a href="javascript:void(0)" key={imageD._id} onClick={() => this.handleOpenLightbox(images, imageI)}>
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
                    </div>
                    <div className={cns("posttype-body-grey")}>
                        <p>
                            {likesStr &&
                                <a href="javascript:void(0)" onClick={this.handleOpenLikesModal}>{likesStr}</a>
                            }
                            {totalComments > 0 &&
                                <Link to={`${routeCodes.POST}/${createdBy.username}/${post._id}`} className="pull-right">Comments {totalComments}</Link>
                            }
                        </p>
                        <div className="posttype-btm d-flex">
                            <LikeButton
                                index={index}
                                postId={post._id}
                                isLikedByLoggedUser={isLikedByLoggedUser}
                                handleToggleLike={this.handleToggleLike}
                            />
                            <a href="javascript:void(0)" className="icon-chat" onClick={() => this.commentBoxRef.current.focus()}></a>
                        </div>
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
                                </NavLink>
                            </h4>
                            <div className="post-comment-r-btm d-flex">
                                <p>{lastCommentCreatedAt}</p>
                            </div>
                            {ReactHtmlParser(replaceStringWithEmos(lastComment.comment))}
                        </div>
                    </div>
                }
                {
                    post && post.owner_by &&
                    post.owner_by.userPreferences &&
                    post.owner_by.userPreferences.commentAccessibility &&
                    post.owner_by.userPreferences.commentAccessibility == ACCESS_LEVEL_PUBLIC &&
                    <CommentBoxForm
                        ref={this.commentBoxRef}
                        postId={post._id}
                        index={index}
                        handleComment={this.handleComment}
                        isLoading={postCommentLoading}
                    />
                }
                {
                    post && post.owner_by &&
                    post.owner_by.userPreferences &&
                    post.owner_by.userPreferences.commentAccessibility &&
                    post.owner_by.userPreferences.commentAccessibility == ACCESS_LEVEL_FRIENDS &&
                    post.friendshipStatus && post.friendshipStatus == FRIENDSHIP_STATUS_FRIEND &&
                    <CommentBoxForm
                        ref={this.commentBoxRef}
                        postId={post._id}
                        index={index}
                        handleComment={this.handleComment}
                        isLoading={postCommentLoading}
                    />
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
                <LikesListModal
                    show={showLikes}
                    handleClose={this.handleCloseLikesModal}
                    likes={likes}
                />
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

    handleToggleLike = (index, postId) => {
        const { handleToggleLike } = this.props;
        handleToggleLike(index, postId);
    }

    handleComment = (data) => {
        const { handleComment } = this.props;
        handleComment(data);
    }

    handleOpenLikesModal = () => {
        this.setState({ showLikes: true });
    }

    handleCloseLikesModal = () => {
        this.setState({ showLikes: false });
    }
}

const mapStateToProps = (state) => {
    const { user, postComments } = state;
    return {
        loggedUserData: user.get('loggedUserData'),
        postCommentLoading: postComments.get('loading'),
    };
}

export default connect(
    mapStateToProps,
)(ActivityFeedListCard);