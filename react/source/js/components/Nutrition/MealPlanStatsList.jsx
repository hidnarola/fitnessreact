import React from 'react';

const MealPlanStatsList = (props) => {
    const { mealPlanStat } = props;
    if (mealPlanStat) {
        return (
            <li>
                <div className="grey-white">
                    <h4>{mealPlanStat.title}</h4>
                    <h5>
                        {mealPlanStat.value}
                        <sub>{mealPlanStat.units}</sub>
                    </h5>
                </div>
            </li>
        );
    }
    return null;
}

export default MealPlanStatsList;