import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Star from '../../../../assets/svg/star.svg';
import Collapse from 'react-bootstrap/lib/Collapse';
import { routeCodes } from '../../../constants/routes';
import { Link } from 'react-router-dom';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import cns from 'classnames';

class NutritionMealCreateQuickAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      selectedMealMode,
      handleChangeMealMode,
      recent_ingredient,
    } = this.props;
    const {
      handleSuggestionsFetchRequested,
      handleAddIngredient,
      searchSuggestions,
      searchIsLoading,
    } = this.props;
    return (
      <React.Fragment>
        <div className="blue_right_sidebar h-100">
          <div className="d-flex width-100-per sidebar-header">
            <h2 className="h2_head_one pt-3 pb-3">Add Food</h2>
          </div>
          <div className={'tab-content'}>
            <div className="recent-ingredient">
              <ul>
                <li className="p-0">
                  <div className="custom-select width-100-per">
                    <div className="display-select-menu width-100-per">
                      <DropdownButton
                        title={selectedMealMode}
                        key={1}
                        id={'dropdown-basic-1'}
                        style={{ background: '#267D79' }}
                      >
                        <MenuItem
                          eventKey="1"
                          onClick={() => handleChangeMealMode('All')}
                        >
                          All
                        </MenuItem>
                        <MenuItem
                          eventKey="2"
                          onClick={() => handleChangeMealMode('Favourites')}
                        >
                          Favourites
                        </MenuItem>
                        <MenuItem
                          eventKey="3"
                          onClick={() => handleChangeMealMode('Recent')}
                        >
                          Recent
                        </MenuItem>
                      </DropdownButton>
                    </div>
                  </div>
                </li>
                <li className="input-box-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Search Ingredient"
                    name="serachIngredient"
                    onChange={e =>
                      handleSuggestionsFetchRequested(e.target.value)
                    }
                    onKeyPress={e => {
                      e.key === 'Enter' && e.preventDefault();
                    }}
                  />
                  {searchIsLoading ? (
                    <span className="spinner">
                      <i className="fa fa-spinner fa-spin"></i>
                    </span>
                  ) : (
                    <span className="search-icon">
                      <i className="fad fa-search"></i>
                    </span>
                  )}
                </li>
              </ul>
              <Scrollbars autoHide>
                <ul>
                  {selectedMealMode === 'All' &&
                    searchSuggestions.map((ingredient, index) => (
                      <li
                        key={index}
                        onClick={() => handleAddIngredient(ingredient)}
                        className="animated slideInDown faster"
                      >
                        <h3>{ingredient.foodName}</h3>
                        <div className="input-group-prepend ml-auto">
                          <FontAwesomeIcon icon="plus-circle" />
                        </div>
                      </li>
                    ))}
                  {selectedMealMode === 'Recent' &&
                    recent_ingredient.map((ingredient, index) => (
                      <li
                        key={index}
                        onClick={() => handleAddIngredient(ingredient)}
                        className="animated slideInDown faster"
                      >
                        <h3>{ingredient.foodName}</h3>
                        <div className="input-group-prepend ml-auto">
                          <FontAwesomeIcon icon="plus-circle" />
                        </div>
                      </li>
                    ))}
                </ul>
              </Scrollbars>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default NutritionMealCreateQuickAdd;
