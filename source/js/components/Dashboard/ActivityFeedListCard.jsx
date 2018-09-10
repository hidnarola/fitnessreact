import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import { POST_TYPE_TIMELINE, POST_TYPE_GALLERY, POST_TYPE_PROGRESS_PHOTO, ACCESS_LEVEL_PUBLIC, ACCESS_LEVEL_FRIENDS, ACCESS_LEVEL_PRIVATE, SERVER_BASE_URL } from '../../constants/consts';
import _ from "lodash";
import noProfileImg from 'img/common/no-profile-img.png';
import noImg from 'img/common/no-img.png';
import { routeCodes } from '../../constants/routes';
import { FaGlobe, FaLock, FaGroup } from 'react-icons/lib/fa';
import ReactHtmlParser from "react-html-parser";
import cns from 'classnames';

class ActivityFeedListCard extends Component {
    render() {
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
            lastCommentCreatedAt = moment(lastCommentCreatedAt).local().format('Do MMMM [at] hh:mm');
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
                        <small><a href="javascript:void(0)">{(post.tag_line) ? post.tag_line : ''}</a></small>
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
                    <div className={cns("posttype-body-grey", postImageDisplayClass)}>
                        {images && images.length > 0 &&
                            images.map((imageD, imageI) => {
                                if (imageI >= 4) {
                                    return null;
                                }
                                return (
                                    <span key={imageI}>
                                        <img
                                            src={SERVER_BASE_URL + imageD.image}
                                            onError={(e) => {
                                                e.target.src = noImg
                                            }}
                                        />
                                    </span>
                                )
                            })
                        }
                        {(likesStr || totalComments > 0) &&
                            <p>
                                {likesStr &&
                                    <a href="javascript:void(0)" onClick={() => { }}>{likesStr}</a>
                                }
                                {totalComments > 0 &&
                                    <a href="javascript:void(0)" className="pull-right">Comments {totalComments}</a>
                                }
                            </p>
                        }
                    </div>
                </div>
                <div className="posttype-btm d-flex">
                    <a href="javascript:void(0)" className="icon-chat"></a>
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
            </div>
        );
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