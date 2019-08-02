import React from 'react';
import Star from 'svg/star.svg';
import StarWithBg from 'svg/start_with_bg.svg';

const NutritionMealItems = props => {
  // const [isStartEnable, setIsStartEnable] = useState(false);

  const { meal, index } = props;
  const { ingredientsIncluded, ingredients } = meal;
  console.log('Meal PROPS====>', meal);

  return ingredientsIncluded.map((ingredientIncluded, i) => {
    const findMealIngredients = ingredients.filter(({ _id: id }) => {
      return id === ingredientIncluded.ingredient_id;
    });

    const ingredientsData = { ...findMealIngredients };
    console.log('Ingredints========>', ingredientsData);

    const {
      serving_input: servingInput,
      ingredient_unit: ingredientUnit,
      count,
      totalKcl,
      totalfat,
      totalStarch,
      totalCarbs,
      totalSugar,
      totalProtein,
    } = ingredientIncluded;
    return (
      <React.Fragment>
        <div key="key" className="box_wrap_one">
          <div className="head_wrap">
            <h2>{ingredientsData[0].foodName}</h2>
            <div className="p_serve">
              <p>Serving Size:</p>
              <input
                type="number"
                className="form-control serving-input mr-5"
                style={{ backgroundColor: '#fff' }}
                value={servingInput}
                disabled
              />
              <p>Unit:</p>
              <input
                type="text"
                className="form-control serving-input mr-5"
                style={{ backgroundColor: '#fff' }}
                value={ingredientUnit}
                disabled
              />
              <p>Count:</p>
              <input
                type="text"
                className="form-control serving-input"
                style={{ backgroundColor: '#fff' }}
                value={count}
                disabled
              />
            </div>
            <span className="star_one" style={{ right: '29px' }}>
              <Star />
            </span>

            <button
              type="button"
              className="timline-post-del-btn"
              onClick={() => props.handleRemoveMeals(i)}
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
                  Kcal<span>{totalKcl}</span>
                </p>
              </div>
            </li>
            <li>
              <div className="data_serve">
                <p>
                  Fat<span>{totalfat}</span>
                </p>
              </div>
            </li>
            <li>
              <div className="data_serve">
                <p>
                  Saturates<span>{totalStarch}</span>
                </p>
              </div>
            </li>
            <li>
              <div className="data_serve">
                <p>
                  Carbs<span>{totalCarbs}</span>
                </p>
              </div>
            </li>
            <li>
              <div className="data_serve">
                <p>
                  Sugar<span>{totalSugar}</span>
                </p>
              </div>
            </li>
            <li>
              <div className="data_serve">
                <p>
                  Protein<span>{totalProtein}</span>
                </p>
              </div>
            </li>
          </ul>
        </div>
      </React.Fragment>
    );
  });
};

export default NutritionMealItems;
