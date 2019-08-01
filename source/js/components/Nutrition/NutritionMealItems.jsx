import React from "react";
import Star from "svg/star.svg";

const NutritionMealItems = props => {
  const { meal } = props;
  return (
    <div key={1} className="box_wrap_one">
      <div className="head_wrap">
        <h2>{meal.title}</h2>

        <span className="star_one">
          <Star />
        </span>
        {/* <button type="button" className="timline-post-del-btn">
          <i className="icon-cancel" />
        </button> */}
      </div>
      <ul className="ul_six_wrap">
        {/* <li>
                                                        <div className="data_serve">
                                                        <img
                                                          alt="Recipe"
                                                          onError={(e) => {
                                                              e.target.src = noImg
                                                          }}
                                                          style={{height: "100%"}}
                                                          />
                                                        </div>
                                                    </li> */}
        <li className="ml-auto">
          <div className="data_serve">
            <p>
              Kcal<span>350</span>
            </p>
          </div>
        </li>
        <li>
          <div className="data_serve">
            <p>
              Fat<span>350</span>
            </p>
          </div>
        </li>
        <li>
          <div className="data_serve">
            <p>
              Saturates<span>350</span>
            </p>
          </div>
        </li>
        <li>
          <div className="data_serve">
            <p>
              Carbs<span>350</span>
            </p>
          </div>
        </li>
        <li>
          <div className="data_serve">
            <p>
              Sugar<span>350</span>
            </p>
          </div>
        </li>
        <li>
          <div className="data_serve">
            <p>
              Fibre<span>350</span>
            </p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default NutritionMealItems;
