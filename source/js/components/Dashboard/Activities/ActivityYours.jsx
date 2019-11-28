import React, { Component } from "react";
import ReactDOMServer from "react-dom/server";
import InfiniteScroll from "react-infinite-scroller";
import {
  getUserTimelineRequest,
  addPostOnUserTimelineRequest,
  getDiscoverUserTimelineRequest
} from "../../../actions/userTimeline";
import { connect } from "react-redux";
import {
  FaGlobe,
  FaLock,
  FaGroup,
  FaSpinner,
  FaCircleONotch
} from "react-icons/lib/fa";
import PostCard from "../../Profile/PostCard";
import { hidePageLoader, showPageLoader } from "../../../actions/pageLoader";
import {
  isOnline,
  sanitizeEditableContentValue,
  checkImageMagicCode,
  ts
} from "../../../helpers/funs";
import { getProfileDetailsRequest } from "../../../actions/profile";
import ActivityYoursCard from "./ActivityYoursCard";
import _ from "lodash";
import { toggleLikeOnPostRequest } from "../../../actions/postLikes";
import { commentOnPostRequest } from "../../../actions/postComments";
import {
  ACCESS_LEVEL_PRIVATE,
  FRIENDSHIP_STATUS_SELF,
  ACCESS_LEVEL_PUBLIC,
  ACCESS_LEVEL_PUBLIC_STR,
  ACCESS_LEVEL_FRIENDS,
  ACCESS_LEVEL_FRIENDS_STR,
  ACCESS_LEVEL_PRIVATE_STR
} from "../../../constants/consts";
import { initialize, reset } from "redux-form";
import ContentEditableTextarea from "../../Common/ContentEditableTextarea";
import Emos from "../../Common/Emos";
import { MenuItem, Dropdown } from "react-bootstrap";
import AddPostPhotoModal from "../../Profile/AddPostPhotoModal";
import { Emoji } from "emoji-mart";
import noActivityFoundImg from "../../../../assets/img/no-activity-found.png";

class ActivityYours extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      start: 0,
      offset: 5,
      hasMorePosts: true,
      selectActionInit: false,
      likeActionInit: false,
      selectedTimelineIndex: null,
      selectedTimelineId: null,
      commentActionInit: false,
      postContent: "",
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
      lightBoxImages: []
    };
    this.postTextarea = React.createRef();
    this.emos = React.createRef();
  }

  render() {
    let showCommentBox = false;
    let showPostBox = true;
    const {
      hasMorePosts,
      posts,
      start,
      postContent,
      postImages,
      postImagesError,
      postPrivacy,
      newPostActionInit,
      showPostPhotoModal
    } = this.state;
    const {
      profile,
      loggedUserData,
      activeProfile,
      activityTab,
      postLoading
    } = this.props;
    return (
      <React.Fragment>
        {activityTab === "yours" &&
          showPostBox && (
            <div className="m-3">
              <div className="how-training timeline-new-post-editor form-group">
                <ContentEditableTextarea
                  ref={this.postTextarea}
                  fieldProps={{
                    className:
                      "my-custom-textarea resize-vertical min-height-100",
                    placeholder: "What's in your mind..."
                  }}
                  html={postContent}
                  onChange={this.handlePostContentChange}
                />
                {postImages &&
                  postImages.length > 0 && (
                    <div className="post-photos-selected-view-wrapper">
                      <ul>
                        {postImages.map((img, imgI) => {
                          return (
                            <li key={imgI}>
                              <img src={img.preview} />
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                <div className="how-training-btm d-flex justify-content-end">
                  <Emos
                    ref={this.emos}
                    pickerProps={{
                      color: "#ff337f",
                      onClick: this.handleEmoClick,
                      onSelect: this.handleEmoSelect
                    }}
                    positionClass="bottom-right"
                    emosWrapClass="emos-timeline"
                    emojiBtnSize={24}
                  />
                  <a
                    href="javascript:void(0)"
                    onClick={this.handleShowPostPhotosModal}
                  >
                    <i className="icon-photo_size_select_actual vertical-middle-c" />
                  </a>
                  {activeProfile &&
                    activeProfile.friendshipStatus ===
                      FRIENDSHIP_STATUS_SELF && (
                      <Dropdown id="post_privacy">
                        <Dropdown.Toggle className="d-flex public-dropdown">
                          {postPrivacy === ACCESS_LEVEL_PUBLIC && (
                            <span>
                              <FaGlobe />
                              <strong>{ACCESS_LEVEL_PUBLIC_STR}</strong>
                            </span>
                          )}
                          {postPrivacy === ACCESS_LEVEL_FRIENDS && (
                            <span>
                              <FaGroup />
                              <strong>{ACCESS_LEVEL_FRIENDS_STR}</strong>
                            </span>
                          )}
                          {postPrivacy === ACCESS_LEVEL_PRIVATE && (
                            <span>
                              <FaLock />
                              <strong>{ACCESS_LEVEL_PRIVATE_STR}</strong>
                            </span>
                          )}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <MenuItem
                            eventKey="3"
                            onClick={() =>
                              this.handlePostPrivacy(ACCESS_LEVEL_PUBLIC)
                            }
                          >
                            <FaGlobe /> {ACCESS_LEVEL_PUBLIC_STR}
                          </MenuItem>
                          <MenuItem
                            eventKey="2"
                            onClick={() =>
                              this.handlePostPrivacy(ACCESS_LEVEL_FRIENDS)
                            }
                          >
                            <FaGroup /> {ACCESS_LEVEL_FRIENDS_STR}
                          </MenuItem>
                          <MenuItem
                            eventKey="1"
                            onClick={() =>
                              this.handlePostPrivacy(ACCESS_LEVEL_PRIVATE)
                            }
                          >
                            <FaLock /> {ACCESS_LEVEL_PRIVATE_STR}
                          </MenuItem>
                        </Dropdown.Menu>
                      </Dropdown>
                    )}
                  <button
                    type="button"
                    onClick={this.handleMakePost}
                    className="vertical-middle-r"
                    disabled={newPostActionInit}
                  >
                    Post
                    {!newPostActionInit && <i className="icon-send" />}
                    {newPostActionInit && (
                      <FaSpinner className="loader-spinner" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        <InfiniteScroll
          pageStart={0}
          loadMore={this.loadPostsData.bind(this)}
          hasMore={hasMorePosts}
          className="margin-top-30 timeline-infinite-scroll m-3"
          loader={
            <div className="loader" key={0}>
              <FaCircleONotch className="loader-spinner loader-spinner-icon mr-1" />
              Loading ...
            </div>
          }
          useWindow={false}
        >
          {posts.map((post, index) => {
            return (
              <ActivityYoursCard
                key={index}
                post={post}
                profile={profile}
                index={index}
                loggedUserData={loggedUserData}
                handleOpenChangeAccessPostModal={
                  this.handleOpenChangeAccessPostModal
                }
                handleOpenDeletePostModal={this.handleOpenDeletePostModal}
                handleOpenLightbox={this.handleOpenLightbox}
                toggleShowLikesModal={this.toggleShowLikesModal}
                handleToggleLike={this.handleToggleLike}
                handleComment={this.handleComment}
                commentLoading={this.props.commentLoading}
                showCommentBox={showCommentBox}
              />
            );
          })}
        </InfiniteScroll>
        {!postLoading &&
          (!posts || posts.length === 0) && (
            <div className="d-flex flex-wrap justify-content-center dashboard-record-not-found">
              <img
                src={noActivityFoundImg}
                alt="NoWorkoutFound"
                height="240px"
              />
              <h3 className="mt-emoji-mart-skin-tone-5">Add post any to</h3>
              <h3> get started</h3>
            </div>
          )}

        <AddPostPhotoModal
          show={showPostPhotoModal}
          handleClose={this.handleHidePostPhotosModal}
          images={postImages}
          postImagesError={postImagesError}
          handleAddPostImages={this.handleAddPostImages}
          handleRemovePostImags={this.handleRemovePostImage}
        />
      </React.Fragment>
    );
  }
  componentDidMount() {
    const { dispatch, loggedUserData } = this.props;
    dispatch(getProfileDetailsRequest(loggedUserData.username));
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      postLoading,
      posts,
      profile,
      profileLoading,
      dispatch,
      likeLoading,
      commentLoading,
      likePost,
      likeError,
      commentPost,
      commentError,
      error,
      post
    } = this.props;
    let {
      selectActionInit,
      offset,
      start,
      forceUpdateChildComponents,
      likeActionInit,
      commentActionInit,
      selectedTimelineIndex,
      newPostActionInit
    } = this.state;

    if (!postLoading && prevProps.posts !== posts) {
      this.setState({ posts: posts });
    }
    if (selectActionInit && !postLoading) {
      console.log("===========Call DID UPDATE===========");
      console.log("==========================");
      var hasMorePosts = posts && posts.length > 0 ? true : false;
      var newPosts = this.state.posts;
      // if(!isOnline()){
      //     dispatch(setTimelineState(data));
      // }
      if (posts && posts.length > 0 && isOnline()) {
        newPosts = _.concat(this.state.posts, posts);
      }
      this.setState({
        selectActionInit: false,
        posts: newPosts,
        start: start + offset,
        hasMorePosts
      });
    }
    if (newPostActionInit && !postLoading) {
      ts("Your post successfully uploaded");
      var newPostsState = this.state.posts;
      if (error && error.length > 0) {
        // show errors
      } else {
        newPostsState.splice(0, 0, post);
      }
      this.setState({
        newPostActionInit: false,
        posts: newPostsState,
        postContent: "",
        postPrivacy: ACCESS_LEVEL_PUBLIC,
        postImages: []
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
        selectedPostForDetails
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
      dispatch(reset("commentBoxForm"));
      this.setState({
        commentActionInit: false,
        selectedTimelineIndex: null,
        selectedTimelineId: null,
        posts: newPostsState,
        selectedPostForDetails
      });
    }
  }
  setForceUpdateChildComponents = flag => {
    this.setState({ forceUpdateChildComponents: flag });
  };
  loadPostsData = page => {
    if (!isOnline()) {
      this.setState({ hasMorePosts: false });
    }
    if (isOnline()) {
      const { start, offset, selectActionInit } = this.state;
      const { match, dispatch, activityTab, loggedUserData } = this.props;
      console.log("===========call===========");
      console.log("==========================");
      if (!selectActionInit) {
        var username = loggedUserData.username;
        if (isOnline()) {
          activityTab === "yours" &&
            dispatch(getUserTimelineRequest(username, start, offset));
          activityTab === "discover" &&
            dispatch(getDiscoverUserTimelineRequest(start, offset));
        }
        this.setState({ selectActionInit: true });
      }
    }
  };
  handleToggleLike = (index, postId) => {
    const { dispatch } = this.props;
    var requestData = {
      postId: postId
    };
    this.setState({
      likeActionInit: true,
      selectedTimelineIndex: index,
      selectedTimelineId: postId
    });
    dispatch(toggleLikeOnPostRequest(requestData));
  };
  handleComment = data => {
    const { dispatch } = this.props;
    const { comment, postId, index } = data;
    const sanitizedComment = sanitizeEditableContentValue(comment);
    if (sanitizedComment && sanitizedComment.trim()) {
      var requestData = { comment: sanitizedComment, postId };
      this.setState({
        selectedTimelineIndex: index,
        selectedTimelineId: postId,
        commentActionInit: true
      });
      dispatch(commentOnPostRequest(requestData));
    }
  };
  handlePostPrivacy = access => {
    this.setState({ postPrivacy: access });
  };
  handleShowPostPhotosModal = () => {
    this.setState({ showPostPhotoModal: true });
  };
  handleHidePostPhotosModal = () => {
    this.setState({ showPostPhotoModal: false });
  };
  handleAddPostImages = (filesToUpload, rejectedFiles) => {
    const { postImages } = this.state;
    let postImagesError = [];
    if (rejectedFiles && rejectedFiles.length > 0) {
      postImagesError = ["Invalid file(s). Please select jpg and png only"];
    }
    for (const file of filesToUpload) {
      checkImageMagicCode(file)
        .then(image => {
          this.setState(prevState => {
            return {
              postImages: [...prevState.postImages, image]
            };
          });
        })
        .catch(error => {
          te(error.message);
        });
    }
    // var allImages = _.concat(postImages, filesToUpload);
    this.setState({ postImagesError });
  };

  handleRemovePostImage = index => {
    var postImages = this.state.postImages;
    postImages.splice(index, 1);
    this.setState({ postImages });
  };

  handlePostContentChange = value => {
    this.setState({ postContent: value });
  };
  handleEmoClick = (emoji, event) => {
    const { id } = emoji;
    this.appendDescription(id);
    this.postTextarea.current.focus();
  };
  handleEmoSelect = emoji => {
    const { id } = emoji;
    this.appendDescription(id);
    this.postTextarea.current.focus();
  };
  appendDescription = id => {
    if (id) {
      const { postContent } = this.state;
      const _postContent =
        postContent +
        ReactDOMServer.renderToString(
          <span
            contentEditable={false}
            dangerouslySetInnerHTML={{
              __html: Emoji({
                html: true,
                set: "emojione",
                emoji: id,
                size: 16
              })
            }}
          />
        ) +
        ReactDOMServer.renderToString(<span>&nbsp;</span>);
      this.setState({ postContent: _postContent });
    }
  };
  handleMakePost = () => {
    if (isOnline()) {
      const { postContent, postPrivacy, postImages } = this.state;
      const { activeProfile, dispatch } = this.props;
      const sanitizeContent = sanitizeEditableContentValue(postContent);
      if (
        (sanitizeContent && sanitizeContent.trim()) ||
        (postImages && postImages.length > 0)
      ) {
        var formData = new FormData();
        formData.append("description", sanitizeContent);
        formData.append("privacy", postPrivacy);
        formData.append("onWall", activeProfile.authUserId);
        if (postImages.length > 0) {
          postImages.map((img, index) => {
            formData.append("images", img);
          });
        }
        this.setState({ newPostActionInit: true });
        dispatch(addPostOnUserTimelineRequest(formData));
        this.emos.current.forceOpenClose(false);
      }
    } else {
      tw("You are offline, please check your internet connection");
    }
  };
}
const mapStateToProps = state => {
  const { profile, user, userTimeline, postLikes, postComments } = state;
  return {
    profileLoading: profile.get("loading"),
    profile: profile.get("profile"),
    activeProfile: profile.get("profile"),
    profileError: profile.get("error"),
    loggedUserData: user.get("loggedUserData"),
    postLoading: userTimeline.get("loading"),
    posts: userTimeline.get("posts"),
    post: userTimeline.get("post"),
    error: userTimeline.get("error"),
    likeLoading: postLikes.get("loading"),
    likePost: postLikes.get("post"),
    likeError: postLikes.get("error"),
    commentLoading: postComments.get("loading"),
    commentPost: postComments.get("post"),
    commentError: postComments.get("error")
  };
};

export default connect(mapStateToProps)(ActivityYours);
