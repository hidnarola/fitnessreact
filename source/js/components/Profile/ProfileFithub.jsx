import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getUserTimelineRequest, getUserSingleTimelineRequest } from '../../actions/userTimeline';
import _ from "lodash";
import noProfileImg from 'img/common/no-profile-img.png'
import moment from "moment";
import { POST_TYPE_TIMELINE, POST_TYPE_GALLERY, POST_TYPE_PROGRESS_PHOTO, SERVER_BASE_URL } from '../../constants/consts';
import cns from "classnames";
import { routeCodes } from '../../constants/routes';
import { NavLink } from "react-router-dom";
import { toggleLikeOnPostRequest } from '../../actions/postLikes';

class ProfileFithub extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            progressPhotos: {},
            start: 0,
            offset: 10,
            selectActionInit: false,
            likeActionInit: false,
            selectSingleActionInit: false,
            selectedTimelineIndex: null,
            selectedTimelineId: null,
        }
    }

    componentWillMount() {
        const {
            start,
            offset,
        } = this.state;
        const {
            match,
            dispatch,
        } = this.props;
        if (match.params && match.params.username) {
            var username = match.params.username;
            this.setState({ selectActionInit: true });
            dispatch(getUserTimelineRequest(username, start, offset));
        }
    }

    render() {
        const {
            posts,
            progressPhotos,
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
                                                            e.target.src = noProfileImg
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
                                                            e.target.src = noProfileImg
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
                            <div className="how-training">
                                <textarea></textarea>
                                <div className="how-training-btm d-flex justify-content-end">
                                    <a href="">
                                        <i className="icon-photo_size_select_actual vertical-middle-c"></i>
                                    </a>
                                    <a href="">
                                        <i className="icon-settings vertical-middle-c"></i>
                                    </a>
                                    <button type="submit" className="vertical-middle-r">
                                        Post<i className="icon-send"></i>
                                    </button>
                                </div>
                            </div>

                            {posts && posts.length > 0 &&
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
                                                <div className="posttype-body-white">
                                                    {description}
                                                </div>
                                                <div className={cns("posttype-body-grey", postImageDisplayClass)}>
                                                    {images && images.length > 0 &&
                                                        images.map((imageD, imageI) => {
                                                            return (
                                                                <span key={imageI}>
                                                                    <img
                                                                        src={SERVER_BASE_URL + imageD.image}
                                                                        onError={(e) => {
                                                                            e.target.src = noProfileImg
                                                                        }}
                                                                    />
                                                                </span>
                                                            )
                                                        })
                                                    }
                                                    {likesStr &&
                                                        <p>{likesStr}</p>
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
                                                            </NavLink> {lastComment.comment}
                                                        </h4>
                                                        <div className="post-comment-r-btm d-flex">
                                                            <p>{lastCommentCreatedAt}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    );
                                })
                            }
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
            selectSingleActionInit,
        } = this.state;
        const {
            postLoading,
            posts,
            post,
            progressPhotos,
            likeLoading,
            dispatch,
        } = this.props;
        if (selectActionInit && !postLoading) {
            this.setState({
                selectActionInit: false,
                posts: _.concat(this.state.posts, posts),
                progressPhotos,
                start: (start + offset)
            });
        }
        if (selectSingleActionInit && !postLoading) {
            var newPostsState = posts;
            newPostsState[selectedTimelineIndex] = post;
            this.setState({
                selectSingleActionInit: false,
                selectedTimelineIndex: null,
                selectedTimelineId: null,
                posts: newPostsState,
            });
        }
        if (likeActionInit && !likeLoading) {
            this.setState({
                likeActionInit: false,
                selectSingleActionInit: true,
            });
            dispatch(getUserSingleTimelineRequest(selectedTimelineId));
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

}

ProfileFithub = withRouter(ProfileFithub);

const mapStateToProps = (state) => {
    const { userTimeline, user, postLikes } = state;
    return {
        postLoading: userTimeline.get('loading'),
        posts: userTimeline.get('posts'),
        post: userTimeline.get('post'),
        progressPhotos: userTimeline.get('progressPhotos'),
        loggedUserData: user.get('loggedUserData'),
        likeLoading: postLikes.get('loading'),
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