import React from 'react';
import Slider from "react-slick";

const SlickSlider = () => {
    let settings = {
        dots: true
    };
    return (
        <div className="react-slick-container">
            <Slider {...settings}>
                <div>
                    <h1>Slide 1</h1>
                </div>
                <div>
                    <h1>Slide 2</h1>
                </div>
                <div>
                    <h1>Slide 3</h1>
                </div>
                <div>
                    <h1>Slide 4</h1>
                </div>
            </Slider>
        </div>
    );
};

export default SlickSlider;