import React, { Component } from 'react';
import { connect } from 'react-redux';
import FitnessHeader from '../components/global/FitnessHeader';
import FitnessNav from '../components/global/FitnessNav';
import { getUserSingleTimelineRequest, setTimelineState } from '../actions/userTimeline';
import { FaCircleONotch } from "react-icons/lib/fa";
import ErrorCloud from "svg/error-cloud.svg";
import noProfileImg from 'img/common/no-profile-img.png'
import noImg from 'img/common/no-img.png'
import moment from "moment";
import { routeCodes } from '../constants/routes';
import {
    ACCESS_LEVEL_PUBLIC,
    ACCESS_LEVEL_FRIENDS,
    ACCESS_LEVEL_PRIVATE,
    SERVER_BASE_URL,
    POST_TYPE_TIMELINE,
    POST_TYPE_GALLERY,
    POST_TYPE_PROGRESS_PHOTO,
    FRIENDSHIP_STATUS_FRIEND,
    FRIENDSHIP_STATUS_SELF,
    POST_TYPE_WORKOUT
} from '../constants/consts';
import { FaGlobe, FaLock, FaGroup } from 'react-icons/lib/fa';
import cns from "classnames";
import { NavLink, Link } from "react-router-dom";
import CommentBoxForm from '../components/Profile/CommentBoxForm';
import { toggleLikeOnPostRequest } from '../actions/postLikes';
import { te, replaceStringWithEmos, sanitizeEditableContentValue, isOnline, connectIDB } from '../helpers/funs';
import { commentOnPostRequest } from '../actions/postComments';
import { reset } from "redux-form";
import Lightbox from 'react-images';
import NoRecordFound from '../components/Common/NoRecordFound';
import LikesListModal from '../components/Common/LikesListModal';
import { getProfileDetailsRequest } from '../actions/profile';
import { IDB_TBL_PROFILE, IDB_READ_WRITE, IDB_READ } from '../constants/idb';


class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLikedByLoggedUser: false,

            lightBoxOpen: false,
            currentImage: 0,
            lightBoxImages: [],

            showLikes: false,
        }
        this.commentBoxRef = React.createRef();
        this.iDB;
    }

    getDataFromIDB = () => {
        console.log("get data")
        const { dispatch } = this.props;
        const idbTbls = [IDB_TBL_PROFILE];
        try {
            const transaction = this.iDB.transaction(idbTbls, IDB_READ);
            if (transaction) {
                const osPrivacy = transaction.objectStore(IDB_TBL_PROFILE);
                const iDBGetReq = osPrivacy.get('post');
                iDBGetReq.onsuccess = (event) => {
                    const { target: { result } } = event;
                    if (result) {
                        const resultObj = JSON.parse(result.data);
                        console.log('resultObj privacy => ',resultObj);
                        const data = { post: resultObj }
                        dispatch(setTimelineState(data));
                    } else {
                        const data = { post: null }
                        dispatch(setTimelineState(data));
                    }
                }
            }
        }
        catch (e) {
            console.log("error post file => ", e);
        }
    }

    render() {
        const { loading, postError, post, match, postCommentLoading, profile, timelineUserPrivacy } = this.props;
        const { isLikedByLoggedUser, lightBoxOpen, currentImage, lightBoxImages, showLikes } = this.state;
        let doRenderPost = true;
        let showCommentBox = false;
        if (!loading && post) {
            var createdBy = (post.created_by && Object.keys(post.created_by).length > 0) ? post.created_by : null;
            if (!createdBy) {
                doRenderPost = false;
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
                doRenderPost = false;
            }
            description = replaceStringWithEmos(description);
            var imagesCount = images.length;
            var postImageDisplayClass = 'masonry';
            if (imagesCount === 1) {
                postImageDisplayClass += ' single';
            } else if (imagesCount <= 0) {
                postImageDisplayClass = '';
            }
            var likes = post.likes;
            var totalLikes = likes.length;
            var likesStr = '';
            if (totalLikes > 0) {
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
            if (profile && profile.friendshipStatus === FRIENDSHIP_STATUS_SELF) {
                showCommentBox = true;
            } else {
                if (timelineUserPrivacy && typeof timelineUserPrivacy.commentAccessibility !== 'undefined') {
                    if (timelineUserPrivacy.commentAccessibility === parseInt(ACCESS_LEVEL_PUBLIC) || profile.friendshipStatus === FRIENDSHIP_STATUS_FRIEND && timelineUserPrivacy.commentAccessibility === parseInt(ACCESS_LEVEL_FRIENDS)) {
                        showCommentBox = true;
                    }
                }
            }
        }
        return (
            <div className="post-details-wrapper">
                <FitnessHeader />
                <FitnessNav />
                <section className="body-wrap">
                    <div className="body-head space-btm-45 d-flex justify-content-start front-white-header">
                        <div className="body-head-r">
                            <Link to={`${routeCodes.PROFILE}/${match.params.username}`} className="white-btn">Profile <i className="icon-account_circle"></i></Link>
                        </div>
                    </div>

                    {loading &&
                        <div className="no-content-loader">
                            <FaCircleONotch className="loader-spinner fs-100" />
                        </div>
                    }

                    {!loading && post && doRenderPost &&
                        <div className="body-content post-type timeline-infinite-scroll single-post-wrapper d-flex">
                            <div className="single-post-left">
                                <div className="single-post-left-wrap">
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
                                                <small dangerouslySetInnerHTML={{ __html: description }}></small>
                                            </div>
                                        }
                                        <div className={cns("posttype-body-grey text-c single-post-view", postImageDisplayClass)}>
                                            {images && images.length > 0 &&
                                                images.map((imageD, imageI) => {
                                                    return (
                                                        <div className="item" key={imageD._id}>
                                                            <a href="javascript:void(0)" key={imageI} onClick={() => this.handleOpenLightbox(images, imageI)}>
                                                                <img
                                                                    src={SERVER_BASE_URL + imageD.image}
                                                                    onError={(e) => {
                                                                        e.target.src = noImg
                                                                    }}
                                                                />
                                                            </a>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                        <div className={cns("posttype-body-grey text-c single-post-cntline")}>
                                            <p>
                                                {likesStr && <span onClick={this.handleOpenLikesModal} className="cursor-pointer">{likesStr}</span>}
                                                {post.comments && post.comments.length > 0 && <span>{post.comments.length > 0 && 'Comments ' + post.comments.length}</span>}
                                            </p>
                                            <div className="posttype-btm d-flex">
                                                <a href="javascript:void(0)" className={cns('icon-thumb_up', { 'liked-color': isLikedByLoggedUser })} onClick={this.handleLike}></a>
                                                <a href="javascript:void(0)" className="icon-chat" onClick={this.setfocusOnCommentBox}></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="single-post-right">
                                <div className="single-post-right-wrap">
                                    {showCommentBox &&
                                        <CommentBoxForm
                                            ref={this.commentBoxRef}
                                            postId={post._id}
                                            handleComment={this.handleComment}
                                            isLoading={postCommentLoading}
                                        />
                                    }
                                    {/* {
                                        post && post.owner_by &&
                                        post.owner_by.userPreferences &&
                                        post.owner_by.userPreferences.commentAccessibility &&
                                        post.owner_by.userPreferences.commentAccessibility == ACCESS_LEVEL_PUBLIC &&
                                        <CommentBoxForm
                                            ref={this.commentBoxRef}
                                            postId={post._id}
                                            handleComment={this.handleComment}
                                            isLoading={postCommentLoading}
                                        />
                                    } */}
                                    {/* {
                                        post && post.owner_by &&
                                        post.owner_by.userPreferences &&
                                        post.owner_by.userPreferences.commentAccessibility &&
                                        post.owner_by.userPreferences.commentAccessibility == ACCESS_LEVEL_FRIENDS &&
                                        post.friendshipStatus && post.friendshipStatus == FRIENDSHIP_STATUS_FRIEND &&
                                        <CommentBoxForm
                                            ref={this.commentBoxRef}
                                            postId={post._id}
                                            handleComment={this.handleComment}
                                            isLoading={postCommentLoading}
                                        />
                                    } */}
                                    {/* {
                                        post && post.friendshipStatus && post.friendshipStatus == FRIENDSHIP_STATUS_SELF &&
                                        <CommentBoxForm
                                            ref={this.commentBoxRef}
                                            postId={post._id}
                                            handleComment={this.handleComment}
                                            isLoading={postCommentLoading}
                                        />
                                    } */}
                                    {post.comments && post.comments.length > 0 &&
                                        post.comments.map((o, i) => {
                                            return (
                                                <div className="post-comment d-flex" key={i}>
                                                    <span>
                                                        <img
                                                            src={o.avatar}
                                                            alt={o.firstName}
                                                            onError={(e) => {
                                                                e.target.src = noProfileImg
                                                            }}
                                                        />
                                                    </span>
                                                    <div className="post-comment-r">
                                                        <h4>
                                                            <NavLink to={`${routeCodes.PROFILE}/${o.username}`}>
                                                                {o.firstName} {(o.lastName) ? o.lastName : ''}
                                                            </NavLink>
                                                            <p>{moment(moment.utc(o.create_date).toDate()).local().format('Do MMM [at] hh:mm')}</p>
                                                        </h4>
                                                        <div className="post-comment-r-btm">
                                                            <small dangerouslySetInnerHTML={{ __html: replaceStringWithEmos(o.comment) }}></small>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    }
                                    <LikesListModal
                                        show={showLikes}
                                        handleClose={this.handleCloseLikesModal}
                                        likes={likes}
                                    />
                                </div>
                            </div>
                        </div>
                    }

                    {!loading && post && !doRenderPost &&
                        <NoRecordFound />
                    }

                    {!loading && !post && typeof postError !== 'undefined' && postError && postError.length <= 0 &&
                        <NoRecordFound />
                    }

                    {!loading && typeof postError !== 'undefined' && postError && postError.length > 0 &&
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

    componentDidMount() {

        connectIDB()().then((connection) => {
            this.handleIDBOpenSuccess(connection);
        });

        const { dispatch, match } = this.props;
        let id = match.params.id;
        const username = match.params.username;
        if(isOnline()) {
            dispatch(getUserSingleTimelineRequest(id));
            dispatch(getProfileDetailsRequest(username));
        } 
    }

    handleIDBOpenSuccess = (connection) => {
        this.iDB = connection.result;
        if (!isOnline()) {
            // get data from idb
            console.log("Get Data From IDB");
            this.getDataFromIDB()
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const {
            loading, post,
            postLikeLoading, postLikePost, postLikeError,
            postCommentLoading, postCommentPost, postCommentError,
            loggedUserData,
            dispatch,
            match,
        } = this.props;
        if (!loading && post && post !== prevProps.post) {
            let isLiked = false;
            let likedOfLoggedUser = _.find(post.likes, ['authUserId', loggedUserData.authId]);
            if (likedOfLoggedUser) {
                isLiked = true;
            }
            this.setState({ isLikedByLoggedUser: isLiked });
        }
        if (!postLikeLoading && postLikePost && postLikePost !== prevProps.postLikePost) {
            let stateData = { post: Object.assign({}, postLikePost) };
            dispatch(setTimelineState(stateData));
        } else if (!postLikeLoading && prevProps.postLikeLoading !== postLikeLoading && postLikeError && postLikeError.length > 0) {
            te('Something went wrong! please try again later.');
        }
        if (!postCommentLoading && postCommentPost && postCommentPost !== prevProps.postCommentPost) {
            let stateData = { post: Object.assign({}, postCommentPost) };
            dispatch(setTimelineState(stateData));
            dispatch(reset('commentBoxForm'));
        } else if (!postCommentLoading && prevProps.postCommentLoading !== postCommentLoading && postCommentError && postCommentError.length > 0) {
            te('Something went wrong! please try again later.');
        }
        if (match.params && match.params.username && match.params.id && (match.params.username !== prevProps.match.params.username || match.params.id !== prevProps.match.params.id)) {
            let id = match.params.id;
            dispatch(getUserSingleTimelineRequest(id));
        }
    }

    handleLike = () => {
        const { post, dispatch } = this.props;
        const { isLikedByLoggedUser } = this.state;
        var requestData = { postId: post._id };
        dispatch(toggleLikeOnPostRequest(requestData));
        this.setState({ isLikedByLoggedUser: !isLikedByLoggedUser });
    }

    handleComment = (data) => {
        const { dispatch } = this.props;
        const { comment, postId } = data;
        const sanitizeComment = sanitizeEditableContentValue(comment);
        if (sanitizeComment && sanitizeComment.trim()) {
            var requestData = { comment: sanitizeComment, postId };
            dispatch(commentOnPostRequest(requestData));
        }
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

    handleOpenLikesModal = () => {
        this.setState({ showLikes: true });
    }

    handleCloseLikesModal = () => {
        this.setState({ showLikes: false });
    }

    setfocusOnCommentBox = () => {
        this.commentBoxRef.current.focus();
    }
}

const mapStateToProps = (state) => {
    const { userTimeline, user, postLikes, postComments, profile } = state;
    return {
        loading: userTimeline.get('postLoading'),
        post: userTimeline.get('post'),
        postError: userTimeline.get('postError'),
        timelineUserPrivacy: userTimeline.get('privacy'),
        loggedUserData: user.get('loggedUserData'),
        postLikeLoading: postLikes.get('loading'),
        postLikePost: postLikes.get('post'),
        postLikeError: postLikes.get('error'),
        postCommentLoading: postComments.get('loading'),
        postCommentPost: postComments.get('post'),
        postCommentError: postComments.get('error'),
        profile: profile.get('profile'),
    };
}

export default connect(
    mapStateToProps,
)(Post);