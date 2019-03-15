import React, { Component } from 'react';
import { connect } from "react-redux";
import { NavLink, Link, withRouter } from "react-router-dom";
import {
    POST_TYPE_TIMELINE,
    POST_TYPE_GALLERY,
    POST_TYPE_PROGRESS_PHOTO,
    POST_TYPE_WORKOUT,
    ACCESS_LEVEL_PUBLIC,
    ACCESS_LEVEL_FRIENDS,
    ACCESS_LEVEL_PRIVATE,
    FRIENDSHIP_STATUS_SELF,
    ACCESS_LEVEL_PUBLIC_STR,
    ACCESS_LEVEL_FRIENDS_STR,
    ACCESS_LEVEL_PRIVATE_STR,
    SERVER_BASE_URL
} from '../../constants/consts';
import moment from "moment";
import _ from "lodash";
import { MenuItem, Dropdown } from "react-bootstrap";
import cns from "classnames";
import noProfileImg from 'img/common/no-profile-img.png'
import noImg from 'img/common/no-img.png'
import LikeButton from './LikeButton';
import CommentBoxForm from './CommentBoxForm';
import LikesListModal from '../Common/LikesListModal';
import { FaGlobe, FaLock, FaGroup } from 'react-icons/lib/fa';
import { routeCodes } from '../../constants/routes';
import { replaceStringWithEmos } from '../../helpers/funs';

class PostCard extends Component {
    constructor(props) {
        super(props);
        this.commentBoxRef = React.createRef();
    }

    render() {
        const {
            post,
            handleOpenChangeAccessPostModal,
            handleOpenDeletePostModal,
            handleOpenLightbox,
            toggleShowLikesModal,
            handleToggleLike,
            handleComment,
            match,
            profile,
            index,
            loggedUserData,
            showCommentBox,
            commentLoading
        } = this.props;
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
            <div className="post-type" key={post._id}>
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
                            <Link to={`${routeCodes.POST}/${match.params.username}/${post._id}`} className="pull-right post_added">{(post.tag_line) ? post.tag_line : ''}</Link>
                        </big>
                        <div className="post-bottom-info">
                            <p className="">
                                {postCreatedAt}
                            </p>
                            {!(profile.friendshipStatus === FRIENDSHIP_STATUS_SELF) &&
                                <p className="access-level-icons">
                                    {post.privacy == ACCESS_LEVEL_PUBLIC && <FaGlobe />}
                                    {post.privacy == ACCESS_LEVEL_FRIENDS && <FaGroup />}
                                    {post.privacy == ACCESS_LEVEL_PRIVATE && <FaLock />}
                                </p>
                            }
                            {profile.friendshipStatus === FRIENDSHIP_STATUS_SELF &&
                                <Dropdown id="single_post_privacy" className="single_post_privacy">
                                    <Dropdown.Toggle className="d-flex public-dropdown">
                                        {post.privacy == ACCESS_LEVEL_PUBLIC && <FaGlobe />}
                                        {post.privacy == ACCESS_LEVEL_FRIENDS && <FaGroup />}
                                        {post.privacy == ACCESS_LEVEL_PRIVATE && <FaLock />}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <MenuItem eventKey="3" onClick={() => handleOpenChangeAccessPostModal(ACCESS_LEVEL_PUBLIC, post._id)}><FaGlobe /> {ACCESS_LEVEL_PUBLIC_STR}</MenuItem>
                                        <MenuItem eventKey="2" onClick={() => handleOpenChangeAccessPostModal(ACCESS_LEVEL_FRIENDS, post._id)}><FaGroup /> {ACCESS_LEVEL_FRIENDS_STR}</MenuItem>
                                        <MenuItem eventKey="1" onClick={() => handleOpenChangeAccessPostModal(ACCESS_LEVEL_PRIVATE, post._id)}><FaLock /> {ACCESS_LEVEL_PRIVATE_STR}</MenuItem>
                                    </Dropdown.Menu>
                                </Dropdown>
                            }
                        </div>
                    </h4>
                    {profile.friendshipStatus === FRIENDSHIP_STATUS_SELF &&
                        <button type="button" className="timline-post-del-btn" onClick={() => handleOpenDeletePostModal(post._id)}>
                            <i className="icon-cancel"></i>
                        </button>
                    }
                </div>
                <div className="posttype-body">
                    {description &&
                        <div className="posttype-body-white">
                            <small dangerouslySetInnerHTML={{ __html: description }}></small>
                        </div>
                    }
                    <div className={cns("posttype-body-grey", postImageDisplayClass)}>
                        {images && images.length > 0 &&
                            images.map((imageD, imageI) => {
                                if (imageI >= 5) {
                                    return null;
                                }
                                return (
                                    <div className="item" key={imageD._id}>
                                        <a href="javascript:void(0)" onClick={() => handleOpenLightbox(images, imageI)}>
                                            <span key={imageI}>
                                                <img
                                                    src={SERVER_BASE_URL + imageD.image}
                                                    onError={(e) => {
                                                        e.target.src = noImg
                                                    }}
                                                />
                                            </span>
                                        </a>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className={cns("posttype-body-grey")}>
                        <p>
                            {likesStr &&
                                <a href="javascript:void(0)" onClick={() => toggleShowLikesModal(post._id)}>{likesStr}</a>
                            }
                            {totalComments > 0 &&
                                <Link to={`${routeCodes.POST}/${match.params.username}/${post._id}`} className="pull-right">Comments {totalComments}</Link>
                            }
                        </p>
                        <div className="posttype-btm d-flex">
                            <LikeButton
                                index={index}
                                postId={post._id}
                                isLikedByLoggedUser={isLikedByLoggedUser}
                                handleToggleLike={handleToggleLike}
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
                                <p>{lastCommentCreatedAt}</p>
                            </h4>
                            <div className="post-comment-r-btm">
                                <small dangerouslySetInnerHTML={{ __html: replaceStringWithEmos(lastComment.comment) }}></small>
                            </div>
                        </div>
                    </div>
                }
                {showCommentBox &&
                    <CommentBoxForm
                        ref={this.commentBoxRef}
                        postId={post._id}
                        index={index}
                        handleComment={handleComment}
                        isLoading={commentLoading}
                    />
                }
                <LikesListModal
                    show={post.showLikesModal ? post.showLikesModal : false}
                    handleClose={() => toggleShowLikesModal(post._id)}
                    likes={likes}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { postComments } = state;
    return {
        commentLoading: postComments.get('loading'),
    };
}

PostCard = connect(mapStateToProps)(PostCard)

export default withRouter(PostCard);