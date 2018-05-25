import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { Scrollbars } from 'react-custom-scrollbars';
import noImg from 'img/common/no-img.png'

class NutritionSearchRecipeDetailsModal extends Component {
    render() {
        const { show, handleClose, recipe } = this.props;
        var nutritionKeys = [];
        if (recipe.totalNutrients) {
            nutritionKeys = Object.keys(recipe.totalNutrients);
        }
        return (
            <div className="recipe-details-modal-wrapper">
                <Modal show={show} bsSize="large" className="progress-popup recipe-details-modal-main">
                    <div className="progress-popup-head">
                        <button type="button" className="close-round" onClick={handleClose}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h3 className="title-h3">Recipe Details</h3>
                    </div>

                    <div className="progress-popup-body d-flex" style={{ height: 530 }}>
                        <Scrollbars autoHide>
                            <div className="col-md-12 width-100-per" style={{ height: "100%" }}>
                                <section className="body-wrap">
                                    <div className="body-head d-flex justify-content-start">
                                        <div className="body-head-l">
                                            <h2>{recipe.name}</h2>
                                        </div>
                                    </div>

                                    <div className="body-content row recipe column-wrap d-flex">
                                        <div className="col-md-4">
                                            <div className="white-box food-img space-btm-20">
                                                <img
                                                    src={recipe.image}
                                                    alt="Recipe"
                                                    onError={(e) => {
                                                        e.target.src = noImg
                                                    }}
                                                />
                                            </div>

                                            <div className="white-box ingredients">
                                                <div className="whitebox-head">
                                                    <h3 className="title-h3">Ingredients</h3>
                                                </div>
                                                <div className="whitebox-body">
                                                    <ul>
                                                        {recipe.ingredientLines && recipe.ingredientLines.length > 0 &&
                                                            recipe.ingredientLines.map((ing, index) => {
                                                                return (
                                                                    <li key={index}>{ing}</li>
                                                                )
                                                            })
                                                        }
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
                                                        {recipe.totalTime != '' &&
                                                            <li>
                                                                <div className="grey-white">
                                                                    <h4>Cook Time:</h4>
                                                                    <h5>{recipe.totalTime} Mins</h5>
                                                                </div>
                                                            </li>
                                                        }
                                                    </ul>
                                                    {recipe.dietLabels && recipe.dietLabels.length > 0 &&
                                                        <div className="recipe-type">
                                                            {
                                                                recipe.dietLabels.map((val, index) => (
                                                                    <span key={index}>
                                                                        <i>
                                                                            {val.charAt(0)}
                                                                        </i>
                                                                        {val}
                                                                    </span>

                                                                ))
                                                            }
                                                        </div>
                                                    }
                                                    {recipe.healthLabels && recipe.healthLabels.length > 0 &&
                                                        <div className="recipe-type">
                                                            {
                                                                recipe.healthLabels.map((val, index) => (
                                                                    <span key={index}>
                                                                        <i>
                                                                            {val.charAt(0)}
                                                                        </i>
                                                                        {val}
                                                                    </span>

                                                                ))
                                                            }
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                            <div className="white-box method">
                                                <div className="whitebox-head">
                                                    <h3 className="title-h3">Method</h3>
                                                </div>
                                                <div className="whitebox-body">
                                                    <a href={recipe.url} target="_blank" className="btn btn-default">Preparation Details</a>
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
                                                        {nutritionKeys && nutritionKeys.length > 0 &&
                                                            <ul className="common-ul">
                                                                {
                                                                    nutritionKeys.map((key, index) => {
                                                                        var nutriObj = recipe.totalNutrients[key];
                                                                        var qty = Math.round(nutriObj.quantity).toFixed(0);
                                                                        return (
                                                                            <li key={key}>
                                                                                <div className="grey-white">
                                                                                    <h4>{nutriObj.label}</h4>
                                                                                    <h5>{qty}{nutriObj.unit}</h5>
                                                                                </div>
                                                                            </li>
                                                                        );
                                                                    })
                                                                }
                                                            </ul>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </Scrollbars>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default NutritionSearchRecipeDetailsModal;