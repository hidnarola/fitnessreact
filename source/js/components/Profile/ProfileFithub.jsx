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
    ACCESS_LEVEL_PRIVATE_STR
} from '../../constants/consts';
import cns from "classnames";
import { routeCodes } from '../../constants/routes';
import { NavLink } from "react-router-dom";
import { toggleLikeOnPostRequest } from '../../actions/postLikes';
import CommentBoxForm from './CommentBoxForm';
import { commentOnPostRequest } from '../../actions/postComments';
import { reset } from "redux-form";
import ReactHtmlParser from "react-html-parser";
import ReactQuill from 'react-quill';
import { te } from '../../helpers/funs';
import InfiniteScroll from 'react-infinite-scroller';
import { FaCircleONotch } from "react-icons/lib/fa";
import { MenuItem, Dropdown } from "react-bootstrap";
import { FaGlobe, FaLock, FaGroup } from 'react-icons/lib/fa';

class ProfileFithub extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            progressPhotos: {},
            start: 0,
            offset: 10,
            hasMorePosts: true,
            selectActionInit: false,
            likeActionInit: false,
            selectedTimelineIndex: null,
            selectedTimelineId: null,
            commentActionInit: false,
            postContent: '',
            postPrivacy: ACCESS_LEVEL_PUBLIC,
            newPostActionInit: false,
        }
    }

    componentWillReceiveProps(nextProps) {
        const {
            match,
            dispatch,
        } = nextProps;
        if (match.params.username !== this.props.match.params.username) {
            this.setState({
                posts: [],
                progressPhotos: {},
                start: 0,
                offset: 10,
                hasMorePosts: true,
            });
        }
    }

    render() {
        const {
            posts,
            progressPhotos,
            postContent,
            postPrivacy,
            hasMorePosts,
        } = this.state;
        const {
            loggedUserData,
        } = this.props;
        return (
            <div className="row">
                <div className="col-md-6">
                    <div className="add-widgets">
                        <a href="javascript:void()" data-toggle="modal" data-target="#widget-popup">
                            <span>Add Widgets</span>
                            <i className="icon-widgets"></i>
                        </a>
                    </div>

                    {progressPhotos && Object.keys(progressPhotos).length > 0 &&
                        <div className="white-box space-btm-30">
                            <div className="whitebox-head d-flex">
                                <h3 className="title-h3">Progress Photos</h3>
                                <div className="whitebox-head-r">
                                    <a href="" className="icon-more_horiz"></a>
                                </div>
                            </div>
                            <div className="whitebox-body d-flex">
                                <ul className="d-flex profile-list-ul profilelist-2">
                                    <li>
                                        <div className="profile-list">
                                            <span>
                                                <a href="">
                                                    <img
                                                        src={SERVER_BASE_URL + progressPhotos.current}
                                                        onError={(e) => {
                                                            e.target.src = noImg
                                                        }}
                                                    />
                                                </a>
                                            </span>
                                            <h4>
                                                <a href="">Current</a>
                                            </h4>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="profile-list">
                                            <span>
                                                <a href="">
                                                    <img
                                                        src={SERVER_BASE_URL + progressPhotos.beginning}
                                                        onError={(e) => {
                                                            e.target.src = noImg
                                                        }}
                                                    />
                                                </a>
                                            </span>
                                            <h4>
                                                <a href="">Beginning</a>
                                            </h4>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    }

                    <div className="white-box space-btm-30">
                        <div className="whitebox-head d-flex">
                            <h3 className="title-h3">Body Fat</h3>
                            <div className="whitebox-head-r ">
                                <a href="" className="icon-settings"></a>
                            </div>
                        </div>
                        <div className="whitebox-body bodyfat-graph hyphen-30">
                            <img src="images/bodyfat-graph.png" alt="" />
                        </div>
                    </div>

                    <div className="white-box space-btm-30">
                        <div className="whitebox-head d-flex">
                            <h3 className="title-h3">Badges</h3>
                            <div className="whitebox-head-r ">
                                <a href="" className="icon-settings"></a>
                            </div>
                        </div>
                        <div className="whitebox-body today-badges">
                            <div className="customiser-box">
                                <h3>
                                    <strong>Achievement - </strong> Profile</h3>
                                <h5>Customiser</h5>
                                <p>You’ve filled out your entire Fitassist profile,
                                                <br /> now everything will fit you even better.</p>
                                <h4>
                                    <span>
                                        <i className="icon-check"></i>
                                    </span>
                                    <strong>Completed</strong>
                                    <small>June 8, 2017</small>
                                </h4>
                                <div className="tropy-icon-box">

                                </div>
                            </div>
                            <div className="achivement-box">
                                <h4>
                                    <strong>Achievement -</strong>Strength</h4>
                                <h5>Getting Heavy</h5>
                                <p>Lift a total of 1000Kg overall.</p>
                                <h6>500/1000Kg</h6>
                                <span>
                                    {/* <img src="images/achievment-graph.png" alt=""/> */}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="white-box space-btm-20">
                        <div className="whitebox-head d-flex">
                            <h3 className="title-h3">Timeline</h3>
                            <div className="whitebox-head-r">
                                <a href="">
                                    <i className="icon-settings"></i>
                                </a>
                            </div>
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
                                <div className="how-training-btm d-flex justify-content-end">
                                    <a href="">
                                        <i className="icon-photo_size_select_actual vertical-middle-c"></i>
                                    </a>
                                    <Dropdown id="post_privacy">
                                        <Dropdown.Toggle noCaret>
                                            {postPrivacy === ACCESS_LEVEL_PUBLIC && <span><FaGlobe /> {ACCESS_LEVEL_PUBLIC_STR}</span>}
                                            {postPrivacy === ACCESS_LEVEL_FRIENDS && <span><FaGroup /> {ACCESS_LEVEL_FRIENDS_STR}</span>}
                                            {postPrivacy === ACCESS_LEVEL_PRIVATE && <span><FaLock /> {ACCESS_LEVEL_PRIVATE_STR}</span>}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <MenuItem eventKey="3" onClick={() => this.handlePostPrivacy(ACCESS_LEVEL_PUBLIC)}><FaGlobe /> {ACCESS_LEVEL_PUBLIC_STR}</MenuItem>
                                            <MenuItem eventKey="2" onClick={() => this.handlePostPrivacy(ACCESS_LEVEL_FRIENDS)}><FaGroup /> {ACCESS_LEVEL_FRIENDS_STR}</MenuItem>
                                            <MenuItem eventKey="1" onClick={() => this.handlePostPrivacy(ACCESS_LEVEL_PRIVATE)}><FaLock /> {ACCESS_LEVEL_PRIVATE_STR}</MenuItem>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <button type="button" onClick={this.handleMakePost} className="vertical-middle-r">
                                        Post<i className="icon-send"></i>
                                    </button>
                                </div>
                            </div>

                            <InfiniteScroll
                                pageStart={0}
                                loadMore={this.loadPostsData}
                                hasMore={hasMorePosts}
                                className="margin-top-30"
                                loader={
                                    <div className="loader" key={0}>
                                        <FaCircleONotch className="loader-spinner loader-spinner-icon" /> Loading ...
                                        </div>
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
                                                    <h4 className="vertical-middle-c">
                                                        <big>{`${createdBy.firstName} ${(createdBy.lastName) ? createdBy.lastName : ''}`}</big>
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
                                                        index={index}
                                                        postId={post._id}
                                                        isLikedByLoggedUser={isLikedByLoggedUser}
                                                        handleToggleLike={this.handleToggleLike}
                                                    />
                                                    <a href="" className="icon-chat"></a>
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
                                                                </NavLink> {ReactHtmlParser(lastComment.comment)}
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
            </div>
        );
    }

    componentDidUpdate() {
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
            progressPhotos,
            likeLoading,
            likePost,
            likeError,
            commentLoading,
            commentPost,
            commentError,
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
                progressPhotos,
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
            });
        }
        if (likeActionInit && !likeLoading) {
            var newPostsState = this.state.posts;
            if (likeError && likeError.length > 0) {
                te(likeError[0]);
            } else {
                newPostsState[selectedTimelineIndex] = likePost;
            }
            this.setState({
                likeActionInit: false,
                selectedTimelineIndex: null,
                selectedTimelineId: null,
                posts: newPostsState,
            });
        }
        if (commentActionInit && !commentLoading) {
            var newPostsState = this.state.posts;
            if (commentError && commentError.length > 0) {
                te(commentError[0]);
            } else {
                newPostsState[selectedTimelineIndex] = commentPost;
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
            });
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
        var comment = data[`comment_${postId}`];
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

    handlePostPrivacy = (access) => {
        this.setState({ postPrivacy: access });
    }

    handlePostContentChange = (content, delta, source, editor) => {
        this.setState({
            postContent: content,
        });
    }

    handleMakePost = () => {
        const {
            postContent,
            postPrivacy,
        } = this.state;
        const {
            activeProfile,
            dispatch,
        } = this.props;
        var formData = new FormData();
        formData.append('description', postContent);
        formData.append('privacy', postPrivacy);
        formData.append('onWall', activeProfile.authUserId);
        this.setState({ newPostActionInit: true });
        dispatch(addPostOnUserTimelineRequest(formData));
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
}

ProfileFithub = withRouter(ProfileFithub);

const mapStateToProps = (state) => {
    const { userTimeline, user, postLikes, postComments, profile } = state;
    return {
        postLoading: userTimeline.get('loading'),
        posts: userTimeline.get('posts'),
        post: userTimeline.get('post'),
        error: userTimeline.get('error'),
        progressPhotos: userTimeline.get('progressPhotos'),
        loggedUserData: user.get('loggedUserData'),
        likeLoading: postLikes.get('loading'),
        likePost: postLikes.get('post'),
        likeError: postLikes.get('error'),
        commentLoading: postComments.get('loading'),
        commentPost: postComments.get('post'),
        commentError: postComments.get('error'),
        activeProfile: profile.get('profile')
    };
}

export default connect(
    mapStateToProps,
)(ProfileFithub);

class LikeButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLikedByLoggedUser: false
        }
    }

    componentWillMount() {
        const { isLikedByLoggedUser } = this.props;
        if (isLikedByLoggedUser !== this.state.isLikedByLoggedUser) {
            this.setState({ isLikedByLoggedUser });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.isLikedByLoggedUser !== nextProps.isLikedByLoggedUser) {
            this.setState({ isLikedByLoggedUser: nextProps.isLikedByLoggedUser });
        }
    }


    render() {
        const {
            isLikedByLoggedUser,
        } = this.state;
        return (
            <a
                href="javascript:void(0)"
                className={cns('icon-thumb_up', { 'liked-color': isLikedByLoggedUser })}
                onClick={this.handleClick}
            >
            </a>
        );
    }

    handleClick = () => {
        const {
            index,
            postId,
            handleToggleLike,
        } = this.props;
        this.setState({ isLikedByLoggedUser: !this.state.isLikedByLoggedUser });
        handleToggleLike(index, postId);
    }
}