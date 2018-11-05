import React from 'react';
import StarRatings from 'react-star-ratings';

const RatingStarsDisplay = (props) => {
    return (
        <StarRatings
            rating={(typeof props.rating !== 'undefined' && props.rating) ? props.rating : 0}
            starRatedColor="#ffb400"
            numberOfStars={(typeof props.numberOfStars !== 'undefined' && props.numberOfStars) ? props.numberOfStars : 5}
            name={props.numberOfStars}
            starDimension={(typeof props.starDimension !== 'undefined' && props.starDimension) ? props.starDimension : "15px"}
            starSpacing={(typeof props.starSpacing !== 'undefined' && props.starSpacing) ? props.starSpacing : "0"}
        />
    );
};

export default RatingStarsDisplay;