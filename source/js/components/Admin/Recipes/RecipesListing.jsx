import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { adminRouteCodes } from '../../../constants/adminRoutes';

class RecipesListing extends Component {
    render() {
        return (
            <div className="recipes-listing-wrapper">
                <div className="body-head space-btm-45 d-flex justify-content-start">
                    <div className="body-head-l">
                        <h2>Recipes</h2>
                    </div>
                    <div className="body-head-r">
                        <NavLink to={adminRouteCodes.RECIPES_SAVE} className="pink-btn">Add Recipe</NavLink>
                    </div>
                </div>

                <div className="body-content row d-flex">
                    <div className="col-md-12">
                        <div className="white-box">
                            <div className="whitebox-head">
                                <h3 className="title-h3">Recipes</h3>
                            </div>
                            <div className="row d-flex whitebox-body">
                                <div className="col-md-12">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RecipesListing;