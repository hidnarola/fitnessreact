import { Map } from "immutable";
import {
    ADD_USER_PROGRESS_PHOTO_REQUEST,
    ADD_USER_PROGRESS_PHOTO_SUCCESS,
    ADD_USER_PROGRESS_PHOTO_ERROR,
    GET_USER_PROGRESS_PHOTO_REQUEST,
    GET_USER_PROGRESS_PHOTO_SUCCESS,
    GET_USER_PROGRESS_PHOTO_ERROR,
    GET_USER_LATEST_PROGRESS_PHOTO_REQUEST,
    GET_USER_LATEST_PROGRESS_PHOTO_SUCCESS,
    GET_USER_LATEST_PROGRESS_PHOTO_ERROR,
    LOAD_MORE_USER_PROGRESS_PHOTO_REQUEST,
    LOAD_MORE_USER_PROGRESS_PHOTO_SUCCESS,
    LOAD_MORE_USER_PROGRESS_PHOTO_ERROR,
    DELETE_USER_PROGRESS_PHOTO_REQUEST,
    DELETE_USER_PROGRESS_PHOTO_SUCCESS,
    DELETE_USER_PROGRESS_PHOTO_ERROR,
    FORWARD_IMAGE_TO_DETAILS_PAGE,
    CANCEL_IMAGE_SELECTED_FROM_DETAILS_PAGE,
    ADD_IMAGE_SELECTED_FROM_DETAILS_PAGE,
    REMOVE_SELECTED_PROGRESS_PHOTOS_TO_UPLOAD,
    DELETE_IMAGE_SELECTED_FROM_DETAILS_PAGE,
    SET_PROGRESS_PHOTOS,
    ADD_USER_PROGRESS_ACTIVITY_PHOTO_REQUEST,
    ADD_USER_PROGRESS_ACTIVITY_PHOTO_SUCCESS,
    ADD_USER_PROGRESS_ACTIVITY_PHOTO_ERROR,
    GET_RECENT_TAGS_PROGRESS_PHOTOS_REQUEST,
    GET_RECENT_TAGS_PROGRESS_PHOTOS_ERROR,
    GET_RECENT_TAGS_PROGRESS_PHOTOS_SUCCESS
} from "../actions/userProgressPhotos";
import { VALIDATION_FAILURE_STATUS } from "../constants/consts";
import { generateValidationErrorMsgArr } from "../helpers/funs";

const initialState = Map({
    loading: false,
    error: [],
    progressPhoto:null,
    progressPhotos: [],
    photoLoadMoreLoading: false,
    photoStart: 0,
    photoLimit: 10,
    photoDataOver: false,

    deleteLoading: false,
    deleteId: null,
    deleteError: [],

    selectedImage: null,
    selectedProgressPhotos: [],

    progressActivityLoading: false,
    progressActivityPhoto: null,
    progressActivityPhotos: [],
    progressActivityPhotosError: [],

    recentHashTags: [],
});

const actionMap = {
    [GET_USER_PROGRESS_PHOTO_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            progressPhotos: [],
            photoStart: action.start,
            photoLimit: action.noOfPhotos,
            photoDataOver: false,
            error: [],
        }));
    },
    [GET_USER_PROGRESS_PHOTO_SUCCESS]: (state, action) => {
        let prevPhotoLimit = state.get('photoLimit');
        let newState = { loading: false };
        if (action.data && action.data.status && action.data.status === 1) {
            newState.progressPhotos = action.data.user_progress_photos;
            if (action.data.user_progress_photos && action.data.user_progress_photos.length <= 0) {
                newState.photoDataOver = true;
            }
            if (action.data.total_records && (action.data.total_records <= 0 || action.data.total_records <= prevPhotoLimit)) {
                newState.photoDataOver = true;
            }
        } else {
            let msg = (action.message) ? action.message : 'Something went wrong! please try again later.';
            newState.error = [msg];
        }
        return state.merge(Map(newState));
    },
    [GET_USER_PROGRESS_PHOTO_ERROR]: (state, action) => {
        let error = [];
        if (action.error.status && action.error.status === VALIDATION_FAILURE_STATUS && action.error.response.message) {
            error = generateValidationErrorMsgArr(action.error.response.message);
        } else if (action.error && action.error.message) {
            error = [action.error.message];
        } else {
            error = ['Something went wrong! please try again later'];
        }
        var newState = {
            loading: false,
            error: error,
        }
        return state.merge(Map(newState));
    },
    [LOAD_MORE_USER_PROGRESS_PHOTO_REQUEST]: (state, action) => {
        var newState = {
            photoLoadMoreLoading: true,
            photoStart: action.start,
            photoLimit: action.noOfPhotos,
            photoDataOver: false,
            error: [],
        }
        return state.merge(Map(newState));
    },
    [LOAD_MORE_USER_PROGRESS_PHOTO_SUCCESS]: (state, action) => {
        let prevPhotos = state.get('progressPhotos');
        let newState = { photoLoadMoreLoading: false };
        if (action.data && action.data.status && action.data.status === 1) {
            if (action.data.user_progress_photos && action.data.user_progress_photos.length > 0) {
                newState.progressPhotos = prevPhotos.concat(action.data.user_progress_photos);
                if (action.data.total_records && (action.data.total_records <= 0 || action.data.total_records <= newState.progressPhotos.length)) {
                    newState.photoDataOver = true;
                }
            } else {
                newState.photoDataOver = true;
            }
        } else if (action.data && action.data.status && action.data.status === 2) {
            newState.photoDataOver = true;
        } else {
            let msg = (action.message) ? action.message : 'Something went wrong! please try again later.';
            newState.error = [msg];
        }
        return state.merge(Map(newState));
    },
    [LOAD_MORE_USER_PROGRESS_PHOTO_ERROR]: (state, action) => {
        let error = [];
        if (action.error.status && action.error.status === VALIDATION_FAILURE_STATUS && action.error.response.message) {
            error = generateValidationErrorMsgArr(action.error.response.message);
        } else if (action.error && action.error.message) {
            error = [action.error.message];
        } else {
            error = ['Something went wrong! please try again later'];
        }
        var newState = {
            photoLoadMoreLoading: false,
            error: error,
        }
        return state.merge(Map(newState));
    },
    [GET_USER_LATEST_PROGRESS_PHOTO_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            progressPhotos: [],
            error: [],
        }));
    },
    [GET_USER_LATEST_PROGRESS_PHOTO_SUCCESS]: (state, action) => {
        let newState = { loading: false }
        if (action.data && action.data.status && action.data.status === 1) {
            newState.progressPhotos = action.data.user_progress_photos;
        } else {
            let msg = (action.message) ? action.message : 'Something went wrong! please try again later.';
            newState.error = [msg];
        }
        return state.merge(Map(newState));
    },
    [GET_USER_LATEST_PROGRESS_PHOTO_ERROR]: (state, action) => {
        let error = [];
        if (action.error.status && action.error.status === VALIDATION_FAILURE_STATUS && action.error.response.message) {
            error = generateValidationErrorMsgArr(action.error.response.message);
        } else if (action.error && action.error.message) {
            error = [action.error.message];
        } else {
            error = ['Something went wrong! please try again later'];
        }
        var newState = {
            loading: false,
            error: error,
        }
        return state.merge(Map(newState));
    },
    [ADD_USER_PROGRESS_PHOTO_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            progressPhoto: null,
            error: [],
        }));
    },
    [ADD_USER_PROGRESS_PHOTO_SUCCESS]: (state, action) => {
      console.log('===========Progress Photo Success===========')
      console.log('Progress Photo Success',action.data)
      console.log('==========================')
      let newActivity = action.data && action.data.data.user_progress_photo
        return state.merge(Map({
            loading: false,
            progressPhoto: newActivity,
            error: [],
        }));
    },
    [ADD_USER_PROGRESS_PHOTO_ERROR]: (state, action) => {
        let error = [];
        if (action.error.status && action.error.status === VALIDATION_FAILURE_STATUS && action.error.response.message) {
            error = generateValidationErrorMsgArr(action.error.response.message);
        } else if (action.error && action.error.message) {
            error = [action.error.message];
        } else {
            error = ['Something went wrong! please try again later'];
        }
        var newState = {
            loading: false,
            error: error,
        }
        return state.merge(Map(newState));
    },
    [DELETE_USER_PROGRESS_PHOTO_REQUEST]: (state, action) => {
        return state.merge(Map({
            deleteLoading: true,
            deleteId: action.id,
            deleteError: [],
        }));
    },
    [DELETE_USER_PROGRESS_PHOTO_SUCCESS]: (state, action) => {
        let prevDeleteId = state.get('deleteId');
        let prevProgressPhotos = state.get('progressPhotos');
        let newState = { deleteLoading: false, deleteId: null };
        if (action.data && action.data.status && action.data.status === 1) {
            let index = -1;
            prevProgressPhotos.map((o, i) => {
                if (o._id === prevDeleteId) {
                    index = i;
                }
            });
            if (index >= 0) {
                prevProgressPhotos.splice(index, 1);
                newState.progressPhotos = prevProgressPhotos;
            }
        } else {
            let msg = action.data.message ? action.data.message : 'Something went wrong! please try again later.'
            newState.deleteError = [msg];
        }
        return state.merge(Map(newState));
    },
    [DELETE_USER_PROGRESS_PHOTO_ERROR]: (state, action) => {
        let error = [];
        if (action.error.status && action.error.status === VALIDATION_FAILURE_STATUS && action.error.response.message) {
            error = generateValidationErrorMsgArr(action.error.response.message);
        } else if (action.error && action.error.message) {
            error = [action.error.message];
        } else {
            error = ['Something went wrong! please try again later'];
        }
        var newState = {
            deleteLoading: false,
            deleteId: null,
            deleteError: error,
        }
        return state.merge(Map(newState));
    },
    [FORWARD_IMAGE_TO_DETAILS_PAGE]: (state, action) => {
        const { image } = action;
        let newState = { selectedImage: image }
        return state.merge(Map(newState));
    },
    [CANCEL_IMAGE_SELECTED_FROM_DETAILS_PAGE]: (state, action) => {
        let newState = { selectedImage: null }
        return state.merge(Map(newState));
    },
    [ADD_IMAGE_SELECTED_FROM_DETAILS_PAGE]: (state, action) => {
        let imageData = action.imageData;
        let prevSelectedImages = state.get('selectedProgressPhotos');
        prevSelectedImages.push(imageData);
        return state.merge(Map({
            selectedProgressPhotos: prevSelectedImages
        }));
    },
    [DELETE_IMAGE_SELECTED_FROM_DETAILS_PAGE]: (state, action) => {
        let { index } = action;
        let prevSelectedImages = state.get('selectedProgressPhotos');
        prevSelectedImages.splice(index, 1);
        return state.merge(Map({
            selectedProgressPhotos: prevSelectedImages
        }));
    },
    [REMOVE_SELECTED_PROGRESS_PHOTOS_TO_UPLOAD]: (state, action) => {
        return state.merge(Map({
            selectedProgressPhotos: []
        }));
    },
    [SET_PROGRESS_PHOTOS]: (state, action) => {
        return state.merge(Map(action.data));
    },
   [ADD_USER_PROGRESS_ACTIVITY_PHOTO_REQUEST]: (state, action) => {
      return state.merge(Map({
        progressActivityLoading: true,
        progressActivityPhoto: null,
        progressActivityPhotosError: [],
      }));
  },
  [ADD_USER_PROGRESS_ACTIVITY_PHOTO_SUCCESS]: (state, action) => {
      let newActivity = action.data && action.data.data.user_progress_photo
      return state.merge(Map({
        progressActivityLoading: false,
        progressActivityPhoto: newActivity,
        progressActivityPhotosError: [],
      }));
  },
  [ADD_USER_PROGRESS_ACTIVITY_PHOTO_ERROR]: (state, action) => {
      let error = [];
      if (action.error.status && action.error.status === VALIDATION_FAILURE_STATUS && action.error.response.message) {
          error = generateValidationErrorMsgArr(action.error.response.message);
      } else if (action.error && action.error.message) {
          error = [action.error.message];
      } else {
          error = ['Something went wrong! please try again later'];
      }
      var newState = {
        progressActivityLoading: false,
        progressActivityPhotosError: error,
      }
      return state.merge(Map(newState));
  },
  [GET_RECENT_TAGS_PROGRESS_PHOTOS_REQUEST] : (state,action) => {
    return state.merge(Map({
      loading:true
    }));
  },
  [GET_RECENT_TAGS_PROGRESS_PHOTOS_SUCCESS] : (state,action) => {
    console.log('===========HASH TAGS SUCCESS===========')
    console.log("HASH TAGS SUCCESS",action.data.hashTags)
    console.log('==========================')
    // var newState = {
    //   recentHashTagsLoading: false,
    // };
    // if (action.data.status === 1) {
    //   newState.recentHashTags = action.data.hashTags;
    //   newState.recentHashTagsError = [];
    // }else {
    //   var msg = (action.data.message) ? action.data.message : 'Something went wrong! please try again later.';
    //   newState.workouts = [];
    //   newState.error = [msg];
    // }
    // console.log('===========HASH TAGS SUCCESS newState===========')
    // console.log('HASH TAGS SUCCESS',newState)
    // console.log('==========================')
    return state.merge(Map({
      loading: false,
      recentHashTags: action.data.hashTags ? action.data.hashTags : []
    }));
  },

  [GET_RECENT_TAGS_PROGRESS_PHOTOS_ERROR]: (state, action) => {
    let error = [];
    if (action.error.status && action.error.status === VALIDATION_FAILURE_STATUS && action.error.response.message) {
        error = generateValidationErrorMsgArr(action.error.response.message);
    } else if (action.error && action.error.message) {
        error = [action.error.message];
    } else {
        error = ['Something went wrong! please try again later'];
    }
    var newState = {
      recentHashTagsLoading: false,
      recentHashTagsError: error,
    }
    return state.merge(Map(newState));
},
}

export default function reducer(state = initialState, action = {}) {
    if (action && action.type) {
        var fn = actionMap[action.type];
        return fn ? fn(state, action) : state;
    }
    return state;
}
