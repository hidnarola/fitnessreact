import React, { Component } from "react";
import { ButtonToolbar, DropdownButton, MenuItem } from "react-bootstrap";
import ImageGallery from "react-image-gallery";
import img1 from "../../../../../assets/img/progress/img18.jpg";
import img2 from "../../../../../assets/img/progress/img19.jpg";
import img3 from "../../../../../assets/img/progress/img20.jpg";
import img4 from "../../../../../assets/img/progress/img15.jpg";
import img5 from "../../../../../assets/img/progress/img7.jpg";
import {
  SERVER_BASE_URL,
  PROGRESS_PHOTO_BASICS,
  PROGRESS_PHOTO_POSED
} from "../../../../constants/consts";
import { connect } from "react-redux";

const images = [
  {
    original: img1,
    thumbnail: img1
  },
  {
    original: img2,
    thumbnail: img2
  },
  {
    original: img3,
    thumbnail: img3
  },
  {
    original: img4,
    thumbnail: img4
  },
  {
    original: img5,
    thumbnail: img5
  }
];

class PhotosActivityList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imagesList: []
    };
  }
  componentDidMount() {
    let { imagesList } = this.state;
    const { todayPhoto } = this.props;
    const { image } = todayPhoto.user_progress_photos[0];
    image.length > 0 &&
      image.forEach(item => {
        let imagepath = `${SERVER_BASE_URL}${item.image}`;
        imagesList.push({ original: imagepath, thumbnail: imagepath });
      });
    this.setState({ imagesList });
  }
  render() {
    const { imagesList } = this.state;
    const { todayPhoto } = this.props;
    const {
      image,
      category,
      hashTags,
      isolation,
      basic,
      posed
    } = todayPhoto.user_progress_photos[0];
    let musclesList = [];
    if (category === "isolation") {
      musclesList = isolation.map(item => this.getIsolation(item.bodyparts_id));
      console.log("===========musclesList===========");
      console.log("musclesList", musclesList);
      console.log("==========================");
    } else if (category === "basic") {
      musclesList = basic.map(item => this.getBasic(item));
    } else if (category === "posed") {
      musclesList = posed.map(item => this.getPosed(item));
    }
    return (
      <React.Fragment>
        <li className="workout-list-items active d-flex">
          <div className="workout-content width-100-per">
            <div
              className="d-flex flex-wrap width-100-per align-items-center p-3"
              style={{ background: "#201f60", borderRadius: "5px 5px 0 0" }}
            >
              <div>
                <div className="title cursor-pointer">
                  {category !== "lifestyle" ? "Progress" : "LifeStyle"}
                </div>
                {hashTags.length > 0 && (
                  <div className="sub-title cursor-pointer display-flex">
                    #
                    <ul>
                      {hashTags.map((item, i) => (
                        <li key={i}>
                          <a href="#">{item}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <ButtonToolbar className="progress-toolbar ml-auto">
                <DropdownButton
                  className="progress-btn d-flex align-items-center"
                  title={<i className="fa fa-globe-europe mr-2" />}
                  id="dropdown-size-medium"
                  pullRight
                >
                  <MenuItem eventKey="1">Only me</MenuItem>
                  <MenuItem eventKey="2">Public</MenuItem>
                  <MenuItem eventKey="3">Friends</MenuItem>
                  <MenuItem eventKey="4">Friends Of Friends</MenuItem>
                </DropdownButton>
              </ButtonToolbar>
            </div>
            <div className="is-complete dashboard-photos-body">
              <div className="row no-gutters">
                <div className="col-md-6">
                  <div className="photo-card m-1">
                    <div className="photo-slider">
                      <ImageGallery
                        items={imagesList}
                        // showThumbnails={imagesList.length > 1 ? true : false}
                        showFullscreenButton={false}
                        showPlayButton={false}
                        autoPlay={true}
                        renderLeftNav={this.renderLeftNav}
                        renderRightNav={this.renderRightNav}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="photos-descriptions m-1 mr-1">
                    <div className="row bg-white no-gutters">
                      {category !== "lifestyle" && (
                        <div className="col-md-12 ">
                          <div className="p-2 border-down">
                            <div className="dec-title">Muscles</div>
                            <div className="dec-content">
                              {musclesList.length > 0 &&
                                musclesList.map((item, index) => {
                                  return (
                                    <span>
                                      {item}
                                      {index + 1 !== musclesList.length && ", "}
                                    </span>
                                  );
                                })}
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="col-md-12">
                        <div className="p-2">
                          <div className="dec-title">Description</div>
                          <div className="dec-content">
                            {todayPhoto.description
                              ? todayPhoto.description
                              : ""}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
      </React.Fragment>
    );
  }
  renderLeftNav = (onClick, disabled) => {
    return (
      <button
        className="image-gallery-custom-left-nav"
        disabled={disabled}
        onClick={onClick}
      >
        <i className="fad fa-chevron-left" />
      </button>
    );
  };
  renderRightNav = (onClick, disabled) => {
    return (
      <button
        className="image-gallery-custom-right-nav"
        disabled={disabled}
        onClick={onClick}
      >
        <i className="fad fa-chevron-right" />
      </button>
    );
  };
  getIsolation = isolationID => {
    const { bodyparts } = this.props;
    if (bodyparts && bodyparts.length > 0) {
      let newParts = bodyparts.filter(item => item._id === isolationID);
      return newParts[0].bodypart;
      console.log("===========newParts===========");
      console.log("newParts", newParts);
      console.log("==========================");
    } else {
      return [];
    }
  };
  getBasic = value => {
    let newBasic = PROGRESS_PHOTO_BASICS.filter(item => item.value === value);
    if (newBasic.length > 0) {
      return newBasic[0].label;
    } else {
      return [];
    }
  };
  getPosed = value => {
    let newPosed = PROGRESS_PHOTO_POSED.filter(item => item.value === value);
    if (newPosed.length > 0) {
      return newPosed[0].label;
    } else {
      return [];
    }
  };
}
const mapStateToProps = state => {
  const { userBodyparts } = state;
  return {
    bodyparts: userBodyparts.get("bodyparts")
  };
};

export default connect(mapStateToProps)(PhotosActivityList);
