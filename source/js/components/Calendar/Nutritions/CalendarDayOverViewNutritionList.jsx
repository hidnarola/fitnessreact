import React, { Component } from 'react';
import NoMealImage from '../../../../assets/img/common/no-img.png';
import { SERVER_BASE_URL } from '../../../constants/consts';
import { routeCodes } from '../../../constants/routes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import cns from 'classnames';
import Star from '../../../../assets/svg/star.svg';
import Button from 'react-bootstrap/lib/Button';
import Collapse from 'react-bootstrap/lib/Collapse';
import { Scrollbars } from 'react-custom-scrollbars';
import { ButtonToolbar, Dropdown, MenuItem } from 'react-bootstrap';

class CalendarDayOverViewNutritionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }
  componentDidMount() {
    const { index } = this.props;
    this.setState({ servingSize: 5 });
  }

  render() {
    const { meal, authuserId, recentMeals, addToFavourite, index } = this.props;
    const {
      _id,
      total_enerc_kal,
      total_procnt,
      total_fat,
      total_cabs,
      total_sugar,
      total_saturates,
      userId,
    } = meal;
    const { open, servingSize = 0 } = this.state;

    return (
      <React.Fragment>
        <div className="nutrition-box">
          <div className="nutrition-header align-items-center">
            <div className="display-star">
              <Star />
            </div>
            <div className="title">{meal.title}</div>
            <ButtonToolbar className="boxing-icon ml-auto">
              <Dropdown id={`workout-actions-1`} pullRight>
                <Dropdown.Toggle noCaret>
                  <i className="icon-more_horiz"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <MenuItem
                    eventKey="1"
                    onClick={() => console.log('advanceView')}
                  >
                    Advance Display
                  </MenuItem>
                  <MenuItem
                    eventKey="2"
                    onClick={() => console.log('normalView')}
                  >
                    Move Exercise
                  </MenuItem>
                </Dropdown.Menu>
              </Dropdown>
            </ButtonToolbar>
            <button type="button" className="timline-post-del-btn">
              <FontAwesomeIcon icon="trash-alt" />
            </button>
          </div>
          <div className="nutrition-body d-flex flex-wrap">
            <div className="nutrition-panel">
              <h3>M</h3>
              <ul>
                <li>Ve</li>
                <li>Ka</li>
              </ul>
            </div>
            <div className="nutrition-serve-box ml-2 mr-2">
              <div className="row width-100-per no-gutters">
                <div className="col-md-4">
                  <div className="serving-size mr-3">Serving Size</div>
                </div>
                <div className="col-md-4">
                  <div className="serving-boxs width-100-per m-0">
                    <button
                      className="btn btn-minus"
                      onClick={() =>
                        this.setState({
                          servingSize:
                            servingSize > 0 && servingSize < 999
                              ? servingSize - 1
                              : servingSize,
                        })
                      }
                    >
                      <FontAwesomeIcon icon="minus" />
                    </button>
                    <input
                      type="number"
                      name="servingSize"
                      className="form-control"
                      value={servingSize}
                      onChange={e =>
                        this.setState({
                          servingSize:
                            e.target.value >= 0 && e.target.value <= 999
                              ? e.target.value
                              : servingSize,
                        })
                      }
                      max={999}
                      min={1}
                    />
                    <button
                      className="btn btn-plus"
                      onClick={() =>
                        this.setState({
                          servingSize:
                            servingSize >= 0 && servingSize < 999
                              ? servingSize + 1
                              : servingSize,
                        })
                      }
                    >
                      <FontAwesomeIcon icon="plus" />
                    </button>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="serving-select pl-3 width-100-per">
                    <select className="form-control">
                      <option>cm</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="ingredient-boxs mt-2 mr-2">
                    <div className="title">Ingredients</div>
                    <ul>
                      <li className="d-flex width-100-per">
                        <span>Plain Flour</span>
                        <span className="ml-auto">350g</span>
                      </li>
                      <li className="d-flex width-100-per">
                        <span>Eggs</span>
                        <span className="ml-auto">2 whole</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="ingredient-boxs mt-2">
                    <div className="title d-flex width-100-per">
                      <div>Nutrition</div>
                      <div className="ml-auto">
                        <FontAwesomeIcon icon="search" />
                      </div>
                    </div>
                    <ul>
                      <li className="d-flex width-100-per">
                        <span>Calories</span>
                        <span className="ml-auto">800 kcal</span>
                      </li>
                      <li className="d-flex width-100-per">
                        <span>Fat</span>
                        <span className="ml-auto">350g</span>
                      </li>
                      <li className="d-flex width-100-per">
                        <span>Sugar</span>
                        <span className="ml-auto">350g</span>
                      </li>
                      <li className="d-flex width-100-per">
                        <span>Carbohydrates</span>
                        <span className="ml-auto">350g</span>
                      </li>
                    </ul>
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

export default CalendarDayOverViewNutritionList;

{
  /* <div className="box_wrap_one animated fadeIn">
          <div className="head_wrap">
            <span
              className={cns('star_one', {
                star_pink: _.some(recentMeals, { _id: meal._id }),
                active: _.some(recentMeals, { _id: meal._id }),
              })}
              onClick={e =>
                addToFavourite(meal._id, _.some(recentMeals, { _id: meal._id }))
              }
            >
              <Star />
            </span>
            <h2>{meal.title}</h2>
            <button
              type="button"
              className="timline-post-del-btn ml-auto"
              onClick={() => this.props.handleRemoveMeals(index)}
            >
              <FontAwesomeIcon icon="trash-alt" />
            </button>
            <Link
              className="timline-post-edit-btn"
              to={
                authuserId === userId
                  ? `${routeCodes.NUTRITION_EDIT}/${_id}`
                  : `${routeCodes.NUTRITION_VIEW}/${_id}`
              }
            >
              <FontAwesomeIcon
                icon={authuserId === userId ? 'edit' : 'eye'}
                size="2x"
              />
            </Link>
          </div>
          <div className="display-serve">
            <h3>Serving Size</h3>
            <div className="serving-boxs">
              <button className="btn btn-minus">
                <FontAwesomeIcon icon="minus" />
              </button>
              <input
                type="number"
                className="form-control"
                defaultValue="500"
              />
              <button className="btn btn-plus">
                <FontAwesomeIcon icon="plus" />
              </button>
            </div>
            <div className="serving-select">
              <select className="form-control">
                <option>Grams</option>
              </select>
            </div>
          </div>

          <div
            className={
              open ? 'fullnutrition-section open' : 'fullnutrition-section'
            }
          >
            <Button
              className="arrow-btn"
              onClick={() => this.setState({ open: !this.state.open })}
              aria-controls="example-collapse-text"
              aria-expanded={open}
            >
              <FontAwesomeIcon icon="chevron-down" />
            </Button>

            <div className="fullnutrition-boxs">
              <h3>Full Nutrition</h3>
              {open && <Scrollbars autoHide>{renderField}</Scrollbars>}
              {!open && renderField}
            </div>
          </div>
        </div> */
}
