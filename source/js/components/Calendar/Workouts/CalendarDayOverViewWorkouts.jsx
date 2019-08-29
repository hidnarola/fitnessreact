import React, { Component } from 'react';
import CalendarDayOverViewWorkoutsList from './CalendarDayOverViewWorkoutsList';

class CalendarDayOverViewWorkouts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cuurentTab: '#warmup0',
    };
  }
  componentDidMount() {
    const { index } = this.props;
    this.setState({ cuurentTab: `#warmup${index}` });
  }
  render() {
    const { index } = this.props;
    const { title, warmup, exercise, cooldown } = this.props.workout;
    return (
      <React.Fragment>
        {title !== 'Rest Day' ? (
          <div className="white-box" style={{ marginBottom: '2rem' }}>
            <div className="whitebox-head d-flex profile-head">
              <h3>{title}</h3>
              <div className="switch-wrap ml-auto">
                <small>Workout complete</small>
                <div className="material-switch">
                  <input
                    id={'workout' + index}
                    type="checkbox"
                    checked={false}
                    onChange={() => {
                      console.log('');
                    }}
                    disabled={false}
                  />
                  <label
                    htmlFor={'workout' + index}
                    className="label-default"
                  ></label>
                </div>
              </div>
            </div>

            <div className="navbar-running">
              <div className="tabs mr-auto">
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
                      this.setState({ cuurentTab: `#warmup${index}` });
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
                      this.setState({ cuurentTab: `#workout${index}` });
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
                      this.setState({ cuurentTab: `#cooldown${index}` });
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
                      this.setState({ cuurentTab: `#fitnesstest${index}` });
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

export default CalendarDayOverViewWorkouts;
