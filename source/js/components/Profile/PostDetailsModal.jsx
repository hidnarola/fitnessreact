import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import ReactHtmlParser from "react-html-parser";
import CommentBoxForm from './CommentBoxForm';
import { NavLink } from "react-router-dom";
import moment from "moment";
import _ from "lodash";
import cns from "classnames";
import {
    POST_TYPE_TIMELINE,
    POST_TYPE_GALLERY,
    POST_TYPE_PROGRESS_PHOTO,
    SERVER_BASE_URL
} from '../../constants/consts';
import { routeCodes } from '../../constants/routes';
import LikeButton from "./LikeButton";
import noProfileImg from 'img/common/no-profile-img.png'
import noImg from 'img/common/no-img.png'

class PostDetailsModal extends Component {
    render() {
        const {
            show,
            handleClose,
            post,
            loggedUserData,
            postIndex,
            handleToggleLike,
            handleComment,
        } = this.props;
        if (post) {
            var createdBy = (post.created_by && Object.keys(post.created_by).length > 0) ? post.created_by : null;
            if (!createdBy) {
                return null;
            }
            var postCreatedAt = post.createdAt;
            postCreatedAt = moment.utc(postCreatedAt).toDate();
            postCreatedAt = moment(postCreatedAt).local().format('Do MMMM [at] hh:mm');
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
            var likes = post.likes;
            var totalLikes = likes.length;
            var likesStr = '';
            var isLikedByLoggedUser = false;
            if (totalLikes > 0) {
                var likedOfLoggedUser = _.find(likes, ['authUserId', loggedUserData.authId]);
                if (likedOfLoggedUser) {
                    isLikedByLoggedUser = true;
                }
                if (totalLikes > 4) {
                    for (let i = 0; i < 2; i++) {
                        const obj = likes[i];
                        if (obj) {
                            likesStr += obj.firstName;
                            if (obj.lastName) {
                                likesStr += ' ' + obj.lastName;
                            }
                            if ((i - 1) !== 2) {
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
                <div className="post-details-modal-wrapper">
                    <Modal show={show} bsSize="large" className="gallery-popup post-details-popup">
                        <div className="gallery-popup-head">
                            <button type="button" className="close-round" onClick={handleClose}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h3 className="title-h3">Post details</h3>
                        </div>

                        <div className="progress-popup-body d-flex">
                            <div className="post-type">
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
                                    <h4 className="vertical-middle-c">
                                        <big>
                                            <NavLink to={`${routeCodes.PROFILE}/${createdBy.username}`}>
                                                {`${createdBy.firstName} ${(createdBy.lastName) ? createdBy.lastName : ''}`}
                                            </NavLink>
                                        </big>
                                        <small>{(post.tag_line) ? post.tag_line : ''}</small>
                                    </h4>
                                    <p className="vertical-middle-c">{postCreatedAt}</p>
                                </div>
                                <div className="posttype-body">
                                    {description &&
                                        <div className="posttype-body-white">
                                            {ReactHtmlParser(description)}
                                        </div>
                                    }
                                    <div className={cns("posttype-body-grey", postImageDisplayClass)}>
                                        {images && imagesCount > 0 &&
                                            images.map((imageD, imageI) => {
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
                                        {likesStr &&
                                            <p>{likesStr}</p>
                                        }
                                        {totalComments > 0 &&
                                            <p>Comments {totalComments}</p>
                                        }
                                    </div>
                                </div>
                                <div className="posttype-btm d-flex">
                                    <LikeButton
                                        index={postIndex}
                                        postId={post._id}
                                        isLikedByLoggedUser={isLikedByLoggedUser}
                                        handleToggleLike={handleToggleLike}
                                    />
                                </div>
                                {totalComments > 0 &&
                                    comments.map((commentD, commnetI) => {
                                        var createdAt = commentD.create_date;
                                        createdAt = moment.utc(createdAt).toDate();
                                        createdAt = moment(createdAt).local().format('Do MMMM [at] hh:mm');
                                        return (
                                            <div className="post-comment d-flex">
                                                <span>
                                                    <img
                                                        src={commentD.avatar}
                                                        alt={commentD.firstName}
                                                        onError={(e) => {
                                                            e.target.src = noProfileImg
                                                        }}
                                                    />
                                                </span>
                                                <div className="post-comment-r">
                                                    <h4>
                                                        <NavLink to={`${routeCodes.PROFILE}/${commentD.username}`}>
                                                            {commentD.firstName} {(commentD.lastName) ? commentD.lastName : ''}
                                                        </NavLink> {(commentD.comment)}
                                                    </h4>
                                                    <div className="post-comment-r-btm d-flex">
                                                        <p>{createdAt}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                <CommentBoxForm
                                    index={postIndex}
                                    postId={post._id}
                                    onSubmit={handleComment}
                                />
                            </div>
                        </div>
                    </Modal>
                </div >
            );
        }
        return null;
    }
}

export default PostDetailsModal;