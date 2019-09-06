import React, { Component } from 'react';
import CalendarDayOverViewWorkoutsList from './CalendarDayOverViewWorkoutsList';
import { completeUsersBulkWorkoutScheduleRequest } from '../../../actions/userScheduleWorkouts';
import { connect } from 'react-redux';
import { isOnline } from '../../../helpers/funs';
import { hidePageLoader, showPageLoader } from '../../../actions/pageLoader';

class CalendarDayOverViewWorkouts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cuurentTab: '#warmup0',
      completeWorkout: false,
      completeWorkoutActionInit: false,
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
    return (
      <React.Fragment>
        {title !== 'Rest Day' ? (
          <div className="body-content workouts-bg">
            <div className="row justify-content-start no-gutters">
              <div className="col-xs-12 col-md-9 d-flex">
                <div
                  className="white-box border-right"
                  style={{ marginBottom: '2rem', width: '100%' }}
                >
                  <div className="whitebox-head d-flex profile-head">
                    <h3>{title}</h3>
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
                  </div>

                  <div className="navbar-running">
                    <div className="tabs mr-auto sub-tab">
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
                    {/* <div class="tabs ml-auto">
              <div class="tab" id="Logs">
                <a href="#Logs">Logs</a>
              </div>
              <div class="tab" id="Photos">
                <a href="#Photos">Photos</a>
              </div>
            </div> */}
                  </div>
                  <div className={'tab-content'}>
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
            </div>
          </div>
        ) : (
          <div className="white-box" style={{ marginBottom: '2rem' }}>
            <div className="whitebox-head d-flex profile-head">
              <h3>{title}</h3>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return state;
};
export default connect(mapStateToProps)(CalendarDayOverViewWorkouts);
