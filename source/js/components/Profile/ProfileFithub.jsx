import React, { Component } from 'react';
import ReactDOMServer from "react-dom/server";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
    getUserTimelineRequest,
    addPostOnUserTimelineRequest,
    deletePostOfTimelineRequest,
    changeAccessLevelPostOfTimelineRequest
} from '../../actions/userTimeline';
import _ from "lodash";
import moment from "moment";
import {
    SERVER_BASE_URL,
    ACCESS_LEVEL_PUBLIC,
    ACCESS_LEVEL_FRIENDS,
    ACCESS_LEVEL_PRIVATE,
    ACCESS_LEVEL_PUBLIC_STR,
    ACCESS_LEVEL_FRIENDS_STR,
    ACCESS_LEVEL_PRIVATE_STR,
    FRIENDSHIP_STATUS_SELF,
    WIDGET_MUSCLE,
    WIDGET_PROGRESS_PHOTO,
    WIDGET_BADGES,
    WIDGET_BODY_FAT,
    MUSCLE_WIDGET_NECK,
    MUSCLE_WIDGET_SHOULDER,
    MUSCLE_WIDGET_CHEST,
    MUSCLE_WIDGET_UPPER_ARM,
    MUSCLE_WIDGET_WAIST,
    MUSCLE_WIDGET_FOREARM,
    MUSCLE_WIDGET_HIPS,
    MUSCLE_WIDGET_THIGH,
    MUSCLE_WIDGET_CALF,
    MUSCLE_WIDGET_HEART_RATE,
    MUSCLE_WIDGET_WEIGHT,
    MUSCLE_WIDGET_HEIGHT,
    WIDGETS_TYPE_TIMELINE,
    FRIENDSHIP_STATUS_FRIEND
} from '../../constants/consts';
import { toggleLikeOnPostRequest } from '../../actions/postLikes';
import { commentOnPostRequest } from '../../actions/postComments';
import { initialize, reset } from "redux-form";
import { te, ts, sanitizeEditableContentValue, checkImageMagicCode } from '../../helpers/funs';
import InfiniteScroll from 'react-infinite-scroller';
import { MenuItem, Dropdown } from "react-bootstrap";
import { FaGlobe, FaLock, FaGroup, FaSpinner, FaCircleONotch } from 'react-icons/lib/fa';
import AddPostPhotoModal from './AddPostPhotoModal';
import {
    getTimelineWidgetsAndWidgetsDataRequest,
    saveTimelineWidgetsRequest,
    changeTimelineMuscleInnerDataRequest,
    changeTimelineBodyFatWidgetRequest
} from '../../actions/timelineWidgets';
import WidgetsListModal from '../Common/WidgetsListModal';
import WidgetProgressPhotoCard from '../Common/WidgetProgressPhotoCard';
import WidgetMuscleCard from '../Common/WidgetMuscleCard';
import WidgetBodyFatCard from '../Common/WidgetBodyFatCard';
import WidgetBadgesCard from '../Common/WidgetBadgesCard';
import SweetAlert from "react-bootstrap-sweetalert";
import Lightbox from 'react-images';
import PostCard from './PostCard';
import Emos from '../Common/Emos';
import ContentEditableTextarea from '../Common/ContentEditableTextarea';
import { Emoji } from "emoji-mart";

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
            postImagesError: [],
            postPrivacy: ACCESS_LEVEL_PRIVATE,
            newPostActionInit: false,
            showPostPhotoModal: false,
            selectedPostForDetails: null,
            showAddWidgetModal: false,
            showPostDeleteModal: false,
            selectedPostId: null,
            showPostAccessChangeModal: false,
            selectedPostAccessLevel: null,

            lightBoxOpen: false,
            currentImage: 0,
            lightBoxImages: [],
        }

        this.postTextarea = React.createRef();
        this.emos = React.createRef();
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
            postImages,
            showAddWidgetModal,
            showPostDeleteModal,
            showPostAccessChangeModal,
            newPostActionInit,
            postImagesError,
            lightBoxOpen,
            currentImage,
            lightBoxImages
        } = this.state;
        const {
            loggedUserData,
            activeProfile,
            userWidgets,
            tilelineWidgetsLoading,
            saveWidgetsLoading,
            widgetProgressPhotos,
            widgetMuscle,
            widgetBodyFat,
            changeBodyFatLoading,
            changeBodyFatError,
            widgetBadges,
            timelineUserPrivacy,
            profile,
            match,
        } = this.props;
        let showCommentBox = false;
        let showPostBox = false;
        if (profile.friendshipStatus === FRIENDSHIP_STATUS_SELF) {
            showCommentBox = true;
            showPostBox = true;
        } else {
            if (timelineUserPrivacy && typeof timelineUserPrivacy.commentAccessibility !== 'undefined') {
                if (timelineUserPrivacy.commentAccessibility === parseInt(ACCESS_LEVEL_PUBLIC) || profile.friendshipStatus === FRIENDSHIP_STATUS_FRIEND && timelineUserPrivacy.commentAccessibility === parseInt(ACCESS_LEVEL_FRIENDS)) {
                    showCommentBox = true;
                }
            }
            if (timelineUserPrivacy && typeof timelineUserPrivacy.postAccessibility !== 'undefined') {
                if (timelineUserPrivacy.postAccessibility === parseInt(ACCESS_LEVEL_PUBLIC) || profile.friendshipStatus === FRIENDSHIP_STATUS_FRIEND && timelineUserPrivacy.postAccessibility === parseInt(ACCESS_LEVEL_FRIENDS)) {
                    showPostBox = true;
                }
            }
        }
        return (
            <div className="row">
                <div className="col-md-6">
                    {activeProfile && activeProfile.friendshipStatus === FRIENDSHIP_STATUS_SELF &&
                        <div className="add-widgets">
                            <button type="button" onClick={this.handleShowWidgetModal} disabled={tilelineWidgetsLoading}>
                                <span>Widgets</span>
                                {!tilelineWidgetsLoading && <i className="icon-widgets"></i>}
                                {tilelineWidgetsLoading && <FaSpinner className="loader-spinner ml-5" />}
                            </button>
                        </div>
                    }

                    {userWidgets && typeof userWidgets[WIDGET_PROGRESS_PHOTO] !== 'undefined' && userWidgets[WIDGET_PROGRESS_PHOTO] === 1 &&
                        <WidgetProgressPhotoCard progressPhoto={widgetProgressPhotos} username={match.params.username} />
                    }

                    {userWidgets && userWidgets[WIDGET_BODY_FAT] &&
                        <WidgetBodyFatCard
                            type={WIDGETS_TYPE_TIMELINE}
                            userWidgets={userWidgets}
                            bodyFat={widgetBodyFat}
                            changeBodyFatLoading={changeBodyFatLoading}
                            changeBodyFatError={changeBodyFatError}
                            requestBodyFatData={this.requestBodyFatData}
                        />
                    }

                    {userWidgets && userWidgets[WIDGET_MUSCLE] && userWidgets[WIDGET_MUSCLE].length > 0 &&
                        <WidgetMuscleCard
                            type={WIDGETS_TYPE_TIMELINE}
                            userWidgets={userWidgets}
                            muscle={widgetMuscle}
                            requestGraphData={this.requestGraphData}
                        />
                    }

                    {userWidgets && typeof userWidgets[WIDGET_BADGES] !== 'undefined' && userWidgets[WIDGET_BADGES] === 1 &&
                        <WidgetBadgesCard
                            badges={widgetBadges}
                        />
                    }
                </div>

                <div className="col-md-6">
                    <div className="white-box space-btm-20">
                        <div className="whitebox-head d-flex">
                            <h3 className="title-h3">Timeline</h3>
                        </div>
                        <div className="whitebox-body">
                            {showPostBox &&
                                <div className="how-training timeline-new-post-editor form-group">
                                    <ContentEditableTextarea
                                        ref={this.postTextarea}
                                        fieldProps={{
                                            className: "my-custom-textarea resize-vertical min-height-100",
                                            placeholder: "What's in your mind..."
                                        }}
                                        html={postContent}
                                        onChange={this.handlePostContentChange}
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
                                        <Emos
                                            ref={this.emos}
                                            pickerProps={{
                                                color: "#ff337f",
                                                onClick: this.handleEmoClick,
                                                onSelect: this.handleEmoSelect,
                                            }}
                                            positionClass="bottom-right"
                                            emosWrapClass="emos-timeline"
                                            emojiBtnSize={24}
                                        />
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
                                        <button type="button" onClick={this.handleMakePost} className="vertical-middle-r" disabled={newPostActionInit}>
                                            Post
                                            {!newPostActionInit && <i className="icon-send"></i>}
                                            {newPostActionInit && <FaSpinner className="loader-spinner" />}
                                        </button>
                                    </div>
                                </div>
                            }

                            <InfiniteScroll
                                pageStart={0}
                                loadMore={this.loadPostsData}
                                hasMore={hasMorePosts}
                                className="margin-top-30 timeline-infinite-scroll"
                                loader={
                                    <div className="loader" key={0}><FaCircleONotch className="loader-spinner loader-spinner-icon" /> Loading ...</div>
                                }
                            >
                                {posts.map((post, index) => {
                                    return (
                                        <PostCard
                                            key={index}
                                            post={post}
                                            profile={profile}
                                            index={index}
                                            loggedUserData={loggedUserData}
                                            handleOpenChangeAccessPostModal={this.handleOpenChangeAccessPostModal}
                                            handleOpenDeletePostModal={this.handleOpenDeletePostModal}
                                            handleOpenLightbox={this.handleOpenLightbox}
                                            toggleShowLikesModal={this.toggleShowLikesModal}
                                            handleToggleLike={this.handleToggleLike}
                                            handleComment={this.handleComment}
                                            showCommentBox={showCommentBox}
                                        />
                                    )
                                })}
                            </InfiniteScroll>
                        </div>
                    </div>
                </div>
                <AddPostPhotoModal
                    show={showPostPhotoModal}
                    handleClose={this.handleHidePostPhotosModal}
                    images={postImages}
                    postImagesError={postImagesError}
                    handleAddPostImages={this.handleAddPostImages}
                    handleRemovePostImags={this.handleRemovePostImage}
                />
                <WidgetsListModal
                    type={WIDGETS_TYPE_TIMELINE}
                    show={showAddWidgetModal}
                    handleClose={this.handleHideWidgetModal}
                    onSubmit={this.handleSaveWidget}
                    saveLoading={saveWidgetsLoading}
                />
                <SweetAlert
                    show={showPostDeleteModal}
                    danger
                    showCancel
                    confirmBtnText="Yes, delete it!"
                    confirmBtnBsStyle="danger"
                    cancelBtnBsStyle="default"
                    title="Are you sure?"
                    onConfirm={this.handleDeletePost}
                    onCancel={this.handleCloseDeletePostModal}
                >
                    You will not be able to recover it!
                </SweetAlert>

                <SweetAlert
                    show={showPostAccessChangeModal}
                    warning
                    showCancel
                    confirmBtnText="Yes, change it!"
                    confirmBtnBsStyle="warning"
                    cancelBtnBsStyle="default"
                    title="Are you sure?"
                    onConfirm={this.handleChangeAccessPost}
                    onCancel={this.handleCloseChangeAccessPostModal}
                >
                    Your post privacy will be changed!
                </SweetAlert>

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
            selectedPostId,
            selectedPostAccessLevel,
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
            postDeleteLoading,
            postDeleteError,
            postAccessChangeLoading,
            postAccessChangeError,
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
        if (!postDeleteLoading && prevProps.postDeleteLoading !== postDeleteLoading) {
            if (postDeleteError && postDeleteError.length > 0) {
                te('Something went wrong! please try again later');
            } else {
                let newPostsState = [];
                if (this.state.posts && this.state.posts.length > 0) {
                    this.state.posts.map((o) => {
                        if (o._id !== selectedPostId) {
                            newPostsState.push(o);
                        }
                    });
                }
                this.setState({ posts: newPostsState, selectedPostId: null });
                ts('Post deleted.');
            }
        }
        if (!postAccessChangeLoading && prevProps.postAccessChangeLoading !== postAccessChangeLoading) {
            if (postAccessChangeError && postAccessChangeError.length > 0) {
                te('Something went wrong! please try again later');
            } else {
                let newPostsState = [];
                if (this.state.posts && this.state.posts.length > 0) {
                    this.state.posts.map((o) => {
                        const _o = Object.assign({}, o);
                        if (_o._id === selectedPostId) {
                            _o.privacy = selectedPostAccessLevel;
                        }
                        newPostsState.push(_o);
                    });
                }
                this.setState({ posts: newPostsState, selectedPostId: null, selectedPostAccessLevel: null });
                ts('Accessibility changed');
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

    handleComment = (data) => {
        const { dispatch } = this.props;
        const { comment, postId, index } = data;
        const sanitizedComment = sanitizeEditableContentValue(comment);
        if (sanitizedComment && sanitizedComment.trim()) {
            var requestData = { comment: sanitizedComment, postId };
            this.setState({ selectedTimelineIndex: index, selectedTimelineId: postId, commentActionInit: true });
            dispatch(commentOnPostRequest(requestData));
        }
    }

    handlePostPrivacy = (access) => {
        this.setState({ postPrivacy: access });
    }

    handlePostContentChange = (value) => {
        this.setState({ postContent: value });
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
        const sanitizeContent = sanitizeEditableContentValue(postContent);
        if ((sanitizeContent && sanitizeContent.trim()) || (postImages && postImages.length > 0)) {
            var formData = new FormData();
            formData.append('description', sanitizeContent);
            formData.append('privacy', postPrivacy);
            formData.append('onWall', activeProfile.authUserId);
            if (postImages.length > 0) {
                postImages.map((img, index) => {
                    formData.append('images', img);
                })
            }
            this.setState({ newPostActionInit: true });
            dispatch(addPostOnUserTimelineRequest(formData));
            this.emos.current.forceOpenClose(false);
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

    handleAddPostImages = (filesToUpload, rejectedFiles) => {
        const { postImages } = this.state;
        let postImagesError = [];
        if (rejectedFiles && rejectedFiles.length > 0) {
            postImagesError = ['Invalid file(s). Please select jpg and png only'];
        }
        for (const file of filesToUpload) {
            checkImageMagicCode(file).then((image) => {
                this.setState((prevState) => {
                    return {
                        postImages: [...prevState.postImages, image]
                    }
                });
            }).catch((error) => {
                te(error.message);
            });
        }
        // var allImages = _.concat(postImages, filesToUpload);
        this.setState({ postImagesError });
    }

    handleRemovePostImage = (index) => {
        var postImages = this.state.postImages;
        postImages.splice(index, 1);
        this.setState({ postImages });
    }

    handleShowWidgetModal = () => {
        const { dispatch, userWidgets } = this.props;
        var formData = {
            [`widget_list_${WIDGET_MUSCLE}`]: false,
            [`widget_list_${WIDGET_PROGRESS_PHOTO}`]: false,
            [`widget_list_${WIDGET_BADGES}`]: false,
            [`widget_list_${WIDGET_BODY_FAT}`]: false,
            [`widget_list_${MUSCLE_WIDGET_NECK}`]: false,
            [`widget_list_${MUSCLE_WIDGET_SHOULDER}`]: false,
            [`widget_list_${MUSCLE_WIDGET_CHEST}`]: false,
            [`widget_list_${MUSCLE_WIDGET_UPPER_ARM}`]: false,
            [`widget_list_${MUSCLE_WIDGET_WAIST}`]: false,
            [`widget_list_${MUSCLE_WIDGET_FOREARM}`]: false,
            [`widget_list_${MUSCLE_WIDGET_HIPS}`]: false,
            [`widget_list_${MUSCLE_WIDGET_THIGH}`]: false,
            [`widget_list_${MUSCLE_WIDGET_CALF}`]: false,
            [`widget_list_${MUSCLE_WIDGET_HEART_RATE}`]: false,
            [`widget_list_${MUSCLE_WIDGET_WEIGHT}`]: false,
            [`widget_list_${MUSCLE_WIDGET_HEIGHT}`]: false,
        };
        if (userWidgets && typeof userWidgets[WIDGET_BADGES] !== 'undefined' && userWidgets[WIDGET_BADGES] === 1) {
            formData[`widget_list_${WIDGET_BADGES}`] = true;
        }
        if (userWidgets && typeof userWidgets[WIDGET_PROGRESS_PHOTO] !== 'undefined' && userWidgets[WIDGET_PROGRESS_PHOTO] === 1) {
            formData[`widget_list_${WIDGET_PROGRESS_PHOTO}`] = true;
        }
        if (userWidgets && userWidgets[WIDGET_BODY_FAT]) {
            formData[`widget_list_${WIDGET_BODY_FAT}`] = true;
        }
        if (userWidgets && userWidgets[WIDGET_MUSCLE] && userWidgets[WIDGET_MUSCLE].length > 0) {
            userWidgets[WIDGET_MUSCLE].map((o, i) => {
                if (o.name === MUSCLE_WIDGET_NECK) {
                    formData[`widget_list_${MUSCLE_WIDGET_NECK}`] = true;
                }
                if (o.name === MUSCLE_WIDGET_SHOULDER) {
                    formData[`widget_list_${MUSCLE_WIDGET_SHOULDER}`] = true;
                }
                if (o.name === MUSCLE_WIDGET_CHEST) {
                    formData[`widget_list_${MUSCLE_WIDGET_CHEST}`] = true;
                }
                if (o.name === MUSCLE_WIDGET_UPPER_ARM) {
                    formData[`widget_list_${MUSCLE_WIDGET_UPPER_ARM}`] = true;
                }
                if (o.name === MUSCLE_WIDGET_WAIST) {
                    formData[`widget_list_${MUSCLE_WIDGET_WAIST}`] = true;
                }
                if (o.name === MUSCLE_WIDGET_FOREARM) {
                    formData[`widget_list_${MUSCLE_WIDGET_FOREARM}`] = true;
                }
                if (o.name === MUSCLE_WIDGET_HIPS) {
                    formData[`widget_list_${MUSCLE_WIDGET_HIPS}`] = true;
                }
                if (o.name === MUSCLE_WIDGET_THIGH) {
                    formData[`widget_list_${MUSCLE_WIDGET_THIGH}`] = true;
                }
                if (o.name === MUSCLE_WIDGET_CALF) {
                    formData[`widget_list_${MUSCLE_WIDGET_CALF}`] = true;
                }
                if (o.name === MUSCLE_WIDGET_HEART_RATE) {
                    formData[`widget_list_${MUSCLE_WIDGET_HEART_RATE}`] = true;
                }
                if (o.name === MUSCLE_WIDGET_WEIGHT) {
                    formData[`widget_list_${MUSCLE_WIDGET_WEIGHT}`] = true;
                }
                if (o.name === MUSCLE_WIDGET_HEIGHT) {
                    formData[`widget_list_${MUSCLE_WIDGET_HEIGHT}`] = true;
                }
            });
            formData[`widget_list_${WIDGET_MUSCLE}`] = true;
        }
        dispatch(initialize('widgets_list_form', formData));
        this.setState({ showAddWidgetModal: true });
    }

    handleHideWidgetModal = () => {
        const { dispatch } = this.props;
        this.setState({ showAddWidgetModal: false });
        dispatch(reset('widgets_list_form'));
    }

    handleSaveWidget = (data) => {
        const { dispatch, userWidgets } = this.props;
        let dateRange = moment.range(
            moment().startOf('day').subtract(1, 'month').utc(),
            moment().startOf('day').utc(),
        );
        let requestData = {
            [WIDGET_BADGES]: 0,
            [WIDGET_PROGRESS_PHOTO]: 0,
            [WIDGET_BODY_FAT]: null,
            [WIDGET_MUSCLE]: null,
        };
        if (typeof data[`widget_list_${WIDGET_BADGES}`] !== 'undefined' && data[`widget_list_${WIDGET_BADGES}`]) {
            requestData[WIDGET_BADGES] = 1;
        }
        if (typeof data[`widget_list_${WIDGET_PROGRESS_PHOTO}`] !== 'undefined' && data[`widget_list_${WIDGET_PROGRESS_PHOTO}`]) {
            requestData[WIDGET_PROGRESS_PHOTO] = 1;
        }
        if (typeof data[`widget_list_${WIDGET_BODY_FAT}`] !== 'undefined' && data[`widget_list_${WIDGET_BODY_FAT}`]) {
            let _data = null;
            if (userWidgets && userWidgets[WIDGET_BODY_FAT]) {
                _data = userWidgets[WIDGET_BODY_FAT];
            } else {
                _data = {
                    start: dateRange.start,
                    end: dateRange.end,
                };
            }
            requestData[WIDGET_BODY_FAT] = _data;
        }
        if (typeof data[`widget_list_${WIDGET_MUSCLE}`] !== 'undefined' && data[`widget_list_${WIDGET_MUSCLE}`]) {
            let _data = [
                { name: MUSCLE_WIDGET_NECK, start: dateRange.start, end: dateRange.end },
                { name: MUSCLE_WIDGET_SHOULDER, start: dateRange.start, end: dateRange.end },
                { name: MUSCLE_WIDGET_CHEST, start: dateRange.start, end: dateRange.end },
                { name: MUSCLE_WIDGET_UPPER_ARM, start: dateRange.start, end: dateRange.end },
                { name: MUSCLE_WIDGET_WAIST, start: dateRange.start, end: dateRange.end },
                { name: MUSCLE_WIDGET_FOREARM, start: dateRange.start, end: dateRange.end },
                { name: MUSCLE_WIDGET_HIPS, start: dateRange.start, end: dateRange.end },
                { name: MUSCLE_WIDGET_THIGH, start: dateRange.start, end: dateRange.end },
                { name: MUSCLE_WIDGET_CALF, start: dateRange.start, end: dateRange.end },
                { name: MUSCLE_WIDGET_HEART_RATE, start: dateRange.start, end: dateRange.end },
                { name: MUSCLE_WIDGET_WEIGHT, start: dateRange.start, end: dateRange.end },
                { name: MUSCLE_WIDGET_HEIGHT, start: dateRange.start, end: dateRange.end }
            ];
            requestData[WIDGET_MUSCLE] = _data;
        }
        dispatch(saveTimelineWidgetsRequest(requestData));
    }

    requestGraphData = (requestData) => {
        const { dispatch } = this.props;
        dispatch(changeTimelineMuscleInnerDataRequest(requestData));
    }

    requestBodyFatData = (requestData) => {
        const { dispatch } = this.props;
        dispatch(changeTimelineBodyFatWidgetRequest(requestData));
    }

    handleOpenDeletePostModal = (id) => {
        this.setState({ showPostDeleteModal: true, selectedPostId: id });
    }

    handleCloseDeletePostModal = () => {
        this.setState({ showPostDeleteModal: false });
    }

    handleDeletePost = () => {
        const { selectedPostId } = this.state;
        const { dispatch } = this.props;
        this.handleCloseDeletePostModal();
        dispatch(deletePostOfTimelineRequest(selectedPostId));
    }

    handleOpenChangeAccessPostModal = (level, id) => {
        this.setState({ showPostAccessChangeModal: true, selectedPostId: id, selectedPostAccessLevel: level });
    }

    handleCloseChangeAccessPostModal = () => {
        this.setState({ showPostAccessChangeModal: false });
    }

    handleChangeAccessPost = () => {
        const { selectedPostId, selectedPostAccessLevel } = this.state;
        const { dispatch } = this.props;
        this.handleCloseChangeAccessPostModal();
        let requestData = { privacy: selectedPostAccessLevel }
        dispatch(changeAccessLevelPostOfTimelineRequest(selectedPostId, requestData));
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

    toggleShowLikesModal = (postId) => {
        const { posts } = this.state;
        let newPosts = [];
        posts.map((o) => {
            if (o._id === postId) {
                if (o.showLikesModal) {
                    o.showLikesModal = false;
                } else {
                    o.showLikesModal = true;
                }
            }
            newPosts.push(o);
        });
        this.setState({ posts: newPosts });
    }

    handleEmoClick = (emoji, event) => {
        const { id } = emoji;
        this.appendDescription(id);
        this.postTextarea.current.focus();
    }

    handleEmoSelect = (emoji) => {
        const { id } = emoji;
        this.appendDescription(id);
        this.postTextarea.current.focus();
    }

    appendDescription = (id) => {
        if (id) {
            const { postContent } = this.state;
            const _postContent = postContent +
                ReactDOMServer.renderToString(<span contentEditable={false} dangerouslySetInnerHTML={{
                    __html: Emoji({ html: true, set: 'emojione', emoji: id, size: 16 })
                }}></span>) +
                ReactDOMServer.renderToString(<span>&nbsp;</span>);
            this.setState({ postContent: _postContent });
        }
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
        widgetProgressPhotos: timelineWidgets.get('progressPhoto'),
        widgetMuscle: timelineWidgets.get('muscle'),
        widgetBodyFat: timelineWidgets.get('bodyFat'),
        changeBodyFatLoading: timelineWidgets.get('changeBodyFatLoading'),
        changeBodyFatError: timelineWidgets.get('changeBodyFatError'),
        widgetBadges: timelineWidgets.get('badges'),
        timelineUserPrivacy: userTimeline.get('privacy'),
        postDeleteLoading: userTimeline.get('postDeleteLoading'),
        postDeleteError: userTimeline.get('postDeleteError'),
        postAccessChangeLoading: userTimeline.get('postAccessChangeLoading'),
        postAccessChangeError: userTimeline.get('postAccessChangeError'),
    };
}

export default connect(
    mapStateToProps,
)(ProfileFithub);