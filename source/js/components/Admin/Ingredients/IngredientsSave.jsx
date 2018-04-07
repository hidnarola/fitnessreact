import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showPageLoader, hidePageLoader } from '../../../actions/pageLoader';
import { adminRouteCodes } from '../../../constants/adminRoutes';
import { ingredientUpdateRequest, ingredientAddRequest } from '../../../actions/admin/ingredients';
import IngredientsForm from './IngredientsForm';

class IngredientsSave extends Component {
    constructor(props) {
        super(props);
        this.state = {
            saveActionInit: false,
        }
    }

    handleSubmit = (data) => {
        const { dispatch, match } = this.props;
        var formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        let allowInShopList = true;
        if (typeof data.allow_in_shop_list !== 'undefined') {
            allowInShopList = data.allow_in_shop_list;
        }
        formData.append('allowInShopList', allowInShopList);
        if (data.ingredient_img) {
            formData.append('ingredient_img', data.ingredient_img[0]);
        }
        this.setState({
            saveActionInit: true
        });
        dispatch(showPageLoader());
        if (typeof match.params.id !== 'undefined') {
            dispatch(ingredientUpdateRequest(match.params.id, formData))
        } else {
            dispatch(ingredientAddRequest(formData))
        }
    }

    render() {
        return (
            <div className="ingredient-save-wrapper">
                <div className="body-head space-btm-45 d-flex justify-content-start">
                    <div className="body-head-l">
                        <h2>Ingredients</h2>
                    </div>
                </div>

                <div className="body-content row d-flex">
                    <div className="col-md-12">
                        <div className="white-box">
                            <div className="whitebox-head">
                                <h3 className="title-h3">Save Ingredient</h3>
                            </div>
                            <div className="row d-flex whitebox-body">
                                <div className="col-md-12">
                                    <IngredientsForm onSubmit={this.handleSubmit} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    componentDidUpdate() {
        const { loading, dispatch, history } = this.props;
        const { saveActionInit } = this.state;
        if (saveActionInit && !loading) {
            this.setState({
                saveActionInit: false
            });
            dispatch(hidePageLoader());
            history.push(adminRouteCodes.INGREDIENTS);
        }
    }
}

const mapStateToProps = (state) => {
    const { adminIngredients } = state;
    return {
        loading: adminIngredients.get('loading'),
        error: adminIngredients.get('error'),
    }
}

export default connect(mapStateToProps)(IngredientsSave);