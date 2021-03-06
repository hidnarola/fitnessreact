import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reset, initialize, formValueSelector } from 'redux-form';
import BodyMeasurementForm from './BodyMeasurementForm';
import { showPageLoader, hidePageLoader } from '../../actions/pageLoader';
import {
  saveUserBodyMeasurementRequest,
  saveUserBodyFatRequest,
} from '../../actions/userBodyMeasurement';
import moment from 'moment';
import { ts, te, isOnline, tw } from '../../helpers/funs';
import {
  addUserProgressPhotoRequest,
  removeSelectedProgressPhotosToUpload,
} from '../../actions/userProgressPhotos';
import AddProgressPhotoModal from '../Common/AddProgressPhotoModal';
import BodyFatModal from './BodyFatModal';
import {
  LOCALSTORAGE_USER_DETAILS_KEY,
  FITASSIST_USER_DETAILS_TOKEN_KEY,
  GENDER_MALE,
} from '../../constants/consts';
import jwt from 'jwt-simple';
import { getUserBodypartsRequest } from '../../actions/userBodyparts';

class BodyMeasurement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saveActionInit: false,
      refreshBodyMeasurementForm: false,
      showAddProgressPhotoModal: false,
      saveProgressPhotoActionInit: false,
      showBodyFatModal: false,
      saveBodyFatInit: false,
      logDate: null,
    };
  }

  componentWillMount() {
    const { dispatch } = this.props;
    let { logDate } = this.state;
    if (this.props.location.search) {
      let search = new URLSearchParams(
        decodeURIComponent(this.props.location.search),
      );
      let date = search.get('date');
      logDate = new Date(date);
      this.setState({ logDate });
    }
    dispatch(getUserBodypartsRequest());
  }

  render() {
    const {
      showAddProgressPhotoModal,
      showBodyFatModal,
      saveProgressPhotoActionInit,
      refreshBodyMeasurementForm,
    } = this.state;
    return (
      <div className="body-measurement-list-section-wrapper">
        <div className="body-head d-flex justify-content-start front-white-header">
          <div className="body-head-l">
            <h2>Your Body</h2>
            <p>
              Your goal choice shapes how your fitness assistant will ceate your
              meal and exercise plans, it’s important that you set goals which
              are achieveable. Keep updating your profile and your fitness
              assistant will keep you on track and meeting the goals you’ve set
              out for yourself.
            </p>
          </div>
        </div>
        <div className="body-content d-flex">
          <BodyMeasurementForm
            date={this.state.logDate}
            refreshBodyMeasurementForm={refreshBodyMeasurementForm}
            onSubmit={this.handleSubmit}
            resetRefreshBodyMeasurementForm={
              this.resetRefreshBodyMeasurementForm
            }
            handleShowBodyFatModal={this.handleShowBodyFatModal}
            handleShowAddProgressPhotoModal={
              this.handleShowAddProgressPhotoModal
            }
          />

          <AddProgressPhotoModal
            onSubmit={this.handleProgressPhotoSubmit}
            show={showAddProgressPhotoModal}
            handleOpen={this.handleShowAddProgressPhotoModal}
            handleClose={this.handleCloseAddProgressPhotoModal}
            isLoading={saveProgressPhotoActionInit}
          />

          <BodyFatModal
            show={showBodyFatModal}
            handleClose={this.handleCloseBodyFatModal}
            onSubmit={this.handleBodyFatSubmit}
          />
        </div>
      </div>
    );
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      saveActionInit,
      saveProgressPhotoActionInit,
      saveBodyFatInit,
    } = this.state;
    const {
      loading,
      dispatch,
      progressPhotoloading,
      error,
      progressPhotoError,
    } = this.props;
    if (saveActionInit && !loading) {
      let newState = { saveActionInit: false };
      if (error && error.length <= 0) {
        newState.refreshBodyMeasurementForm = true;
        ts('Body measurement saved successfully!');
      }
      this.setState(newState);
      dispatch(hidePageLoader());
    }
    if (saveBodyFatInit && !loading) {
      let newState = { saveBodyFatInit: false };
      if (error && error.length <= 0) {
        newState.refreshBodyMeasurementForm = true;
        ts('Body fat saved successfully!');
      }
      this.setState(newState);
      this.handleCloseBodyFatModal();
      dispatch(hidePageLoader());
    }
    if (saveProgressPhotoActionInit && !progressPhotoloading) {
      let newState = { saveProgressPhotoActionInit: false };
      if (progressPhotoError && progressPhotoError.length <= 0) {
        newState.refreshBodyMeasurementForm = true;
        ts('Progress photo saved successfully!');
      } else {
        te(
          'Something went wrong while adding progress photo! Please try again.',
        );
      }
      this.handleCloseAddProgressPhotoModal();
      dispatch(hidePageLoader());
      this.setState(newState);
    }
  }

  handleSubmit = data => {
    if (isOnline()) {
      const { dispatch } = this.props;
      this.setState({ saveActionInit: true });
      let measurementData = {
        logDate: moment(data.log_date)
          .startOf()
          .utc(),
        neck: data.neck,
        shoulders: data.shoulders,
        chest: data.chest,
        upperArm: data.upper_arm,
        waist: data.waist,
        forearm: data.forearm,
        hips: data.hips,
        thigh: data.thigh,
        calf: data.calf,
        heartRate: data.heartRate,
        weight: data.weight,
        height: data.height,
        bodyFatPer: data.bodyfat,
      };
      dispatch(showPageLoader());
      dispatch(saveUserBodyMeasurementRequest(measurementData));
    } else {
      tw('You are offline, please check your internet connection');
    }
  };

  resetRefreshBodyMeasurementForm = () => {
    this.setState({ refreshBodyMeasurementForm: false });
  };

  handleShowAddProgressPhotoModal = () => {
    if (isOnline()) {
      this.setState({ showAddProgressPhotoModal: true });
    } else {
      tw('You are offline, please check your internet connection');
    }
  };

  handleCloseAddProgressPhotoModal = (resetFormData = true) => {
    const { dispatch } = this.props;
    this.setState({ showAddProgressPhotoModal: false });
    if (resetFormData) {
      dispatch(reset('add_progress_photo_modal_form'));
      dispatch(removeSelectedProgressPhotosToUpload());
    }
  };

  handleProgressPhotoSubmit = data => {
    if (isOnline()) {
      const { dispatch, body_fat_log_date, selectedPhotos } = this.props;
      if (selectedPhotos && selectedPhotos.length > 0) {
        let requestData = {
          description: data.description ? data.description : '',
          date: body_fat_log_date,
          progressPhotosData: selectedPhotos,
        };
        this.setState({ saveProgressPhotoActionInit: true });
        dispatch(showPageLoader());
        dispatch(addUserProgressPhotoRequest(requestData));
      }
    } else {
      tw('You are offline, please check your internet connection');
    }
  };

  handleShowBodyFatModal = () => {
    const { dispatch, site1, site2, site3, bodyfat, age } = this.props;
    this.setState({ showBodyFatModal: true });
    let encUserDetails = localStorage.getItem(LOCALSTORAGE_USER_DETAILS_KEY);
    let userDetails = jwt.decode(
      encUserDetails,
      FITASSIST_USER_DETAILS_TOKEN_KEY,
    );
    let dob = userDetails.dateOfBirth ? userDetails.dateOfBirth : null;
    let gender = userDetails.gender ? userDetails.gender : GENDER_MALE;
    let diff = moment().diff(dob, 'years');
    let formData = {
      site1: site1 ? site1 : '',
      site2: site2 ? site2 : '',
      site3: site3 ? site3 : '',
      bodyFat: bodyfat ? bodyfat : '',
    };
    if (diff) {
      formData.age = diff;
      formData.hidden_age = diff;
      formData.gender = gender;
    } else {
      formData.age = age;
      formData.gender = gender;
    }
    dispatch(initialize('saveBodyFatForm', formData));
  };

  handleCloseBodyFatModal = () => {
    const { dispatch } = this.props;
    this.setState({ showBodyFatModal: false });
    dispatch(reset('saveBodyFatForm'));
  };

  handleBodyFatSubmit = data => {
    if (isOnline()) {
      const { dispatch } = this.props;
      this.setState({ saveBodyFatInit: true });
      let requestData = {
        logDate: moment(data.log_date)
          .startOf('day')
          .utc(),
        site1: data.site1,
        site2: data.site2,
        site3: data.site3,
        bodyFatPer: data.bodyFat,
        age: data.age,
      };
      dispatch(showPageLoader());
      dispatch(saveUserBodyFatRequest(requestData));
    } else {
      tw('You are offline, please check your internet connection');
    }
  };
}

const selector1 = formValueSelector('userBodyMeasurement');

const mapStateToProps = state => {
  const { userBodyMeasurement, userProgressPhotos } = state;
  return {
    loading: userBodyMeasurement.get('loading'),
    error: userBodyMeasurement.get('error'),
    bodyFat: userBodyMeasurement.get('bodyFat'),
    progressPhotoloading: userProgressPhotos.get('loading'),
    progressPhotoError: userProgressPhotos.get('error'),
    body_fat_log_date: selector1(state, 'log_date'),
    site1: selector1(state, 'site1'),
    site2: selector1(state, 'site2'),
    site3: selector1(state, 'site3'),
    bodyfat: selector1(state, 'bodyfat'),
    age: selector1(state, 'age'),
    selectedPhotos: userProgressPhotos.get('selectedProgressPhotos'),
  };
};

export default connect(mapStateToProps)(BodyMeasurement);
