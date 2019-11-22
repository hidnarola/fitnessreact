import React, { Component } from "react";
import exerciseImage from "../../../assets/img/exercise/fitness/img-13.jpg";
import NutritionMealPhotoes from "../Nutrition/Meal/NutritionMealPhotoes";
import TagsInput from "react-tagsinput";
import { Scrollbars } from "react-custom-scrollbars";
import Dropzone from "react-dropzone";
import uploadImg from "../../../assets/img/cloud-upload.png";
import { connect } from "react-redux";
import noImg from "img/common/no-img.png";
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
  PROGRESS_PHOTO_POSED,
  SERVER_BASE_URL
} from "../../constants/consts";
import { hidePageLoader, showPageLoader } from "../../actions/pageLoader";
import { te } from "../../helpers/funs";
import { getUserBodypartsRequest } from "../../actions/userBodyparts";
import NoRecordFound from "../Common/NoRecordFound";

const musclesList = ["Neck", "Shoulders", "Biceps", "Triceps", "Forearm"];
let newBasicList = PROGRESS_PHOTO_BASICS;
newBasicList.forEach(item => {
  item.checked = false;
});
let newPosedList = PROGRESS_PHOTO_POSED;
newPosedList.forEach(item => {
  item.checked = false;
});

class PhotosDetails extends Component {
  constructor(props) {
    super(props);
    this.isFileSelected = false;
    this.rejectedFiles = false;
    this.state = {
      tags: ["Fitter", "Gunshow", "Running"],
      images: [],
      visibility: 3,
      categoryType: "",
      bodypartsIsolationList: [],
      basicList: newBasicList,
      posedList: newPosedList
    };
  }
  handleChange = tags => {
    this.setState({ tags });
  };
  componentDidMount() {
    const { todayProgressPhotoDetail } = this.props;
    let category = todayProgressPhotoDetail
      ? todayProgressPhotoDetail.user_progress_photos[0].category
      : "";
    let hashTags = todayProgressPhotoDetail
      ? todayProgressPhotoDetail.user_progress_photos[0].hashTags
      : "";
    this.setState({ categoryType: category, tags: hashTags });
    const { dispatch } = this.props;
    dispatch(showPageLoader());
    dispatch(getUserBodypartsRequest());
  }
  componentDidUpdate(prevProps, prevState) {
    const {
      todayProgressPhotoDetail,
      dispatch,
      bodypartsLoading,
      bodyparts,
      bodypartsError,
      loading
    } = this.props;
    let category = todayProgressPhotoDetail
      ? todayProgressPhotoDetail.user_progress_photos[0].category
      : "";
    let hashTags = todayProgressPhotoDetail
      ? todayProgressPhotoDetail.user_progress_photos[0].hashTags
      : [];
    if (
      todayProgressPhotoDetail &&
      prevProps.todayProgressPhotoDetail !== todayProgressPhotoDetail &&
      prevProps.category !== category
    ) {
      this.setState({ categoryType: category });
    }
    if (
      todayProgressPhotoDetail &&
      prevProps.todayProgressPhotoDetail !== todayProgressPhotoDetail &&
      prevProps.hashTags !== hashTags
    ) {
      this.setState({ tags: hashTags });
    }
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
    }
  }

  render() {
    const {
      accept,
      todayProgressPhotoDetail,
      todayProgressPhotos
    } = this.props;
    const {
      visibility,
      images,
      categoryType,
      bodypartsIsolationList,
      posedList,
      basicList
    } = this.state;
    console.log("===========todayProgressPhotosDetail===========");
    console.log("todayProgressPhotosDetail", todayProgressPhotoDetail);
    console.log("==========================");
    let description = todayProgressPhotoDetail
      ? todayProgressPhotoDetail.description
      : "";
    let category = todayProgressPhotoDetail
      ? todayProgressPhotoDetail.user_progress_photos[0].category
      : "";
    let image = todayProgressPhotoDetail
      ? todayProgressPhotoDetail.user_progress_photos[0].image
      : [];
    return (
      <React.Fragment>
        <div className="photo-detail-header d-flex flex-wrap">
          <h3>Photo Details</h3>
          <button
            className="btn d-flex flex-wrap align-items-center btn-del-group"
            onClick={() => this.setState({ images: [] })}
          >
            <div>{images.length === 1 ? "Delete Photo" : "Delete Group"}</div>
            <i className="fad fa-trash ml-auto" />
          </button>
        </div>
        <div className="photo-detail-body p-2">
          <div className="row no-gutters">
            <div className="col-xs-12 col-md-7">
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
                        value={description ? description : ""}
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
                        <li>#LifeStyle</li>
                        <li>#Trainers</li>
                        <li>#Superfit</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Scrollbars>
            </div>
            <div className="col-xs-12 col-md-5 upload-images-list">
              <Scrollbars autoHide>
                {image &&
                  image.length > 0 &&
                  image.map((item, i) => (
                    <div className="display-image-box mr-0 ml-2 mt-2 pos-relative">
                      <img
                        key={i}
                        src={`${SERVER_BASE_URL}${item.image}`}
                        alt="image"
                        className="width-100-per"
                        onError={e => {
                          e.target.src = noImg;
                        }}
                      />
                      <button className="btn btn-photo-del">
                        <i className="fad fa-trash" />
                      </button>
                    </div>
                  ))}
                {this.state.images.map((item, i) => (
                  <div className="display-image-box mr-0 ml-2 mt-2 pos-relative">
                    <img
                      key={i}
                      src={item.preview}
                      alt="image"
                      className="width-100-per"
                    />
                    <button className="btn btn-photo-del">
                      <i className="fad fa-trash" />
                    </button>
                  </div>
                ))}
                <div className="display-image-box mr-0 ml-2">
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
                      this.setState({ images: filesToUpload });
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
              </Scrollbars>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
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
}

const mapStateToProps = state => {
  const { userBodyparts, userProgressPhotos } = state;
  return {
    bodyparts: userBodyparts.get("bodyparts"),
    bodypartsLoading: userBodyparts.get("loading"),
    bodypartsError: userBodyparts.get("error"),
    loading: userProgressPhotos.get("loading"),
    recentHashTags: userProgressPhotos.get("recentHashTags")
  };
};

export default connect(mapStateToProps)(PhotosDetails);
