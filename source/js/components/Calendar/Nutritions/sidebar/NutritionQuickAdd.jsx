import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Star from '../../../../../assets/svg/star.svg';
import Collapse from 'react-bootstrap/lib/Collapse';

class NutritionQuickAdd extends Component {
  state = {
    favOpen: true,
    recentOpen: false,
  };
  render() {
    const {
      quickTab,
      recentMeals,
      addTodayMeals,
      handleChangeQuickTab,
    } = this.props;
    const { favOpen, recentOpen } = this.state;
    return (
      <React.Fragment>
        <div className="blue_right_sidebar h-100">
          <div className="d-flex width-100-per sidebar-header">
            <h2 className="h2_head_one pt-3 pb-3">Add Food</h2>
            <button
              className="btn btn-plus-right bg-white ml-auto"
              onClick={() => console.log('')}
            >
              <FontAwesomeIcon icon="plus" />
            </button>
          </div>
          <div className="quick-tabs">
            <div
              className={quickTab === '#recentmeals' ? 'tab active' : 'tab'}
              id="recentmeals"
            >
              <a
                href="#recentMeals"
                onClick={() => handleChangeQuickTab('#recentmeals')}
              >
                Food
              </a>
            </div>
            <div
              className={quickTab === '#favrioutmeals' ? 'tab active' : 'tab'}
              id="favrioutmeals"
            >
              <a
                href="#favrioutmeals"
                onClick={() => handleChangeQuickTab('#favrioutmeals')}
              >
                Meals
              </a>
            </div>
          </div>
          <div className={'tab-content'}>
            <div className="recent-ingredient">
              <Scrollbars autoHide>
                {quickTab === '#recentmeals' && <ul></ul>}
                {quickTab === '#favrioutmeals' && (
                  <ul>
                    <li
                      className="display-dropdown align-items-center"
                      onClick={() => this.setState({ favOpen: !favOpen })}
                      aria-controls="favourites-collapse"
                      aria-expanded={favOpen}
                    >
                      <h3>Favourites</h3>
                      <div className="add_drag">
                        <FontAwesomeIcon icon="sort-down" />
                      </div>
                    </li>
                    <Collapse in={favOpen}>
                      <div id="favourites-collapse">
                        <li>
                          <span className={'star_one active'}>
                            <Star />
                          </span>
                          <h3>Apple</h3>
                          <div className="add_drag">
                            <FontAwesomeIcon icon="plus-circle" />
                          </div>
                        </li>
                        <li>
                          <span className={'star_one active'}>
                            <Star />
                          </span>
                          <h3>Banana</h3>
                          <div className="add_drag">
                            <FontAwesomeIcon icon="plus-circle" />
                          </div>
                        </li>
                      </div>
                    </Collapse>
                    <li
                      className="display-dropdown"
                      onClick={() => this.setState({ recentOpen: !recentOpen })}
                      aria-controls="recent-collapse"
                      aria-expanded={recentOpen}
                    >
                      <h3>Recent</h3>
                      <div className="add_drag">
                        <FontAwesomeIcon icon="sort-down" />
                      </div>
                    </li>
                    <Collapse in={recentOpen}>
                      <div id="recent-collapse">
                        {recentMeals &&
                          recentMeals.length > 0 &&
                          recentMeals.map((v, id) => (
                            <li key={id} onClick={e => addTodayMeals(v)}>
                              <span className={'star_one active'}>
                                <Star />
                              </span>
                              <h3>{v.title}</h3>
                              {/* <div className="add_drag">
                                <FontAwesomeIcon icon="plus-circle" />
                              </div> */}
                            </li>
                          ))}
                      </div>
                    </Collapse>
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

export default NutritionQuickAdd;
