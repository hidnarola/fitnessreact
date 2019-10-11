import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Star from '../../../../../assets/svg/star.svg';
import Collapse from 'react-bootstrap/lib/Collapse';
import { routeCodes } from '../../../../constants/routes';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import cns from 'classnames';
import { mealSearchRequest } from '../../../../actions/meal';
import { connect } from 'react-redux';

const colourOptions = [
  { value: 'favourites', label: 'Favourites' },
  { value: 'recent', label: 'Recent' },
];
class NutritionQuickAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favOpen: false,
      recentOpen: false,
      favouritesMale: '',
      isOpenSearch: false,
      selectedMeal: 'All',
      searchMealList: [],
    };
    this.searchDebounce = _.debounce(this.searchMeals, 1000);
  }
  render() {
    const {
      quickTab,
      recentMeals,
      addTodayMeals,
      handleChangeQuickTab,
      addToFavourite,
      searchMeals,
      logDate,
    } = this.props;
    const {
      favOpen,
      recentOpen,
      isOpenSearch,
      selectedMeal,
      searchMealList,
    } = this.state;
    const encode = logDate;
    console.log('===========logDate===========');
    console.log(encode);
    console.log('==========================');
    return (
      <React.Fragment>
        <div className="blue_right_sidebar h-100">
          <div className="d-flex width-100-per sidebar-header">
            <h2 className="h2_head_one pt-3 pb-3">Add Food</h2>
            <Link
              to={routeCodes.NUTRITION_ADD}
              className="btn btn-plus-right bg-white ml-auto"
            >
              <FontAwesomeIcon icon="plus" />
            </Link>
          </div>
          <div className="quick-tabs">
            <div className={quickTab === '#recentmeals' ? 'tab active' : 'tab'}>
              <a
                href="#recentMeals"
                onClick={() => handleChangeQuickTab('#recentmeals')}
              >
                Food
              </a>
            </div>
            <div
              className={quickTab === '#favrioutmeals' ? 'tab active' : 'tab'}
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
                    {/* <li
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
                    </Collapse> */}
                    {/* <li
                      className="display-dropdown"
                      onClick={() =>
                        this.setState({ recentOpen: !this.state.recentOpen })
                      }
                      aria-controls="recent-collapse"
                      aria-expanded={recentOpen}
                    >
                      <h3>Recent</h3>
                      <div className="add_drag">
                        <FontAwesomeIcon icon="sort-down" />
                      </div>
                    </li> */}
                    {/* <Collapse in={recentOpen}>
                      <div id="recent-collapse">
                        {recentMeals &&
                          recentMeals.length > 0 &&
                          recentMeals.map((v, id) => (
                            <li key={id} onClick={e => addTodayMeals(v)}>
                              <span className={'star_one active'}>
                                <Star />
                              </span>
                              <h3>{v.title}</h3>
                            </li>
                          ))}
                      </div>
                    </Collapse> */}
                    <li className="p-0">
                      <div className="custom-select width-100-per">
                        {/* <select>
                          <option value="0" style={{ color: '#fff' }}>
                            For Demo:
                          </option>
                          <option value="1">Apple</option>
                          <option value="2">Banana</option>
                          <option value="3">Orange</option>
                          <option value="4">Egg</option>
                          <option value="5">Onions</option>
                          <option value="6">Pizza</option>
                        </select> */}
                        {/* <Select
                          className="quick-sidebar-dropdown"
                          escapeClearsValue={false}
                          options={colourOptions}
                          onChange={this.handleChangeSelect}
                          placeholder="Favourites"
                          value={this.state.favouritesMale}
                        /> */}
                        <div className="display-select-menu">
                          <DropdownButton
                            title={selectedMeal}
                            key={1}
                            id={`dropdown-basic-${1}`}
                          >
                            <MenuItem
                              eventKey="1"
                              onClick={() => this.handleChangeMealType('All')}
                            >
                              All
                            </MenuItem>
                            <MenuItem
                              eventKey="2"
                              onClick={() =>
                                this.handleChangeMealType('Favourites')
                              }
                            >
                              Favourites
                            </MenuItem>
                            <MenuItem
                              eventKey="3"
                              onClick={() =>
                                this.handleChangeMealType('Recent')
                              }
                            >
                              Recent
                            </MenuItem>
                          </DropdownButton>
                        </div>
                        <div
                          className={
                            isOpenSearch ? 'search-box open' : 'search-box'
                          }
                        >
                          <div
                            className="search-icon"
                            onClick={() =>
                              this.setState({ isOpenSearch: !isOpenSearch })
                            }
                          >
                            <FontAwesomeIcon icon="search" />
                          </div>
                          <div className="search-input">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Search Ingredients"
                              onChange={e =>
                                this.handleChangeSearch(e.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </li>
                    {selectedMeal === 'Favourites' &&
                      recentMeals &&
                      recentMeals.length > 0 &&
                      recentMeals.map((v, id) => (
                        <li key={id} onClick={e => addTodayMeals(v)}>
                          <span
                            className={cns('star_one', {
                              star_pink: _.some(recentMeals, { _id: v._id }),
                              active: _.some(recentMeals, { _id: v._id }),
                            })}
                            onClick={e =>
                              addToFavourite(
                                v._id,
                                _.some(recentMeals, { _id: v._id }),
                              )
                            }
                          >
                            <Star />
                          </span>
                          <h3>{v.title}</h3>
                        </li>
                      ))}
                    {selectedMeal === 'Recent' && (
                      <li>
                        <span className={'star_one active'}>
                          <Star />
                        </span>
                        <h3>Apple</h3>
                      </li>
                    )}
                    {selectedMeal === 'All' &&
                      searchMealList.map((item, index) => (
                        <li key={index} className="animated slideInDown faster">
                          {/* <span className={'star_one'}>
                            <Star />
                          </span> */}
                          <h3>{item.title}</h3>
                        </li>
                      ))}
                  </ul>
                )}
              </Scrollbars>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
  componentDidUpdate(prevProps, prevState) {
    const { searchMeals, searchLoading } = this.props;
    const { searchMealList } = this.state;
    if (!searchLoading && prevProps.searchMeals !== searchMeals) {
      this.setState({ searchMealList: searchMeals });
    }
  }

  handleChangeSelect = val => {
    this.setState({ favouritesMale: val.value });
  };
  handleChangeMealType = action => {
    this.setState({ selectedMeal: action });
  };
  handleChangeSearch = value => {
    this.searchDebounce.cancel;
    if (value && value.trim() && value.trim() !== '') {
      this.searchDebounce(value.trim());
    }
  };
  searchMeals = value => {
    const { dispatch } = this.props;
    var requestData = {
      name: value,
      start: 0,
      offset: 50,
    };
    this.setState({ searchIsLoading: true });
    // dispatch(getUserNutritionPreferencesRequest(requestData));
    dispatch(mealSearchRequest(requestData));
  };
}

const mapStateToProps = state => {
  const { meal } = state;
  return {
    searchMeals: meal.get('searchMeals'),
    searchLoading: meal.get('searchLoading'),
  };
};

export default connect(mapStateToProps)(NutritionQuickAdd);
