import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Star from '../../../../assets/svg/star.svg';
import Collapse from 'react-bootstrap/lib/Collapse';
import { routeCodes } from '../../../constants/routes';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import cns from 'classnames';

const colourOptions = [
  { value: 'favourites', label: 'Favourites' },
  { value: 'recent', label: 'Recent' },
];
class NutritionMealCreateQuickAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favOpen: false,
      recentOpen: false,
      favouritesMale: '',
      isOpenSearch: false,
      selectedMeal: 'Favourites',
    };
  }

  render() {
    const {
      quickTab,
      recentMeals,
      addTodayMeals,
      handleChangeQuickTab,
      addToFavourite,
    } = this.props;
    const { favOpen, recentOpen, isOpenSearch, selectedMeal } = this.state;

    return (
      <React.Fragment>
        <div className="blue_right_sidebar h-100">
          <div className="d-flex width-100-per sidebar-header">
            <h2 className="h2_head_one pt-3 pb-3">Add Food</h2>
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
                    <li className="input-box-group">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Search Ingredient"
                      />
                      <span className="search-icon">
                        <FontAwesomeIcon icon="search" />
                      </span>
                    </li>
                    <li>
                      <span className={'star_one active'}>
                        <Star />
                      </span>
                      <h3>Apple</h3>
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
  handleChangeSelect = val => {
    this.setState({ favouritesMale: val.value });
  };
  handleChangeMealType = action => {
    this.setState({ selectedMeal: action });
  };
}

export default NutritionMealCreateQuickAdd;
