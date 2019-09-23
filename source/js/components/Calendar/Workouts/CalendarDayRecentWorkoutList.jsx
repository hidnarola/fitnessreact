import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Scrollbars } from 'react-custom-scrollbars';
import Star from '../../../../assets/svg/star.svg';

class CalendarDayRecentWorkoutList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quickTab: '#recentmeals',
    };
  }
  render() {
    const { isActiveQuickTab } = this.props;
    const { quickTab } = this.state;
    return (
      <React.Fragment>
        <div
          className={
            isActiveQuickTab
              ? 'blue_right_sidebar animated slideInLeft h-100'
              : 'blue_right_sidebar h-100'
          }
        >
          <div className="d-flex width-100-per sidebar-header">
            <h2 className="h2_head_one pt-3 pb-3">Add Excercise</h2>

            <button className="btn btn-plus-right ml-auto">
              <FontAwesomeIcon icon="plus" />
            </button>
          </div>
          {/* <div className={isActiveQuickTab ? 'tabs' : 'tabs tabs-active'}>
            <div
              className={
                this.state.quickTab === '#recentmeals' ? 'tab active' : 'tab'
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
                this.state.quickTab === '#favrioutmeals' ? 'tab active' : 'tab'
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
          </div> */}
          <div className="quick-tabs">
            <div
              className={quickTab === '#recentmeals' ? 'tab active' : 'tab'}
              onClick={() => {
                this.setState({ quickTab: '#recentmeals' });
              }}
            >
              <a href="#">Recent</a>
            </div>
            <div
              className={quickTab === '#favrioutmeals' ? 'tab active' : 'tab'}
              onClick={() => {
                this.setState({ quickTab: '#favrioutmeals' });
              }}
            >
              <a href="#">Favourite</a>
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
                      {/* <div className="add_drag">
                        <FontAwesomeIcon icon="plus-circle" />
                      </div> */}
                    </li>
                    <li>
                      <h3>Upright Row</h3>
                      {/* <div className="add_drag">
                        <FontAwesomeIcon icon="plus-circle" />
                      </div> */}
                    </li>
                    <li>
                      <span className={'star_one active'}>
                        <Star />
                      </span>
                      <h3>Pull up</h3>
                      {/* <div className="add_drag">
                        <FontAwesomeIcon icon="plus-circle" />
                      </div> */}
                    </li>
                  </ul>
                )}
                {this.state.quickTab === '#favrioutmeals' && (
                  <ul>
                    <li>
                      <h3>Bench Press</h3>
                      {/* <div className="add_drag">
                        <FontAwesomeIcon icon="plus-circle" />
                      </div> */}
                    </li>
                    <li>
                      <h3>Pull up</h3>
                      {/* <div className="add_drag">
                        <FontAwesomeIcon icon="plus-circle" />
                      </div> */}
                    </li>
                  </ul>
                )}
              </Scrollbars>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default CalendarDayRecentWorkoutList;
