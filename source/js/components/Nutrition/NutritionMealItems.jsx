import React from 'react';
import Star from 'svg/star.svg';
import StarWithBg from 'svg/start_with_bg.svg';

const NutritionMealItems = props => {
  const { meal, index, mealDetails, addToFavourite } = props;

  console.log('Meal PROPS====>', meal);
  const {
    total_enerc_kal,
    total_procnt,
    total_fat,
    total_cabs,
    total_sugar,
    total_saturates,
  } = meal;

  return (
    <React.Fragment>
      <div className="box_wrap_one">
        <div className="head_wrap">
          <h2>{meal.title}</h2>

          <span className="star_one star_pink" style={{ right: '29px' }} onClick={(e) => addToFavourite(meal._id)}>
            <Star />
          </span>

          <button
            type="button"
            className="timline-post-del-btn"
            onClick={() => props.handleRemoveMeals(index)}
          >
            <i className="icon-cancel" />
          </button>
        </div>
        <ul className="ul_six_wrap">
          {/* <li>
                <div className='data_serve'>
                <img
                  alt='Recipe'
                  onError={(e) => {
                      e.target.src = noImg
                  }}
                  style={{height: '100%'}}
                  />
                </div>
            </li> */}
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

export default NutritionMealItems;
