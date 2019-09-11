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

class CalendarDayOverViewNutritionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
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
    const { open } = this.state;
    const renderField = (
      <ul className="ul_six_wrap ul_meal_img">
        <li>
          <div className="data_serve">
            <span className="title">Kcal</span>
            <span className="total-text">{total_enerc_kal}</span>
            <span className="kcal-text">Kcal</span>
          </div>
        </li>
        <li>
          <div className="data_serve">
            <span className="title">Fat</span>
            <span className="total-text">{total_fat}</span>
            <span className="kcal-text">Kcal</span>
          </div>
        </li>
        <li>
          <div className="data_serve">
            <span className="title">Saturates</span>
            <span className="total-text">{total_saturates}</span>
            <span className="kcal-text">Kcal</span>
          </div>
        </li>
        <li>
          <div className="data_serve">
            <span className="title">Carbs</span>
            <span className="total-text">{total_cabs}</span>
            <span className="kcal-text">Kcal</span>
          </div>
        </li>
        <li>
          <div className="data_serve">
            <span className="title">Sugar</span>
            <span className="total-text">{total_sugar}</span>
            <span className="kcal-text">Kcal</span>
          </div>
        </li>
        <li>
          <div className="data_serve">
            <span className="title">Protein</span>
            <span className="total-text">{total_procnt}</span>
            <span className="kcal-text">Kcal</span>
          </div>
        </li>
      </ul>
    );
    return (
      <React.Fragment>
        <div className="box_wrap_one animated fadeIn">
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
        </div>
      </React.Fragment>
    );
  }
}

export default CalendarDayOverViewNutritionList;
