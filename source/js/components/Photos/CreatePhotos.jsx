import React, { Component } from "react";
import exerciseImage from "../../../assets/img/exercise/fitness/img-13.jpg";
import NutritionMealPhotoes from "../Nutrition/Meal/NutritionMealPhotoes";
import TagsInput from "react-tagsinput";
import { Scrollbars } from "react-custom-scrollbars";
import Dropzone from "react-dropzone";
import uploadImg from "../../../assets/img/cloud-upload.png";
import {
  PROGRESS_PHOTO_CATEGORIES,
  ACCESS_LEVEL_PUBLIC,
  ACCESS_LEVEL_PUBLIC_STR,
  ACCESS_LEVEL_PRIVATE,
  ACCESS_LEVEL_PRIVATE_STR,
  ACCESS_LEVEL_FRIENDS,
  ACCESS_LEVEL_FRIENDS_STR,
  ACCESS_LEVEL_FRIENDS_OF_FRIENDS,
  ACCESS_LEVEL_FRIENDS_OF_FRIENDS_STR,
  PROGRESS_PHOTO_BASICS,
  PROGRESS_PHOTO_POSED
} from "../../constants/consts";
import { getUserBodypartsRequest } from "../../actions/userBodyparts";
import { connect } from "react-redux";
import { hidePageLoader, showPageLoader } from "../../actions/pageLoader";
import { te, ts } from "../../helpers/funs";
import Cropper from "react-cropper";
import Modal from "react-bootstrap/lib/Modal";
import _filter from "lodash/filter";
import {
  addUserProgressActivityPhotoRequest,
  addUserProgressPhotoRequest,
  getUserRecentHashTagsRequest
} from "../../actions/userProgressPhotos";
import { withRouter } from "react-router-dom";
import { routeCodes } from "../../constants/routes";

const musclesList = ["Neck", "Shoulders", "Biceps", "Triceps", "Forearm"];
let newBasicList = PROGRESS_PHOTO_BASICS;
newBasicList.forEach(item => {
  item.checked = false;
});
let newPosedList = PROGRESS_PHOTO_POSED;
newPosedList.forEach(item => {
  item.checked = false;
});

class CreatePhotos extends Component {
  constructor(props) {
    super(props);
    this.isFileSelected = false;
    this.rejectedFiles = false;
    this.state = {
      isInitSelectedImages: false,
      showSelectedImageAlert: false,
      tags: [],
      images: [],
      selectedImages: [],
      visibility: 3,
      categoryType: "",
      bodypartsIsolationList: [],
      basicList: newBasicList,
      posedList: newPosedList,
      description: null
    };
  }
  componentDidMount() {
    this.getRequestData();
  }
  getRequestData = () => {
    const { dispatch } = this.props;
    dispatch(showPageLoader());
    dispatch(getUserBodypartsRequest());
    dispatch(getUserRecentHashTagsRequest());
  };
  render() {
    const { accept, handleChangeCreatePhotos, recentHashTags } = this.props;
    const {
      visibility,
      categoryType,
      bodypartsIsolationList,
      basicList,
      posedList,
      description,
      showSelectedImageAlert,
      selectedImages,
      isInitSelectedImages
    } = this.state;

    return (
      <React.Fragment>
        <div className="photo-detail-header d-flex flex-wrap">
          <h3>Upload Photos</h3>
          <button
            className="btn d-flex flex-wrap align-items-center btn-cancel ml-auto"
            onClick={() => handleChangeCreatePhotos()}
          >
            <div>Cancel</div>
          </button>
          <button
            className="btn d-flex flex-wrap align-items-center btn-save"
            onClick={this.handleSubmit}
          >
            <div>Save</div>
          </button>
        </div>
        <div className="photo-detail-body p-2">
          <div className="row no-gutters">
            <div className="col-xs-12 col-md-6 upload-images-list">
              <Scrollbars autoHide>
                <div className="display-image-box mr-3 ml-2 mb-2">
                  <Dropzone
                    accept={
                      accept ? accept : "image/jpeg, image/png, image/jpg"
                    }
                    onDrop={(filesToUpload, rejectedFiles) => {
                      this.rejectedFiles =
                        rejectedFiles && rejectedFiles.length > 0;
                      if (filesToUpload && filesToUpload.length > 0) {
                        this.isFileSelected = true;
                      }
                      this.setState({ images: filesToUpload }, () => {
                        this.setState({
                          isInitSelectedImages: true,
                          showSelectedImageAlert: true
                        });
                      });
                    }}
                    onFileDialogCancel={() => {
                      if (!this.isFileSelected) {
                      }
                    }}
                    multiple={true}
                    className="photos-dropzone-wrapper width-100-per"
                  >
                    <div className="dz-singl-default-wrapper d-flex flex-wrap width-100-per">
                      <img src={uploadImg} alt="upload" />

                      <div className="display-text">
                        <span className="title">Drag and drop images</span>
                        <span className="sub-title">
                          or <font>browse</font> to choose files
                        </span>
                      </div>
                    </div>
                  </Dropzone>
                </div>
                <div className="row no-gutters">
                  {!isInitSelectedImages &&
                    selectedImages.length > 0 &&
                    selectedImages.map((item, i) => (
                      <div className="col-md-6">
                        <div
                          className="display-image-box mt-2 mr-2 pos-relative"
                          key={i}
                        >
                          <img
                            key={i}
                            src={item}
                            alt="image"
                            className="width-100-per"
                          />
                          <button
                            className="btn btn-photo-del"
                            onClick={() => this.handleDeleteSelectedImages(i)}
                          >
                            <i className="fad fa-trash" />
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </Scrollbars>
            </div>

            <div className="col-xs-12 col-md-6 progress-photos-right">
              <Scrollbars autoHide>
                <div className="photo-detail-box">
                  <div className="row no-gutters width-100-per d-flex flex-wrap align-items-center display-serve">
                    <div className="col-xs-12 col-lg-6 d-flex flex-wrap justify-content-start">
                      <h3 className="detail-title">Type</h3>
                    </div>
                    <div className="col-xs-12 col-lg-6 d-flex flex-wrep align-items-center">
                      <div className="serving-select pl-3 width-100-per">
                        <select
                          className="form-control"
                          value={categoryType}
                          onChange={e =>
                            this.setState({ categoryType: e.target.value })
                          }
                        >
                          <option disabled selected value="">
                            Select
                          </option>
                          {PROGRESS_PHOTO_CATEGORIES.map((item, k) => (
                            <option value={item.value} key={item.value}>
                              {item.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {categoryType === PROGRESS_PHOTO_CATEGORIES[0].value && (
                  <div className="photo-detail-box">
                    <div className="row no-gutters width-100-per d-flex flex-wrap align-items-center display-serve">
                      <div className="col-xs-12 col-lg-6 d-flex flex-wrap justify-content-start">
                        <h3 className="detail-title">Sub Category</h3>
                      </div>
                      <div className="col-xs-12 col-lg-12 d-flex flex-wrap justify-content-start muscles-lists">
                        <Scrollbars autoHide>
                          <ul className="muscles-list">
                            {basicList.map((item, i) => (
                              <li key={i}>
                                <div className="d-flex flex-wrap align-items-center muscles-items">
                                  <div className="muscles-title">
                                    {item.label}
                                  </div>
                                  <div className="custom-checkbox ml-auto">
                                    <div className="custom_check mb-0 d-flex">
                                      <input
                                        type="checkbox"
                                        id={`checkbox-basic-${i}`}
                                        name={item.label}
                                        checked={item.checked}
                                        onClick={() =>
                                          this.handleChangeBasicList(
                                            i,
                                            item.checked
                                          )
                                        }
                                      />
                                      <label
                                        className="mb-0"
                                        htmlFor={`checkbox-basic-${i}`}
                                        name={item.label}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </Scrollbars>
                      </div>
                    </div>
                  </div>
                )}
                {categoryType === PROGRESS_PHOTO_CATEGORIES[1].value && (
                  <div className="photo-detail-box">
                    <div className="row no-gutters width-100-per d-flex flex-wrap align-items-center display-serve">
                      <div className="col-xs-12 col-lg-6 d-flex flex-wrap justify-content-start">
                        <h3 className="detail-title">Sub Category</h3>
                      </div>
                      <div className="col-xs-12 col-lg-12 d-flex flex-wrap justify-content-start muscles-lists">
                        <Scrollbars autoHide>
                          <ul className="muscles-list">
                            {bodypartsIsolationList.map((item, i) => (
                              <li key={i}>
                                <div className="d-flex flex-wrap align-items-center muscles-items">
                                  <div className="muscles-title">
                                    {item.title}
                                  </div>
                                  <div className="custom-checkbox ml-auto">
                                    <div className="custom_check mb-0 d-flex">
                                      <input
                                        type="checkbox"
                                        id={`checkbox-body-${i}`}
                                        name={item.title}
                                        checked={item.checked}
                                        onClick={() =>
                                          this.handleChangeBodyPartsIsolationList(
                                            i,
                                            item.checked
                                          )
                                        }
                                      />
                                      <label
                                        className="mb-0"
                                        htmlFor={`checkbox-body-${i}`}
                                        name={item.title}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </Scrollbars>
                      </div>
                    </div>
                  </div>
                )}
                {categoryType === PROGRESS_PHOTO_CATEGORIES[2].value && (
                  <div className="photo-detail-box">
                    <div className="row no-gutters width-100-per d-flex flex-wrap align-items-center display-serve">
                      <div className="col-xs-12 col-lg-6 d-flex flex-wrap justify-content-start">
                        <h3 className="detail-title">Sub Category</h3>
                      </div>
                      <div className="col-xs-12 col-lg-12 d-flex flex-wrap justify-content-start muscles-lists">
                        <Scrollbars autoHide>
                          <ul className="muscles-list">
                            {posedList.map((item, i) => (
                              <li key={i}>
                                <div className="d-flex flex-wrap align-items-center muscles-items">
                                  <div className="muscles-title">
                                    {item.label}
                                  </div>
                                  <div className="custom-checkbox ml-auto">
                                    <div className="custom_check mb-0 d-flex">
                                      <input
                                        type="checkbox"
                                        id={`checkbox-posed-${i}`}
                                        name={item.label}
                                        checked={item.checked}
                                        onClick={() =>
                                          this.handleChangePosedList(
                                            i,
                                            item.checked
                                          )
                                        }
                                      />
                                      <label
                                        className="mb-0"
                                        htmlFor={`checkbox-posed-${i}`}
                                        name={item.label}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </Scrollbars>
                      </div>
                    </div>
                  </div>
                )}
                <div className="photo-detail-box">
                  <div className="row no-gutters width-100-per d-flex flex-wrap align-items-center display-serve">
                    <div className="col-xs-12 col-lg-6 d-flex flex-wrap justify-content-start">
                      <h3 className="detail-title">Visibility</h3>
                    </div>
                    <div className="col-xs-12 col-lg-6 d-flex flex-wrep align-items-center">
                      <div className="serving-select pl-3 width-100-per">
                        <select
                          className="form-control"
                          value={visibility}
                          onChange={e =>
                            this.setState({
                              visibility: parseInt(e.target.value)
                            })
                          }
                        >
                          <option value={ACCESS_LEVEL_PUBLIC}>
                            {ACCESS_LEVEL_PUBLIC_STR}
                          </option>
                          <option value={ACCESS_LEVEL_PRIVATE}>
                            {ACCESS_LEVEL_PRIVATE_STR}
                          </option>
                          <option value={ACCESS_LEVEL_FRIENDS}>
                            {ACCESS_LEVEL_FRIENDS_STR}
                          </option>
                          <option value={ACCESS_LEVEL_FRIENDS_OF_FRIENDS}>
                            {ACCESS_LEVEL_FRIENDS_OF_FRIENDS_STR}
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="photo-detail-box">
                  <div className="row no-gutters width-100-per d-flex flex-wrap align-items-center display-serve">
                    <div className="col-xs-12 col-lg-6 d-flex flex-wrap justify-content-start">
                      <h3 className="detail-title">Description</h3>
                    </div>
                    <div className="col-xs-12 col-lg-12 d-flex flex-wrep align-items-center">
                      <textarea
                        className="form-control mt-2"
                        rows="5"
                        value={description}
                        onChange={e =>
                          this.setState({ description: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="photo-detail-box">
                  <div className="row no-gutters width-100-per d-flex flex-wrap align-items-center display-serve">
                    <div className="col-xs-12 col-lg-6 d-flex flex-wrap justify-content-start">
                      <h3 className="detail-title">Tags</h3>
                    </div>
                    <div className="col-xs-12 col-lg-12 d-flex flex-wrep align-items-center">
                      <TagsInput
                        type="text"
                        value={this.state.tags}
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="col-xs-12 col-lg-12 d-flex flex-wrep">
                      <h3 className="detail-sub-title">Recent Tags</h3>
                      <ul className="recent-tags-list">
                        {recentHashTags &&
                          recentHashTags.length > 0 &&
                          recentHashTags.map((item, i) => (
                            <li
                              key={i}
                              className="cursor-pointer"
                              onClick={() => this.handleAddHashTags(item.tag)}
                            >
                              #{item.tag}
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Scrollbars>
            </div>
            <Modal
              show={showSelectedImageAlert}
              bsSize="large"
              className="progress-popup"
            >
              <form>
                <div className="progress-popup-head">
                  <button
                    type="button"
                    className="close-round"
                    onClick={() =>
                      this.setState({ showSelectedImageAlert: false })
                    }
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                  <h3 className="title-h3">New Progress Photo</h3>
                </div>
                <div className="progress-popup-body">
                  <div className="crop-l">
                    <React.Fragment>
                      <label
                        htmlFor="caption"
                        className="control-label display_block"
                      >
                        Selected Image{" "}
                      </label>
                    </React.Fragment>
                  </div>
                  <div className="row">
                    {this.state.images.length > 0 &&
                      this.state.images.map((item, k) => {
                        return (
                          <div className="col-md-6">
                            <Cropper
                              className="mt-2"
                              ref={`cropper${k}`}
                              src={item.preview}
                              viewMode={1}
                              aspectRatio={1}
                              guides={true}
                              autoCropArea={0.8}
                              cropBoxResizable={true}
                              minCropBoxWidth={300}
                              minCropBoxHeight={300}
                              alt="Selected Progress Image"
                              crop={crop =>
                                this.selectProgressImage(k, `cropper${k}`)
                              }
                            />
                          </div>
                        );
                      })}
                  </div>
                </div>
                <div className="progress-popup-footer">
                  <div className="crop-r">
                    <div className="pregres-submit">
                      <button
                        type="button"
                        onClick={this.handleAddProgressPhotos}
                      >
                        Add Photos <i className="icon-control_point" />
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </Modal>
          </div>
        </div>
      </React.Fragment>
    );
  }
  componentDidUpdate(prevProps, prevState) {
    const {
      dispatch,
      bodypartsLoading,
      bodyparts,
      bodypartsError,
      loading,
      progressPhoto,
      progressError,
      recentHashTags,
      histroy
    } = this.props;
    if (!bodypartsLoading && prevProps.bodyparts !== bodyparts) {
      let newBodyPartsList = [];
      bodyparts &&
        bodyparts.length > 0 &&
        bodyparts.forEach(item => {
          newBodyPartsList.push({
            title: item.bodypart,
            checked: false,
            id: item._id
          });
        });
      this.setState({ bodypartsIsolationList: newBodyPartsList });
      dispatch(hidePageLoader());
    }
    if (
      !bodypartsLoading &&
      prevProps.bodypartsError !== bodypartsError &&
      bodypartsError.length > 0
    ) {
      dispatch(hidePageLoader());
      te();
    }
    if (!loading && prevProps.progressPhoto !== progressPhoto) {
      dispatch(hidePageLoader());
      ts("Progress Photos Successfully inserted");
      histroy.push(routeCodes.CALENDAR_OVERVIEW);
    }
    if (
      !loading &&
      prevProps.progressError !== progressError &&
      progressError.length > 0
    ) {
      dispatch(hidePageLoader());
      te();
    }
    if (!loading && prevProps.recentHashTags !== recentHashTags) {
      dispatch(hidePageLoader());
    }
  }
  handleChange = tags => {
    this.setState({ tags });
  };
  handleAddHashTags = tag => {
    let { tags } = this.state;
    tags.push(tag);
    this.setState({ tags });
  };
  handleChangeBodyPartsIsolationList = (index, value) => {
    let { bodypartsIsolationList } = this.state;
    bodypartsIsolationList[index].checked = !value;
    this.setState({ bodypartsIsolationList });
  };
  handleChangeBasicList = (index, value) => {
    let { basicList } = this.state;
    basicList[index].checked = !value;
    this.setState({ basicList });
  };
  handleChangePosedList = (index, value) => {
    let { posedList } = this.state;
    posedList[index].checked = !value;
    this.setState({ posedList });
  };
  selectProgressImage = (index, refsValue) => {
    let { selectedImages } = this.state;
    selectedImages[index] = this.refs[refsValue].getCroppedCanvas().toDataURL();
    this.setState({ selectedImages });
  };
  handleDeleteSelectedImages = index => {
    let { selectedImages } = this.state;
    selectedImages.splice(index, 1);
    this.setState({ selectedImages });
  };
  handleAddProgressPhotos = () => {
    this.setState({
      isInitSelectedImages: false,
      showSelectedImageAlert: false
    });
  };
  handleSubmit = async () => {
    const {
      description,
      visibility,
      categoryType,
      selectedImages,
      basicList,
      bodypartsIsolationList,
      posedList,
      tags
    } = this.state;
    const { logDate, dispatch } = this.props;
    let subCategory = [];

    if (categoryType === PROGRESS_PHOTO_CATEGORIES[0].value) {
      var selectedBasic = _filter(basicList, "checked");
      selectedBasic.length > 0 &&
        selectedBasic.forEach(item => {
          subCategory.push(item.value);
        });
    } else if (categoryType === PROGRESS_PHOTO_CATEGORIES[1].value) {
      var selectedIsolation = _filter(bodypartsIsolationList, "checked");
      selectedIsolation.length > 0 &&
        selectedIsolation.forEach(item => {
          subCategory.push({ bodyparts_id: item.id });
        });
    } else if (categoryType === PROGRESS_PHOTO_CATEGORIES[2].value) {
      var selectedPosed = _filter(posedList, "checked");
      selectedPosed.length > 0 &&
        selectedPosed.forEach(item => {
          subCategory.push(item.value);
        });
    }
    const requestData = {
      date: new Date(logDate).toISOString(),
      description,
      progressPhotosData: {
        caption: description,
        category: categoryType,
        subCategory: subCategory,
        images: selectedImages,
        visibility: visibility,
        tags: tags
      }
    };
    dispatch(showPageLoader());
    await dispatch(
      addUserProgressPhotoRequest(requestData, res => {
        res && ts("Progress Photos Successfully inserted");
      })
    );
  };
}
const mapStateToProps = state => {
  const { userBodyparts, userProgressPhotos } = state;
  return {
    bodyparts: userBodyparts.get("bodyparts"),
    bodypartsLoading: userBodyparts.get("loading"),
    bodypartsError: userBodyparts.get("error"),
    loading: userProgressPhotos.get("loading"),
    progressPhoto: userProgressPhotos.get("progressPhoto"),
    progressError: userProgressPhotos.get("error"),
    recentHashTags: userProgressPhotos.get("recentHashTags")
  };
};

export default connect(mapStateToProps)(withRouter(CreatePhotos));
