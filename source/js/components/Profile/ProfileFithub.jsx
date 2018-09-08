import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getUserTimelineRequest, getUserSingleTimelineRequest, addPostOnUserTimelineRequest } from '../../actions/userTimeline';
import _ from "lodash";
import noProfileImg from 'img/common/no-profile-img.png'
import noImg from 'img/common/no-img.png'
import moment from "moment";
import {
    POST_TYPE_TIMELINE,
    POST_TYPE_GALLERY,
    POST_TYPE_PROGRESS_PHOTO,
    SERVER_BASE_URL,
    ACCESS_LEVEL_PUBLIC,
    ACCESS_LEVEL_FRIENDS,
    ACCESS_LEVEL_PRIVATE,
    ACCESS_LEVEL_PUBLIC_STR,
    ACCESS_LEVEL_FRIENDS_STR,
    ACCESS_LEVEL_PRIVATE_STR,
    FRIENDSHIP_STATUS_SELF,
    TIMELINE_WIDGET_MUSCLE,
    TIMELINE_WIDGET_PROGRESS_PHOTO,
    TIMELINE_WIDGET_BADGES,
    TIMELINE_WIDGET_BODY_FAT,
    TIMELINE_MUSCLE_WIDGET_NECK,
    TIMELINE_MUSCLE_WIDGET_SHOULDER,
    TIMELINE_MUSCLE_WIDGET_CHEST,
    TIMELINE_MUSCLE_WIDGET_UPPER_ARM,
    TIMELINE_MUSCLE_WIDGET_WAIST,
    TIMELINE_MUSCLE_WIDGET_FOREARM,
    TIMELINE_MUSCLE_WIDGET_HIPS,
    TIMELINE_MUSCLE_WIDGET_THIGH,
    TIMELINE_MUSCLE_WIDGET_CALF,
    TIMELINE_MUSCLE_WIDGET_HEART_RATE,
    TIMELINE_MUSCLE_WIDGET_WEIGHT,
    TIMELINE_MUSCLE_WIDGET_HEIGHT
} from '../../constants/consts';
import cns from "classnames";
import { routeCodes } from '../../constants/routes';
import { NavLink } from "react-router-dom";
import { toggleLikeOnPostRequest } from '../../actions/postLikes';
import CommentBoxForm from './CommentBoxForm';
import { commentOnPostRequest } from '../../actions/postComments';
import { initialize, reset } from "redux-form";
import ReactHtmlParser from "react-html-parser";
import ReactQuill from 'react-quill';
import { te } from '../../helpers/funs';
import InfiniteScroll from 'react-infinite-scroller';
import { FaCircleONotch } from "react-icons/lib/fa";
import { MenuItem, Dropdown, DropdownButton } from "react-bootstrap";
import { FaGlobe, FaLock, FaGroup } from 'react-icons/lib/fa';
import AddPostPhotoModal from './AddPostPhotoModal';
import PostDetailsModal from './PostDetailsModal';
import LikeButton from "./LikeButton";
import ProfileFithubBodyFatCard from './ProfileFithubBodyFatCard';
import WidgetsListModal from './WidgetsListModal';
import { getTimelineWidgetsAndWidgetsDataRequest, saveTimelineWidgetsRequest } from '../../actions/timelineWidgets';
import ProfileFithubBadgesCard from './ProfileFithubBadgesCard';
import ProfileFithubProgressPhotoCard from './ProfileFithubProgressPhotoCard';
import ProfileFithubMuscleCard from './ProfileFithubMuscleCard';

class ProfileFithub extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            start: 0,
            offset: 10,
            hasMorePosts: true,
            selectActionInit: false,
            likeActionInit: false,
            selectedTimelineIndex: null,
            selectedTimelineId: null,
            commentActionInit: false,
            postContent: '',
            postImages: [],
            postPrivacy: ACCESS_LEVEL_PRIVATE,
            newPostActionInit: false,
            showPostPhotoModal: false,
            selectedPostForDetailsIndex: null,
            selectedPostForDetails: null,
            showPostDetailsModal: false,
            showAddWidgetModal: false,
        }
    }

    componentWillMount() {
        const { dispatch, match } = this.props;
        if (match.params.username) {
            dispatch(getTimelineWidgetsAndWidgetsDataRequest(match.params.username));
        }
    }

    componentWillReceiveProps(nextProps) {
        const {
            match,
            activeProfile,
        } = nextProps;
        if (activeProfile && activeProfile.friendshipStatus === FRIENDSHIP_STATUS_SELF && this.state.postPrivacy !== ACCESS_LEVEL_PUBLIC) {
            this.setState({ postPrivacy: ACCESS_LEVEL_PUBLIC });
        } else if (activeProfile && activeProfile.friendshipStatus !== FRIENDSHIP_STATUS_SELF && this.state.postPrivacy !== ACCESS_LEVEL_PRIVATE) {
            this.setState({ postPrivacy: ACCESS_LEVEL_PRIVATE });
        }
        if (match.params.username !== this.props.match.params.username) {
            this.setState({
                posts: [],
                start: 0,
                offset: 10,
                hasMorePosts: true,
            });
        }
    }

    render() {
        const {
            posts,
            postContent,
            postPrivacy,
            hasMorePosts,
            showPostPhotoModal,
            showPostDetailsModal,
            selectedPostForDetailsIndex,
            selectedPostForDetails,
            postImages,
            showAddWidgetModal,
        } = this.state;
        const {
            loggedUserData,
            activeProfile,
            userWidgets,
            tilelineWidgetsLoading,
        } = this.props;
        return (
            <div className="row">
                <div className="col-md-6">
                    {activeProfile && activeProfile.friendshipStatus === FRIENDSHIP_STATUS_SELF &&
                        <div className="add-widgets">
                            <button type="button" onClick={this.handleShowWidgetModal} disabled={tilelineWidgetsLoading}>
                                <span>Add Widgets</span>
                                <i className="icon-widgets"></i>
                            </button>
                        </div>
                    }

                    {userWidgets && typeof userWidgets[TIMELINE_WIDGET_PROGRESS_PHOTO] !== 'undefined' && userWidgets[TIMELINE_WIDGET_PROGRESS_PHOTO] === 1 &&
                        <ProfileFithubProgressPhotoCard />
                    }

                    {userWidgets && userWidgets[TIMELINE_WIDGET_BODY_FAT] &&
                        <ProfileFithubBodyFatCard />
                    }

                    {userWidgets && userWidgets[TIMELINE_WIDGET_MUSCLE] && userWidgets[TIMELINE_WIDGET_MUSCLE].length > 0 &&
                        <ProfileFithubMuscleCard />
                    }

                    {userWidgets && typeof userWidgets[TIMELINE_WIDGET_BADGES] !== 'undefined' && userWidgets[TIMELINE_WIDGET_BADGES] === 1 &&
                        <ProfileFithubBadgesCard />
                    }
                </div>

                <div className="col-md-6">
                    <div className="white-box space-btm-20">
                        <div className="whitebox-head d-flex">
                            <h3 className="title-h3">Timeline</h3>
                        </div>
                        <div className="whitebox-body">
                            <div className="how-training timeline-new-post-editor">
                                <ReactQuill
                                    value={postContent}
                                    onChange={this.handlePostContentChange}
                                    placeholder="What's in your mind"
                                    modules={{
                                        toolbar: ['bold', 'italic', 'underline', 'strike']
                                    }}
                                />
                                {postImages && postImages.length > 0 &&
                                    <div className="post-photos-selected-view-wrapper">
                                        <ul>
                                            {postImages.map((img, imgI) => {
                                                return (
                                                    <li key={imgI}>
                                                        <img
                                                            src={img.preview}
                                                        />
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                }
                                <div className="how-training-btm d-flex justify-content-end">
                                    <a href="javascript:void(0)" onClick={this.handleShowPostPhotosModal}>
                                        <i className="icon-photo_size_select_actual vertical-middle-c"></i>
                                    </a>
                                    {activeProfile && activeProfile.friendshipStatus === FRIENDSHIP_STATUS_SELF &&
                                        <Dropdown id="post_privacy">
                                            <Dropdown.Toggle className="d-flex public-dropdown">
                                                {postPrivacy === ACCESS_LEVEL_PUBLIC && <span><FaGlobe /><strong>{ACCESS_LEVEL_PUBLIC_STR}</strong></span>}
                                                {postPrivacy === ACCESS_LEVEL_FRIENDS && <span><FaGroup /><strong>{ACCESS_LEVEL_FRIENDS_STR}</strong></span>}
                                                {postPrivacy === ACCESS_LEVEL_PRIVATE && <span><FaLock /><strong>{ACCESS_LEVEL_PRIVATE_STR}</strong></span>}
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <MenuItem eventKey="3" onClick={() => this.handlePostPrivacy(ACCESS_LEVEL_PUBLIC)}><FaGlobe /> {ACCESS_LEVEL_PUBLIC_STR}</MenuItem>
                                                <MenuItem eventKey="2" onClick={() => this.handlePostPrivacy(ACCESS_LEVEL_FRIENDS)}><FaGroup /> {ACCESS_LEVEL_FRIENDS_STR}</MenuItem>
                                                <MenuItem eventKey="1" onClick={() => this.handlePostPrivacy(ACCESS_LEVEL_PRIVATE)}><FaLock /> {ACCESS_LEVEL_PRIVATE_STR}</MenuItem>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    }
                                    <button type="button" onClick={this.handleMakePost} className="vertical-middle-r">
                                        Post<i className="icon-send"></i>
                                    </button>
                                </div>
                            </div>

                            <InfiniteScroll
                                pageStart={0}
                                loadMore={this.loadPostsData}
                                hasMore={hasMorePosts}
                                className="margin-top-30 timeline-infinite-scroll"
                                loader={
                                    <div className="loader" key={0}><FaCircleONotch className="loader-spinner loader-spinner-icon" /> Loading ...</div>
                                }
                            >
                                {
                                    posts.map((post, index) => {
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
                                            <div className="post-type" key={index}>
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
                                                        <small><a href="javascript:void(0)" onClick={() => this.handleShowPostDetailsModal(index)}>{(post.tag_line) ? post.tag_line : ''}</a></small>
                                                        <p className="">
                                                            {postCreatedAt}
                                                            {post.privacy == ACCESS_LEVEL_PUBLIC && <FaGlobe />}
                                                            {post.privacy == ACCESS_LEVEL_FRIENDS && <FaGroup />}
                                                            {post.privacy == ACCESS_LEVEL_PRIVATE && <FaLock />}
                                                        </p>
                                                    </h4>
                                                    <DropdownButton
                                                        key={index}
                                                        title={''}
                                                        id={`post_actions_${index}`}
                                                    >
                                                        <MenuItem eventKey="1">Action</MenuItem>
                                                    </DropdownButton>
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
                                                                    <a href="javascript:void(0)" className="pull-right" onClick={() => this.handleShowPostDetailsModal(index)}>Comments {totalComments}</a>
                                                                }
                                                            </p>
                                                        }
                                                    </div>
                                                </div>
                                                <div className="posttype-btm d-flex">
                                                    <LikeButton
                                                        index={index}
                                                        postId={post._id}
                                                        isLikedByLoggedUser={isLikedByLoggedUser}
                                                        handleToggleLike={this.handleToggleLike}
                                                    />
                                                    <a href="javascript:void(0)" onClick={() => this.handleShowPostDetailsModal(index)} className="icon-chat"></a>
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
                                                <CommentBoxForm
                                                    index={index}
                                                    postId={post._id}
                                                    onSubmit={this.handleComment}
                                                />
                                            </div>
                                        );
                                    })
                                }
                            </InfiniteScroll>
                        </div>
                    </div>
                </div>
                <AddPostPhotoModal
                    show={showPostPhotoModal}
                    handleClose={this.handleHidePostPhotosModal}
                    images={postImages}
                    handleAddPostImages={this.handleAddPostImages}
                    handleRemovePostImags={this.handleRemovePostImage}
                />
                <PostDetailsModal
                    show={showPostDetailsModal}
                    handleClose={this.handleHidePostDetailsModal}
                    postIndex={selectedPostForDetailsIndex}
                    post={selectedPostForDetails}
                    loggedUserData={loggedUserData}
                    handleToggleLike={this.handleToggleLike}
                    handleComment={this.handleComment}
                />

                <WidgetsListModal
                    show={showAddWidgetModal}
                    handleClose={this.handleHideWidgetModal}
                    onSubmit={this.handleSaveWidget}
                />
            </div>
        );
    }

    componentDidUpdate(prevProps, nextProps) {
        const {
            selectActionInit,
            start,
            offset,
            likeActionInit,
            selectedTimelineIndex,
            selectedTimelineId,
            commentActionInit,
            newPostActionInit,
        } = this.state;
        const {
            dispatch,
            postLoading,
            posts,
            post,
            error,
            likeLoading,
            likePost,
            likeError,
            commentLoading,
            commentPost,
            commentError,
            forceUpdateChildComponents,
            setForceUpdateChildComponents,
            saveWidgetsLoading,
            saveWidgetsError,
            match,
        } = this.props;
        if (selectActionInit && !postLoading) {
            var hasMorePosts = (posts && posts.length > 0) ? true : false;
            var newPosts = this.state.posts;
            if (posts && posts.length > 0) {
                newPosts = _.concat(this.state.posts, posts);
            }
            this.setState({
                selectActionInit: false,
                posts: newPosts,
                start: (start + offset),
                hasMorePosts,
            });
        }
        if (newPostActionInit && !postLoading) {
            var newPostsState = this.state.posts;
            if (error && error.length > 0) {
                // show errors
            } else {
                newPostsState.splice(0, 0, post);
            }
            this.setState({
                newPostActionInit: false,
                posts: newPostsState,
                postContent: '',
                postPrivacy: ACCESS_LEVEL_PUBLIC,
                postImages: [],
            });
        }
        if (likeActionInit && !likeLoading) {
            var newPostsState = this.state.posts;
            var selectedPostForDetails = this.state.selectedPostForDetails;
            if (likeError && likeError.length > 0) {
                te(likeError[0]);
            } else {
                newPostsState[selectedTimelineIndex] = likePost;
            }
            if (this.state.showPostDetailsModal) {
                selectedPostForDetails = likePost;
            }
            this.setState({
                likeActionInit: false,
                selectedTimelineIndex: null,
                selectedTimelineId: null,
                posts: newPostsState,
                selectedPostForDetails,
            });
        }
        if (commentActionInit && !commentLoading) {
            var newPostsState = this.state.posts;
            var selectedPostForDetails = this.state.selectedPostForDetails;
            if (commentError && commentError.length > 0) {
                te(commentError[0]);
            } else {
                newPostsState[selectedTimelineIndex] = commentPost;
            }
            if (this.state.showPostDetailsModal) {
                selectedPostForDetails = commentPost;
            }
            var formData = {
                [`comment_${selectedTimelineId}`]: '',
            };
            dispatch(reset('commentBoxForm'));
            this.setState({
                commentActionInit: false,
                selectedTimelineIndex: null,
                selectedTimelineId: null,
                posts: newPostsState,
                selectedPostForDetails,
            });
        }
        if (forceUpdateChildComponents) {
            this.setState({
                posts: [],
                start: 0,
                offset: 10,
                hasMorePosts: true,
            }, () => {
                this.loadPostsData();
            });
            setForceUpdateChildComponents(false);
        }
        if (!saveWidgetsLoading && prevProps.saveWidgetsLoading !== saveWidgetsLoading) {
            if (saveWidgetsError && saveWidgetsError.length > 0) {
                te('Something went wrong! please try again later.');
            }
            this.handleHideWidgetModal();
            if (match.params.username) {
                dispatch(getTimelineWidgetsAndWidgetsDataRequest(match.params.username));
            }
        }
    }

    handleToggleLike = (index, postId) => {
        const { dispatch } = this.props;
        var requestData = {
            postId: postId
        };
        this.setState({
            likeActionInit: true,
            selectedTimelineIndex: index,
            selectedTimelineId: postId,
        });
        dispatch(toggleLikeOnPostRequest(requestData));
    }

    handleComment = (data, actionGenerator, props) => {
        const { dispatch } = this.props;
        var index = props.index;
        var postId = props.postId;
        var comment = data[`comment_${postId}`].trim();
        if (comment) {
            var requestData = {
                comment: comment.replace(/\n/gi, '<br/>'),
                postId: postId,
            };
            this.setState({
                selectedTimelineIndex: index,
                selectedTimelineId: postId,
                commentActionInit: true,
            });
            dispatch(commentOnPostRequest(requestData));
        }
    }

    handlePostPrivacy = (access) => {
        this.setState({ postPrivacy: access });
    }

    handlePostContentChange = (content, delta, source, editor) => {
        var editorText = editor.getText().trim();
        if (editorText !== '' && editorText !== '\n') {
            this.setState({ postContent: content });
        } else {
            this.setState({ postContent: '' });
        }
    }

    handleMakePost = () => {
        const {
            postContent,
            postPrivacy,
            postImages,
        } = this.state;
        const {
            activeProfile,
            dispatch,
        } = this.props;
        if ((postContent) || (postImages && postImages.length > 0)) {
            var formData = new FormData();
            formData.append('description', postContent);
            formData.append('privacy', postPrivacy);
            formData.append('onWall', activeProfile.authUserId);
            if (postImages.length > 0) {
                postImages.map((img, index) => {
                    formData.append('images', img);
                })
            }
            this.setState({ newPostActionInit: true });
            dispatch(addPostOnUserTimelineRequest(formData));
        }
    }

    loadPostsData = () => {
        const {
            start,
            offset,
            selectActionInit,
        } = this.state;
        const {
            match,
            dispatch,
        } = this.props;
        if (!selectActionInit && match.params && match.params.username) {
            var username = match.params.username;
            dispatch(getUserTimelineRequest(username, start, offset));
            this.setState({ selectActionInit: true });
        }
    }

    handleShowPostPhotosModal = () => {
        this.setState({ showPostPhotoModal: true });
    }

    handleHidePostPhotosModal = () => {
        this.setState({ showPostPhotoModal: false });
    }

    handleAddPostImages = (filesToUpload, e) => {
        const { postImages } = this.state;
        var allImages = _.concat(postImages, filesToUpload);
        this.setState({ postImages: allImages });
    }

    handleRemovePostImage = (index) => {
        var postImages = this.state.postImages;
        postImages.splice(index, 1);
        this.setState({ postImages });
    }

    handleShowPostDetailsModal = (index) => {
        const { posts } = this.state;
        var selectedPost = posts[index];
        this.setState({
            showPostDetailsModal: true,
            selectedPostForDetailsIndex: index,
            selectedPostForDetails: selectedPost,
        });
    }

    handleHidePostDetailsModal = () => {
        this.setState({
            showPostDetailsModal: false,
            selectedPostForDetailsIndex: null,
            selectedPostForDetails: null,
        });
    }

    handleShowWidgetModal = () => {
        const { dispatch, userWidgets } = this.props;
        var formData = {
            [`timeline_${TIMELINE_WIDGET_MUSCLE}`]: false,
            [`timeline_${TIMELINE_WIDGET_PROGRESS_PHOTO}`]: false,
            [`timeline_${TIMELINE_WIDGET_BADGES}`]: false,
            [`timeline_${TIMELINE_WIDGET_BODY_FAT}`]: false,
            [`muscle_${TIMELINE_MUSCLE_WIDGET_NECK}`]: false,
            [`muscle_${TIMELINE_MUSCLE_WIDGET_SHOULDER}`]: false,
            [`muscle_${TIMELINE_MUSCLE_WIDGET_CHEST}`]: false,
            [`muscle_${TIMELINE_MUSCLE_WIDGET_UPPER_ARM}`]: false,
            [`muscle_${TIMELINE_MUSCLE_WIDGET_WAIST}`]: false,
            [`muscle_${TIMELINE_MUSCLE_WIDGET_FOREARM}`]: false,
            [`muscle_${TIMELINE_MUSCLE_WIDGET_HIPS}`]: false,
            [`muscle_${TIMELINE_MUSCLE_WIDGET_THIGH}`]: false,
            [`muscle_${TIMELINE_MUSCLE_WIDGET_CALF}`]: false,
            [`muscle_${TIMELINE_MUSCLE_WIDGET_HEART_RATE}`]: false,
            [`muscle_${TIMELINE_MUSCLE_WIDGET_WEIGHT}`]: false,
            [`muscle_${TIMELINE_MUSCLE_WIDGET_HEIGHT}`]: false,
        };
        if (userWidgets && typeof userWidgets[TIMELINE_WIDGET_BADGES] !== 'undefined' && userWidgets[TIMELINE_WIDGET_BADGES] === 1) {
            formData[`timeline_${TIMELINE_WIDGET_BADGES}`] = true;
        }
        if (userWidgets && typeof userWidgets[TIMELINE_WIDGET_PROGRESS_PHOTO] !== 'undefined' && userWidgets[TIMELINE_WIDGET_PROGRESS_PHOTO] === 1) {
            formData[`timeline_${TIMELINE_WIDGET_PROGRESS_PHOTO}`] = true;
        }
        if (userWidgets && userWidgets[TIMELINE_WIDGET_BODY_FAT]) {
            formData[`timeline_${TIMELINE_WIDGET_BODY_FAT}`] = true;
        }
        if (userWidgets && userWidgets[TIMELINE_WIDGET_MUSCLE] && userWidgets[TIMELINE_WIDGET_MUSCLE].length > 0) {
            userWidgets[TIMELINE_WIDGET_MUSCLE].map((o, i) => {
                if (o.name === TIMELINE_MUSCLE_WIDGET_NECK) {
                    formData[`muscle_${TIMELINE_MUSCLE_WIDGET_NECK}`] = true;
                }
                if (o.name === TIMELINE_MUSCLE_WIDGET_SHOULDER) {
                    formData[`muscle_${TIMELINE_MUSCLE_WIDGET_SHOULDER}`] = true;
                }
                if (o.name === TIMELINE_MUSCLE_WIDGET_CHEST) {
                    formData[`muscle_${TIMELINE_MUSCLE_WIDGET_CHEST}`] = true;
                }
                if (o.name === TIMELINE_MUSCLE_WIDGET_UPPER_ARM) {
                    formData[`muscle_${TIMELINE_MUSCLE_WIDGET_UPPER_ARM}`] = true;
                }
                if (o.name === TIMELINE_MUSCLE_WIDGET_WAIST) {
                    formData[`muscle_${TIMELINE_MUSCLE_WIDGET_WAIST}`] = true;
                }
                if (o.name === TIMELINE_MUSCLE_WIDGET_FOREARM) {
                    formData[`muscle_${TIMELINE_MUSCLE_WIDGET_FOREARM}`] = true;
                }
                if (o.name === TIMELINE_MUSCLE_WIDGET_HIPS) {
                    formData[`muscle_${TIMELINE_MUSCLE_WIDGET_HIPS}`] = true;
                }
                if (o.name === TIMELINE_MUSCLE_WIDGET_THIGH) {
                    formData[`muscle_${TIMELINE_MUSCLE_WIDGET_THIGH}`] = true;
                }
                if (o.name === TIMELINE_MUSCLE_WIDGET_CALF) {
                    formData[`muscle_${TIMELINE_MUSCLE_WIDGET_CALF}`] = true;
                }
                if (o.name === TIMELINE_MUSCLE_WIDGET_HEART_RATE) {
                    formData[`muscle_${TIMELINE_MUSCLE_WIDGET_HEART_RATE}`] = true;
                }
                if (o.name === TIMELINE_MUSCLE_WIDGET_WEIGHT) {
                    formData[`muscle_${TIMELINE_MUSCLE_WIDGET_WEIGHT}`] = true;
                }
                if (o.name === TIMELINE_MUSCLE_WIDGET_HEIGHT) {
                    formData[`muscle_${TIMELINE_MUSCLE_WIDGET_HEIGHT}`] = true;
                }
            });
            formData[`timeline_${TIMELINE_WIDGET_MUSCLE}`] = true;
        }
        dispatch(initialize('timeline_widgets_list_form', formData));
        this.setState({ showAddWidgetModal: true });
    }

    handleHideWidgetModal = () => {
        const { dispatch } = this.props;
        this.setState({ showAddWidgetModal: false });
        dispatch(reset('timeline_widgets_list_form'));
    }

    handleSaveWidget = (data) => {
        const { dispatch, userWidgets } = this.props;
        let dateRange = moment.range(
            moment().startOf('day').subtract(1, 'month').utc(),
            moment().startOf('day').utc(),
        );
        let requestData = {
            [TIMELINE_WIDGET_BADGES]: 0,
            [TIMELINE_WIDGET_PROGRESS_PHOTO]: 0,
            [TIMELINE_WIDGET_BODY_FAT]: null,
            [TIMELINE_WIDGET_MUSCLE]: null,
        };
        if (typeof data[`timeline_${TIMELINE_WIDGET_BADGES}`] !== 'undefined' && data[`timeline_${TIMELINE_WIDGET_BADGES}`]) {
            requestData[TIMELINE_WIDGET_BADGES] = 1;
        }
        if (typeof data[`timeline_${TIMELINE_WIDGET_PROGRESS_PHOTO}`] !== 'undefined' && data[`timeline_${TIMELINE_WIDGET_PROGRESS_PHOTO}`]) {
            requestData[TIMELINE_WIDGET_PROGRESS_PHOTO] = 1;
        }
        if (typeof data[`timeline_${TIMELINE_WIDGET_BODY_FAT}`] !== 'undefined' && data[`timeline_${TIMELINE_WIDGET_BODY_FAT}`]) {
            let _data = null;
            if (userWidgets && userWidgets[TIMELINE_WIDGET_BODY_FAT]) {
                _data = userWidgets[TIMELINE_WIDGET_BODY_FAT];
            } else {
                _data = {
                    start: dateRange.start,
                    end: dateRange.end,
                };
            }
            requestData[TIMELINE_WIDGET_BODY_FAT] = _data;
        }
        if (typeof data[`timeline_${TIMELINE_WIDGET_MUSCLE}`] !== 'undefined' && data[`timeline_${TIMELINE_WIDGET_MUSCLE}`]) {
            let _data = [];
            let isDataAlreadyAvailable = false;
            if (userWidgets && userWidgets[TIMELINE_WIDGET_MUSCLE] && userWidgets[TIMELINE_WIDGET_MUSCLE].length > 0) {
                isDataAlreadyAvailable = true;
            }
            if (typeof data[`muscle_${TIMELINE_MUSCLE_WIDGET_NECK}`] !== 'undefined' && data[`muscle_${TIMELINE_MUSCLE_WIDGET_NECK}`]) {
                if (isDataAlreadyAvailable) {
                    let isDataPushed = false;
                    userWidgets[TIMELINE_WIDGET_MUSCLE].map((o, i) => {
                        if (o.name === TIMELINE_MUSCLE_WIDGET_NECK) {
                            _data.push(o);
                            isDataPushed = true;
                        }
                    });
                    if (!isDataPushed) {
                        _data.push({ name: TIMELINE_MUSCLE_WIDGET_NECK, start: dateRange.start, end: dateRange.end })
                    }
                } else {
                    _data.push({ name: TIMELINE_MUSCLE_WIDGET_NECK, start: dateRange.start, end: dateRange.end })
                }
            }
            if (typeof data[`muscle_${TIMELINE_MUSCLE_WIDGET_SHOULDER}`] !== 'undefined' && data[`muscle_${TIMELINE_MUSCLE_WIDGET_SHOULDER}`]) {
                if (isDataAlreadyAvailable) {
                    let isDataPushed = false;
                    userWidgets[TIMELINE_WIDGET_MUSCLE].map((o, i) => {
                        if (o.name === TIMELINE_MUSCLE_WIDGET_SHOULDER) {
                            _data.push(o);
                            isDataPushed = true;
                        }
                    });
                    if (!isDataPushed) {
                        _data.push({ name: TIMELINE_MUSCLE_WIDGET_SHOULDER, start: dateRange.start, end: dateRange.end })
                    }
                } else {
                    _data.push({ name: TIMELINE_MUSCLE_WIDGET_SHOULDER, start: dateRange.start, end: dateRange.end })
                }
            }
            if (typeof data[`muscle_${TIMELINE_MUSCLE_WIDGET_CHEST}`] !== 'undefined' && data[`muscle_${TIMELINE_MUSCLE_WIDGET_CHEST}`]) {
                if (isDataAlreadyAvailable) {
                    let isDataPushed = false;
                    userWidgets[TIMELINE_WIDGET_MUSCLE].map((o, i) => {
                        if (o.name === TIMELINE_MUSCLE_WIDGET_CHEST) {
                            _data.push(o);
                            isDataPushed = true;
                        }
                    });
                    if (!isDataPushed) {
                        _data.push({ name: TIMELINE_MUSCLE_WIDGET_CHEST, start: dateRange.start, end: dateRange.end })
                    }
                } else {
                    _data.push({ name: TIMELINE_MUSCLE_WIDGET_CHEST, start: dateRange.start, end: dateRange.end })
                }
            }
            if (typeof data[`muscle_${TIMELINE_MUSCLE_WIDGET_UPPER_ARM}`] !== 'undefined' && data[`muscle_${TIMELINE_MUSCLE_WIDGET_UPPER_ARM}`]) {
                if (isDataAlreadyAvailable) {
                    let isDataPushed = false;
                    userWidgets[TIMELINE_WIDGET_MUSCLE].map((o, i) => {
                        if (o.name === TIMELINE_MUSCLE_WIDGET_UPPER_ARM) {
                            _data.push(o);
                            isDataPushed = true;
                        }
                    });
                    if (!isDataPushed) {
                        _data.push({ name: TIMELINE_MUSCLE_WIDGET_UPPER_ARM, start: dateRange.start, end: dateRange.end })
                    }
                } else {
                    _data.push({ name: TIMELINE_MUSCLE_WIDGET_UPPER_ARM, start: dateRange.start, end: dateRange.end })
                }
            }
            if (typeof data[`muscle_${TIMELINE_MUSCLE_WIDGET_WAIST}`] !== 'undefined' && data[`muscle_${TIMELINE_MUSCLE_WIDGET_WAIST}`]) {
                if (isDataAlreadyAvailable) {
                    let isDataPushed = false;
                    userWidgets[TIMELINE_WIDGET_MUSCLE].map((o, i) => {
                        if (o.name === TIMELINE_MUSCLE_WIDGET_WAIST) {
                            _data.push(o);
                            isDataPushed = true;
                        }
                    });
                    if (!isDataPushed) {
                        _data.push({ name: TIMELINE_MUSCLE_WIDGET_WAIST, start: dateRange.start, end: dateRange.end })
                    }
                } else {
                    _data.push({ name: TIMELINE_MUSCLE_WIDGET_WAIST, start: dateRange.start, end: dateRange.end })
                }
            }
            if (typeof data[`muscle_${TIMELINE_MUSCLE_WIDGET_FOREARM}`] !== 'undefined' && data[`muscle_${TIMELINE_MUSCLE_WIDGET_FOREARM}`]) {
                if (isDataAlreadyAvailable) {
                    let isDataPushed = false;
                    userWidgets[TIMELINE_WIDGET_MUSCLE].map((o, i) => {
                        if (o.name === TIMELINE_MUSCLE_WIDGET_FOREARM) {
                            _data.push(o);
                            isDataPushed = true;
                        }
                    });
                    if (!isDataPushed) {
                        _data.push({ name: TIMELINE_MUSCLE_WIDGET_FOREARM, start: dateRange.start, end: dateRange.end })
                    }
                } else {
                    _data.push({ name: TIMELINE_MUSCLE_WIDGET_FOREARM, start: dateRange.start, end: dateRange.end })
                }
            }
            if (typeof data[`muscle_${TIMELINE_MUSCLE_WIDGET_HIPS}`] !== 'undefined' && data[`muscle_${TIMELINE_MUSCLE_WIDGET_HIPS}`]) {
                if (isDataAlreadyAvailable) {
                    let isDataPushed = false;
                    userWidgets[TIMELINE_WIDGET_MUSCLE].map((o, i) => {
                        if (o.name === TIMELINE_MUSCLE_WIDGET_HIPS) {
                            _data.push(o);
                            isDataPushed = true;
                        }
                    });
                    if (!isDataPushed) {
                        _data.push({ name: TIMELINE_MUSCLE_WIDGET_HIPS, start: dateRange.start, end: dateRange.end })
                    }
                } else {
                    _data.push({ name: TIMELINE_MUSCLE_WIDGET_HIPS, start: dateRange.start, end: dateRange.end })
                }
            }
            if (typeof data[`muscle_${TIMELINE_MUSCLE_WIDGET_THIGH}`] !== 'undefined' && data[`muscle_${TIMELINE_MUSCLE_WIDGET_THIGH}`]) {
                if (isDataAlreadyAvailable) {
                    let isDataPushed = false;
                    userWidgets[TIMELINE_WIDGET_MUSCLE].map((o, i) => {
                        if (o.name === TIMELINE_MUSCLE_WIDGET_THIGH) {
                            _data.push(o);
                            isDataPushed = true;
                        }
                    });
                    if (!isDataPushed) {
                        _data.push({ name: TIMELINE_MUSCLE_WIDGET_THIGH, start: dateRange.start, end: dateRange.end })
                    }
                } else {
                    _data.push({ name: TIMELINE_MUSCLE_WIDGET_THIGH, start: dateRange.start, end: dateRange.end })
                }
            }
            if (typeof data[`muscle_${TIMELINE_MUSCLE_WIDGET_CALF}`] !== 'undefined' && data[`muscle_${TIMELINE_MUSCLE_WIDGET_CALF}`]) {
                if (isDataAlreadyAvailable) {
                    let isDataPushed = false;
                    userWidgets[TIMELINE_WIDGET_MUSCLE].map((o, i) => {
                        if (o.name === TIMELINE_MUSCLE_WIDGET_CALF) {
                            _data.push(o);
                            isDataPushed = true;
                        }
                    });
                    if (!isDataPushed) {
                        _data.push({ name: TIMELINE_MUSCLE_WIDGET_CALF, start: dateRange.start, end: dateRange.end })
                    }
                } else {
                    _data.push({ name: TIMELINE_MUSCLE_WIDGET_CALF, start: dateRange.start, end: dateRange.end })
                }
            }
            if (typeof data[`muscle_${TIMELINE_MUSCLE_WIDGET_HEART_RATE}`] !== 'undefined' && data[`muscle_${TIMELINE_MUSCLE_WIDGET_HEART_RATE}`]) {
                if (isDataAlreadyAvailable) {
                    let isDataPushed = false;
                    userWidgets[TIMELINE_WIDGET_MUSCLE].map((o, i) => {
                        if (o.name === TIMELINE_MUSCLE_WIDGET_HEART_RATE) {
                            _data.push(o);
                            isDataPushed = true;
                        }
                    });
                    if (!isDataPushed) {
                        _data.push({ name: TIMELINE_MUSCLE_WIDGET_HEART_RATE, start: dateRange.start, end: dateRange.end })
                    }
                } else {
                    _data.push({ name: TIMELINE_MUSCLE_WIDGET_HEART_RATE, start: dateRange.start, end: dateRange.end })
                }
            }
            if (typeof data[`muscle_${TIMELINE_MUSCLE_WIDGET_WEIGHT}`] !== 'undefined' && data[`muscle_${TIMELINE_MUSCLE_WIDGET_WEIGHT}`]) {
                if (isDataAlreadyAvailable) {
                    let isDataPushed = false;
                    userWidgets[TIMELINE_WIDGET_MUSCLE].map((o, i) => {
                        if (o.name === TIMELINE_MUSCLE_WIDGET_WEIGHT) {
                            _data.push(o);
                            isDataPushed = true;
                        }
                    });
                    if (!isDataPushed) {
                        _data.push({ name: TIMELINE_MUSCLE_WIDGET_WEIGHT, start: dateRange.start, end: dateRange.end })
                    }
                } else {
                    _data.push({ name: TIMELINE_MUSCLE_WIDGET_WEIGHT, start: dateRange.start, end: dateRange.end })
                }
            }
            if (typeof data[`muscle_${TIMELINE_MUSCLE_WIDGET_HEIGHT}`] !== 'undefined' && data[`muscle_${TIMELINE_MUSCLE_WIDGET_HEIGHT}`]) {
                if (isDataAlreadyAvailable) {
                    let isDataPushed = false;
                    userWidgets[TIMELINE_WIDGET_MUSCLE].map((o, i) => {
                        if (o.name === TIMELINE_MUSCLE_WIDGET_HEIGHT) {
                            _data.push(o);
                            isDataPushed = true;
                        }
                    });
                    if (!isDataPushed) {
                        _data.push({ name: TIMELINE_MUSCLE_WIDGET_HEIGHT, start: dateRange.start, end: dateRange.end })
                    }
                } else {
                    _data.push({ name: TIMELINE_MUSCLE_WIDGET_HEIGHT, start: dateRange.start, end: dateRange.end })
                }
            }
            requestData[TIMELINE_WIDGET_MUSCLE] = _data;
        }
        dispatch(saveTimelineWidgetsRequest(requestData));
    }
}

ProfileFithub = withRouter(ProfileFithub);

const mapStateToProps = (state) => {
    const { userTimeline, user, postLikes, postComments, profile, timelineWidgets } = state;
    return {
        postLoading: userTimeline.get('loading'),
        posts: userTimeline.get('posts'),
        post: userTimeline.get('post'),
        error: userTimeline.get('error'),
        loggedUserData: user.get('loggedUserData'),
        likeLoading: postLikes.get('loading'),
        likePost: postLikes.get('post'),
        likeError: postLikes.get('error'),
        commentLoading: postComments.get('loading'),
        commentPost: postComments.get('post'),
        commentError: postComments.get('error'),
        activeProfile: profile.get('profile'),
        tilelineWidgetsLoading: timelineWidgets.get('loading'),
        userWidgets: timelineWidgets.get('userWidgets'),
        saveWidgetsLoading: timelineWidgets.get('saveWidgetsLoading'),
        saveWidgetsError: timelineWidgets.get('saveWidgetsError'),
    };
}

export default connect(
    mapStateToProps,
)(ProfileFithub);