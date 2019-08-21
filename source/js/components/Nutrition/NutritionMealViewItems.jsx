import React from 'react';

const NutritionMealViewItems = props => {
  const { meal, ingredient } = props;
  const { foodName } = meal;
  const {
    count,
    serving_input,
    ingredient_unit,
    totalKcl,
    totalfat,
    totalCholesterol,
    totalSugar,
    totalCarbs,
    totalProtein,
  } = ingredient;
  console.log('MEAL ===> ', meal);
  const id = '102';
  return (
    <div className="box_wrap_one">
      <div className="head_wrap">
        <h2>{foodName}</h2>
        <div className="p_serve">
          <p>Serving Size:</p>
          <input
            type="text"
            name={'serving-input' + id}
            className="form-control serving-input"
            placeholder="100.00"
            value={serving_input}
            onChange={() => ''}
          />
          <select
            name={'dropdown-ingredient-unit' + id}
            defaultValue={ingredient_unit}
            placeholder="unit"
            className="form-control serving-input"
          >
            <option>g</option>
          </select>

          {false && <p style={{ paddingLeft: '6px' }}> Count:</p>}
          {false && <input
            name={'serving-unit' + id}
            className="form-control serving-input"
            placeholder="1"
            value={count}
            type="number"
            onChange={() => ''}
          />}
        </div>
      </div>
      <ul className="ul_six_wrap">
        <li>
          <div className="data_serve">
            <p>
              Kcal
              <span>
                {Number(totalKcl) !== NaN && totalKcl !== 'NaN' ? totalKcl : 0}
              </span>
            </p>
          </div>
        </li>
        <li>
          <div className="data_serve">
            <p>
              fat
              <span>
                {Number(totalfat) !== NaN && totalfat !== 'NaN' ? totalfat : 0}
              </span>
            </p>
          </div>
        </li>
        <li>
          <div className="data_serve">
            <p>
              Protin
              <span>
                {Number(totalProtein) !== NaN && totalProtein !== 'NaN'
                  ? totalProtein
                  : 0}
              </span>
            </p>
          </div>
        </li>
        <li>
          <div className="data_serve">
            <p>
              Carbs
              <span>
                {Number(totalCarbs) !== NaN && totalCarbs !== 'NaN'
                  ? totalCarbs
                  : 0}
              </span>
            </p>
          </div>
        </li>
        <li>
          <div className="data_serve">
            <p>
              Sugar
              <span>
                {Number(totalSugar) !== NaN && totalSugar !== 'NaN'
                  ? totalSugar
                  : 0}
              </span>
            </p>
          </div>
        </li>
        <li>
          <div className="data_serve">
            <p>
              Cholesterol
              <span>
                {Number(totalCholesterol) !== NaN && totalSugar !== 'NaN'
                  ? totalCholesterol
                  : 0}
              </span>
            </p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default NutritionMealViewItems;
