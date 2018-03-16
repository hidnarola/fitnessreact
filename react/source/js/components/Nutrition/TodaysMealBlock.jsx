import React from 'react';

const TodaysMealBlock = (props) => {
    const { meal } = props;
    return (
        <div className="meal-wrap d-flex">
            <div className="meal-img">
                <img src={meal.imageUrl} alt="" />
            </div>
            <div className="meal-name">
                <small>{meal.smallTitle}</small>
                <h5>{meal.title}</h5>
            </div>
            <div className="meal-info">
                <small>Cals</small>
                <big>{meal.calories}</big>
            </div>
            <div className="meal-info">
                <small>Protein</small>
                <big>{meal.protein}</big>
            </div>
            <div className="meal-info">
                <small>Fat</small>
                <big>{meal.fat}</big>
            </div>
            <div className="meal-info">
                <small>Carbs</small>
                <big>{meal.carbohydrates}</big>
            </div>
            <div className="meal-info">
                <a href="">
                    <i className="icon-more_horiz"></i>
                </a>
            </div>
        </div>
    );
}

export default TodaysMealBlock;