import React, { Component } from 'react';
import CalendarDayOverViewWorkoutsList from './CalendarDayOverViewWorkoutsList';
import { completeUsersBulkWorkoutScheduleRequest } from '../../../actions/userScheduleWorkouts';
import { connect } from 'react-redux';
import { isOnline } from '../../../helpers/funs';
import { hidePageLoader, showPageLoader } from '../../../actions/pageLoader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Star from '../../../../assets/svg/star.svg';
import { Link } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';

class CalendarDayOverViewWorkouts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cuurentTab: '#warmup0',
      completeWorkout: false,
      completeWorkoutActionInit: false,
      quickTab: '#recentmeals',
    };
  }
  componentDidMount() {
    const { index, workout } = this.props;
    const complete = workout.isCompleted === 0 ? false : true;
    this.setState({ cuurentTab: `#warmup${index}`, completeWorkout: complete });
  }
  componentDidUpdate(prevProps, prevState) {
    const { completeWorkoutActionInit } = this.state;
    const { dispatch, workout, loading } = this.props;

    if (
      !loading &&
      prevProps.workout !== workout &&
      typeof workout.isCompleted !== 'undefined'
    ) {
      const complete = workout.isCompleted === 0 ? false : true;
      this.setState({ completeWorkout: complete });
      dispatch(hidePageLoader());
    }

    if (prevState.completeWorkoutActionInit !== completeWorkoutActionInit) {
      dispatch(hidePageLoader());
    }
  }

  handleCompleteWorkout = workout => {
    if (isOnline()) {
      const { dispatch, loading, workout } = this.props;
      if (workout && workout._id && !loading) {
        var isCompleted =
          typeof workout.isCompleted !== 'undefined'
            ? workout.isCompleted === 0
              ? 1
              : 0
            : 1;
        var requestData = {
          exerciseIds: [workout._id],
          isCompleted: isCompleted,
        };
        this.setState({
          completeWorkoutActionInit: true,
          completeWorkout: !this.state.completeWorkout,
        });

        dispatch(
          completeUsersBulkWorkoutScheduleRequest(requestData, res => {
            const { dispatch } = this.props;
            dispatch(hidePageLoader());
          }),
        );
      }
    } else {
      tw('You are offline, please check your internet connection');
    }
  };
  render() {
    const { completeWorkout } = this.state;
    const { index } = this.props;
    const {
      title,
      warmup,
      exercise,
      cooldown,
      _id,
      isCompleted,
    } = this.props.workout;
    console.log('THIS.PROPS ===>', this.props.workout);
    return (
      <React.Fragment>
        <div className="body-content workouts-bg">
          <div className="row justify-content-start no-gutters">
            <div className="col-xs-12 col-md-9">
              <div className="white-box border-right width-100-per p-0">
                <div className="exercise-header">
                  <ul className="tabs">
                    <li className="tab active">
                      <a href="#">Running 1</a>
                    </li>
                    <li className="tab">
                      <a href="#">Chest 3</a>
                      <span className="star-icon">
                        <Star />
                      </span>
                    </li>
                    <li className="tab">
                      <a href="#">
                        <FontAwesomeIcon icon="plus" />
                      </a>
                    </li>
                  </ul>
                  <div className="switch-wrap ml-auto">
                    <small>Workout complete</small>
                    <div className="material-switch">
                      <input
                        id={'workout' + index}
                        type="checkbox"
                        checked={completeWorkout}
                        onChange={() =>
                          this.handleCompleteWorkout(this.props.workout)
                        }
                      />
                      <label
                        htmlFor={'workout' + index}
                        className="label-default"
                      ></label>
                    </div>
                  </div>
                  <div className="star-icon">
                    <Star style={{ width: '25px' }} />
                  </div>
                </div>

                <div className="exercise-navbar">
                  <div className="tabs sub-tab">
                    <div
                      className={
                        this.state.cuurentTab === `#warmup${index}`
                          ? 'tab active'
                          : 'tab '
                      }
                      id={'warmup' + index}
                    >
                      <a
                        onClick={e => {
                          this.setState({
                            cuurentTab: `#warmup${index}`,
                          });
                        }}
                        href={'#warmup' + index}
                      >
                        Warmup
                      </a>
                    </div>
                    <div
                      className={
                        this.state.cuurentTab === `#workout${index}`
                          ? 'tab active'
                          : 'tab'
                      }
                      id={'workout' + index}
                    >
                      <a
                        onClick={e => {
                          this.setState({
                            cuurentTab: `#workout${index}`,
                          });
                        }}
                        href={'#workout' + index}
                      >
                        Workout
                      </a>
                    </div>
                    <div
                      className={
                        this.state.cuurentTab === `#cooldown${index}`
                          ? 'tab active'
                          : 'tab'
                      }
                      id={'cooldown' + index}
                    >
                      <a
                        onClick={e => {
                          this.setState({
                            cuurentTab: `#cooldown${index}`,
                          });
                        }}
                        href={'#cooldown' + index}
                      >
                        Cooldown
                      </a>
                    </div>
                    <div
                      className={
                        this.state.cuurentTab === `#fitnesstest${index}`
                          ? 'tab  active'
                          : 'tab'
                      }
                      id={'fitnesstest' + index}
                    >
                      <a
                        onClick={e => {
                          this.setState({
                            cuurentTab: `#fitnesstest${index}`,
                          });
                        }}
                        href={'#fitnesstest' + index}
                      >
                        Fitness Tests
                      </a>
                    </div>
                  </div>
                  <div className="list-notes ml-auto">
                    <ul>
                      <li>
                        <a href="#">Notes</a>
                      </li>
                      <li>
                        <a href="#">Stats</a>
                      </li>
                    </ul>
                  </div>
                  <Link to="#" className="btn btn-success plus-btn">
                    <FontAwesomeIcon icon="plus" />
                  </Link>
                </div>

                <div className={'exercise-tabs tab-content'}>
                  {this.state.cuurentTab === `#warmup${index}` && (
                    <div
                      className={
                        this.state.cuurentTab === `#warmup${index}`
                          ? 'content active'
                          : 'content'
                      }
                      id={'warmup' + index}
                    >
                      {warmup.length > 0 ? (
                        warmup &&
                        warmup.map((warmup, index) => (
                          <CalendarDayOverViewWorkoutsList
                            workout={warmup}
                            key={index}
                            index={index}
                          />
                        ))
                      ) : (
                        <h3>No records found</h3>
                      )}
                    </div>
                  )}
                  {this.state.cuurentTab === `#workout${index}` && (
                    <div
                      className={
                        this.state.cuurentTab === `#workout${index}`
                          ? 'content active'
                          : 'content'
                      }
                      id={'workout' + index}
                    >
                      {exercise.length > 0 ? (
                        exercise &&
                        exercise.map((exercise, index) => (
                          <CalendarDayOverViewWorkoutsList
                            workout={exercise}
                            key={index}
                            index={index}
                          />
                        ))
                      ) : (
                        <h3>No records found</h3>
                      )}
                    </div>
                  )}
                  {this.state.cuurentTab === `#cooldown${index}` && (
                    <div
                      className={
                        this.state.cuurentTab === `#cooldown${index}`
                          ? 'content active'
                          : 'content'
                      }
                      id={'cooldown' + index}
                    >
                      {cooldown.length > 0 ? (
                        cooldown &&
                        cooldown.map((cooldown, index) => (
                          <CalendarDayOverViewWorkoutsList
                            workout={cooldown}
                            key={index}
                            index={index}
                          />
                        ))
                      ) : (
                        <h3>No records found</h3>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="col-xs-12 col-md-3 d-flex">
              <div className="blue_right_sidebar">
                <h2 className="h2_head_one">Quick Add</h2>
                <div className="tabs">
                  <div
                    className={
                      this.state.quickTab === '#recentmeals'
                        ? 'tab active'
                        : 'tab'
                    }
                    id="recentmeals"
                  >
                    <a
                      href="#recentMeals"
                      onClick={() => {
                        this.setState({ quickTab: '#recentmeals' });
                      }}
                    >
                      Recent
                    </a>
                  </div>
                  <div
                    className={
                      this.state.quickTab === '#favrioutmeals'
                        ? 'tab active'
                        : 'tab'
                    }
                    id="favrioutmeals"
                  >
                    <a
                      href="#favrioutmeals"
                      onClick={() => {
                        this.setState({ quickTab: '#favrioutmeals' });
                      }}
                    >
                      Favourite
                    </a>
                  </div>
                </div>
                <div className={'tab-content'}>
                  <div className="recent-ingredient">
                    <Scrollbars autoHide>
                      {this.state.quickTab === '#recentmeals' && (
                        <ul>
                          <li>
                            <span className={'star_one active'}>
                              <Star />
                            </span>
                            <h3>Bench Press</h3>
                            <div className="add_drag">
                              <FontAwesomeIcon icon="plus-circle" />
                            </div>
                          </li>
                          <li>
                            <h3>Upright Row</h3>
                            <div className="add_drag">
                              <FontAwesomeIcon icon="plus-circle" />
                            </div>
                          </li>
                          <li>
                            <span className={'star_one active'}>
                              <Star />
                            </span>
                            <h3>Pull up</h3>
                            <div className="add_drag">
                              <FontAwesomeIcon icon="plus-circle" />
                            </div>
                          </li>
                        </ul>
                      )}
                      {this.state.quickTab === '#favrioutmeals' && (
                        <ul>
                          <li>
                            <h3>Bench Press</h3>
                            <div className="add_drag">
                              <FontAwesomeIcon icon="plus-circle" />
                            </div>
                          </li>
                          <li>
                            <h3>Pull up</h3>
                            <div className="add_drag">
                              <FontAwesomeIcon icon="plus-circle" />
                            </div>
                          </li>
                        </ul>
                      )}
                    </Scrollbars>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return state;
};
export default connect(mapStateToProps)(CalendarDayOverViewWorkouts);
