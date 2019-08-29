import React from 'react';
import NoMealImage from '../../../../assets/img/common/no-img.png';
import { SERVER_BASE_URL } from '../../../constants/consts';
import { routeCodes } from '../../../constants/routes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const CalendarDayOverViewNutritionList = props => {
  const { meal, authuserId } = props;
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
  return (
    <React.Fragment>
      <div className="box_wrap_one">
        <div className="head_wrap">
          <h2>{meal.title}</h2>
          <Link
            className="timline-post-edit-btn"
            to={
              authuserId === userId
                ? `${routeCodes.NUTRITION_EDIT}/${_id}`
                : `${routeCodes.NUTRITION_VIEW}/${_id}`
            }
          >
            <FontAwesomeIcon
              icon={authuserId === userId ? 'pencil-alt' : 'eye'}
              size="2x"
            />
          </Link>
        </div>
        <ul className="ul_six_wrap ul_meal_img">
          <li className="ml-auto">
            <div className="data_serve">
              {meal.image ? (
                <img src={`${SERVER_BASE_URL}${meal.image}`} alt="Meal image" />
              ) : (
                <img src={NoMealImage} alt="Meal image" />
              )}
            </div>
          </li>
          <li className="ml-auto">
            <div className="data_serve">
              <p>
                Kcal<span>{total_enerc_kal}</span>
              </p>
            </div>
          </li>
          <li>
            <div className="data_serve">
              <p>
                Fat<span>{total_fat}</span>
              </p>
            </div>
          </li>
          <li>
            <div className="data_serve">
              <p>
                Saturates<span>{total_saturates}</span>
              </p>
            </div>
          </li>
          <li>
            <div className="data_serve">
              <p>
                Carbs<span>{total_cabs}</span>
              </p>
            </div>
          </li>
          <li>
            <div className="data_serve">
              <p>
                Sugar<span>{total_sugar}</span>
              </p>
            </div>
          </li>
          <li>
            <div className="data_serve">
              <p>
                Protein<span>{total_procnt}</span>
              </p>
            </div>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};

export default CalendarDayOverViewNutritionList;
