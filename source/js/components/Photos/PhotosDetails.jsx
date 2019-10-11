import React, { Component } from 'react';
import exerciseImage from '../../../assets/img/exercise/fitness/img-13.jpg';
import NutritionMealPhotoes from '../Nutrition/Meal/NutritionMealPhotoes';
import TagsInput from 'react-tagsinput';
import { Scrollbars } from 'react-custom-scrollbars';
import Dropzone from 'react-dropzone';
import uploadImg from '../../../assets/img/cloud-upload.png';

const musclesList = ['Neck', 'Shoulders', 'Biceps', 'Triceps', 'Forearm'];

class PhotosDetails extends Component {
  constructor(props) {
    super(props);
    this.isFileSelected = false;
    this.rejectedFiles = false;
    this.state = {
      tags: ['Fitter', 'Gunshow', 'Running'],
      images: [],
      visibility: 'LifeStyle',
    };
  }
  handleChange = tags => {
    this.setState({ tags });
  };

  render() {
    const { accept } = this.props;
    const { visibility, images } = this.state;
    return (
      <React.Fragment>
        <div className="photo-detail-header d-flex flex-wrap">
          <h3>Photo Details</h3>
          <button
            className="btn d-flex flex-wrap align-items-center btn-del-group"
            onClick={() => this.setState({ images: [] })}
          >
            <div>{images.length === 1 ? 'Delete Photo' : 'Delete Group'}</div>
            <i className="fad fa-trash ml-auto" />
          </button>
        </div>
        <div className="photo-detail-body p-2">
          <div className="row no-gutters">
            <div className="col-xs-12 col-md-7">
              <div className="photo-detail-box">
                <div className="row no-gutters width-100-per d-flex flex-wrap align-items-center display-serve">
                  <div className="col-xs-12 col-lg-6 d-flex flex-wrap justify-content-start">
                    <h3 className="detail-title">Type</h3>
                  </div>
                  <div className="col-xs-12 col-lg-6 d-flex flex-wrep align-items-center">
                    <div className="serving-select pl-3 width-100-per">
                      <select
                        className="form-control"
                        defaultValue={visibility}
                        onChange={e =>
                          this.setState({ visibility: e.target.value })
                        }
                      >
                        <option value="Progress">Progress</option>
                        <option value="LifeStyle">LifeStyle</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="photo-detail-box">
                <div className="row no-gutters width-100-per d-flex flex-wrap align-items-center display-serve">
                  <div className="col-xs-12 col-lg-6 d-flex flex-wrap justify-content-start">
                    <h3 className="detail-title">Visibility</h3>
                  </div>
                  <div className="col-xs-12 col-lg-6 d-flex flex-wrep align-items-center">
                    <div className="serving-select pl-3 width-100-per">
                      <select className="form-control">
                        <option>Public</option>
                        <option>Private</option>
                        <option>Friends</option>
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
                      value="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
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
              {visibility !== 'LifeStyle' && (
                <div className="photo-detail-box mb-0">
                  <div className="row no-gutters width-100-per d-flex flex-wrap align-items-center display-serve">
                    <div className="col-xs-12 col-lg-6 d-flex flex-wrap justify-content-start">
                      <h3 className="detail-title">Muscles</h3>
                    </div>
                    <div className="col-xs-12 col-lg-12 d-flex flex-wrap justify-content-start muscles-lists">
                      <Scrollbars autoHide>
                        <ul className="muscles-list">
                          {musclesList.map((item, i) => (
                            <li>
                              <div className="d-flex flex-wrap align-items-center muscles-items">
                                <div className="muscles-title">{item}</div>
                                <div className="custom-checkbox ml-auto">
                                  <div className="custom_check mb-0 d-flex">
                                    <input
                                      type="checkbox"
                                      id={item}
                                      name={item}
                                      defaultChecked={false}
                                    />
                                    <label
                                      className="mb-0"
                                      htmlFor={item}
                                      name={item}
                                    ></label>
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
            </div>
            <div className="col-xs-12 col-md-5 upload-images-list">
              <Scrollbars autoHide>
                <div className="display-image-box mr-0 ml-2 pos-relative">
                  <img
                    src={exerciseImage}
                    alt="image"
                    className="width-100-per"
                  />
                  {images.length > 1 && (
                    <button className="btn btn-photo-del">
                      <i className="fad fa-trash" />
                    </button>
                  )}
                </div>
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
                      accept ? accept : 'image/jpeg, image/png, image/jpg'
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
}

export default PhotosDetails;
