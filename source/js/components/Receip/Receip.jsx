import React, { Component } from 'react';
import FitnessHeader from '../global/FitnessHeader';
import FitnessNav from '../global/FitnessNav';

export default class Receip extends Component {

    render() {
        return (
            <div>
                <FitnessHeader />
                <FitnessNav />
                <section className="body-wrap">
                    <div className="body-head d-flex justify-content-start">
                        <div className="body-head-l">
                            <h2>Vegan Mac ’n’ Cheese</h2>
                            <p>Make the ultimate comfort dish, macaroni cheese, but with vegan credentials. The recipe is quick and easy
                                to make, so a great
                                <br /> midweek meal for the family</p>
                        </div>
                        <div className="body-head-r">
                            <a href="" className="pink-btn">Favourite Recipe
                                <i className="icon-star"></i>
                            </a>
                            <a href="" className="white-btn">Print Recipe
                                <i className="icon-print"></i>
                            </a>
                        </div>
                    </div>

                    <div className="body-content row recipe column-wrap d-flex">
                        <div className="col-md-4">
                            <div className="white-box food-img space-btm-20">
                                <a href=""></a>
                            </div>

                            <div className="white-box ingredients">
                                <div className="whitebox-head">
                                    <h3 className="title-h3">Ingredients</h3>
                                </div>
                                <div className="whitebox-body">
                                    <ul>
                                        <li>160g raw cashews</li>
                                        <li>200g carrots, peeled and cut into 1cm cubes</li>
                                        <li>700g potatoes, peeled and cut into 1cm cubes</li>
                                        <li>90ml olive oil</li>
                                        <li>40g nutritional yeast</li>
                                        <li>1 lemon, juice only</li>
                                        <li>4 garlic cloves, peeled and roughly chopped</li>
                                        <li>1 tbsp Dijon mustard</li>
                                        <li>1 tbsp white wine vinegar</li>
                                        <li>1 tsp cayenne pepper</li>
                                        <li>400g macaroni</li>
                                        <li>3 tbsp panko breadcrumbs</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="white-box space-btm-20">
                                <div className="whitebox-head">
                                    <h3 className="title-h3">details</h3>
                                </div>
                                <div className="dtl-div whitebox-body">
                                    <ul className="common-ul">
                                        <li>
                                            <div className="grey-white">
                                                <h4>Recipe Rating:</h4>
                                                <h5 className="recipe-rate">
                                                    <i className="icon-star"></i>
                                                    <i className="icon-star"></i>
                                                    <i className="icon-star"></i>
                                                    <i className="icon-star"></i>
                                                    <i className="icon-star"></i>
                                                </h5>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="grey-white">
                                                <h4>Prep Time:</h4>
                                                <h5>15 Mins</h5>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="grey-white">
                                                <h4>Cook Time:</h4>
                                                <h5>20 Mins</h5>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="grey-white">
                                                <h4>Difficulty:</h4>
                                                <h5>Easy</h5>
                                            </div>
                                        </li>
                                    </ul>
                                    <div className="recipe-type">
                                        <span>
                                            <i>V</i> Vegetarian</span>
                                        <span>
                                            <i>VV</i> Vegetarian</span>
                                    </div>
                                </div>
                            </div>
                            <div className="white-box method">
                                <div className="whitebox-head">
                                    <h3 className="title-h3">Method</h3>
                                </div>
                                <div className="whitebox-body">
                                    <ul className="decimal-ul">
                                        <li>
                                            <p>The night before, soak the cashew nuts in water and leave overnight.</p>
                                        </li>
                                        <li>
                                            <p>Heat the oven to 180C/160C fan/gas 4. Steam the carrots and potatoes together for 5 mins,
                                                until completely softened. Transfer to a food processor. Drain the cashews and add these
                                                with 60ml of the oil, then blitz to break down the nuts. Tip in the other ingredients
                                                – apart from the macaroni, breadcrumbs and the remaining oil – then blitz again until
                                                the mixture is smooth and season well. Add a splash of water and just a drizzle of olive
                                                oil if it looks too stiff, then set aside.</p>
                                        </li>
                                        <li>
                                            <p>Cook the macaroni in a large pan of salted water for 1 min less than packet instructions,
                                                drain then stir through the sauce. Transfer the mix to an ovenproof dish, stir the breadcrumbs
                                                with the remaining oil and some seasoning. Scatter over the top of the macaroni and bake
                                                for 20-25 mins until piping hot and crisp.</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="recipe-nutrition white-box">
                                <div className="whitebox-head">
                                    <h3 className="title-h3">Recipe Nutrition</h3>
                                </div>
                                <div className="whitebox-body">
                                    <div className="dtl-div">
                                        <ul className="common-ul">
                                            <li>
                                                <div className="grey-white">
                                                    <h4>Calories</h4>
                                                    <h5>686</h5>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="grey-white">
                                                    <h4>Protein</h4>
                                                    <h5>20
                                                        <sub>g</sub>
                                                    </h5>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="grey-white">
                                                    <h4>Fat</h4>
                                                    <h5>30
                                                        <sub>g</sub>
                                                    </h5>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="grey-white">
                                                    <h4>carbohydrates</h4>
                                                    <h5>80
                                                        <sub>g</sub>
                                                    </h5>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="grey-white">
                                                    <h4>Sugar</h4>
                                                    <h5>6
                                                        <sub>g</sub>
                                                    </h5>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="grey-white">
                                                    <h4>Fibar</h4>
                                                    <h5>8
                                                        <sub>g</sub>
                                                    </h5>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="grey-white">
                                                    <h4>Salt</h4>
                                                    <h5>1.12g
                                                        <sub></sub>
                                                    </h5>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="nutrition-chart">
                                        <img src="images/nutrition-chart.jpg" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}