import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { showPageLoader, hidePageLoader } from '../../../actions/pageLoader';
import { ingredientSelectOneRequest } from '../../../actions/admin/ingredients';
import { InputField, TextAreaField, FileField_Dropzone, CheckboxField } from '../../../helpers/FormControlHelper';
import { required } from '../../../formValidation/validationRules';
import { adminRouteCodes } from '../../../constants/adminRoutes';
import { SERVER_BASE_URL } from '../../../constants/consts';

class IngredientsForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectDataInit: false,
            allowInShopList: true,
        };
    }

    componentWillMount() {
        const { dispatch, match } = this.props;
        dispatch(showPageLoader());
        if (typeof match.params.id !== 'undefined') {
            this.setState({
                selectDataInit: true
            });
            dispatch(ingredientSelectOneRequest(match.params.id))
        }
    }

    render() {
        const { handleSubmit, ingredient } = this.props;
        const { allowInShopList } = this.state;
        return (
            <div className="exercise-form-data">
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-12">
                            <Field
                                name="name"
                                className="form-control"
                                label="Name"
                                labelClass="control-label"
                                wrapperClass="form-group"
                                placeholder="Name"
                                component={InputField}
                                errorClass=""
                                warningClass=""
                                validate={[required]}
                            />
                            <Field
                                name="description"
                                className="form-control"
                                label="Description"
                                labelClass="control-label"
                                wrapperClass="form-group"
                                placeholder="Description"
                                component={TextAreaField}
                            />
                            <Field
                                name="ingredient_img"
                                label="Images"
                                labelClass="control-label"
                                wrapperClass="form-group"
                                placeholder="Images"
                                component={FileField_Dropzone}
                                multiple={false}
                            />
                            {ingredient &&
                                <div className="image-preview-wrapper">
                                    <img src={SERVER_BASE_URL + ingredient.image} />
                                </div>
                            }
                            <Field
                                name="allow_in_shop_list"
                                label="Allow In Shop List"
                                labelClass="control-label"
                                wrapperClass="form-group"
                                component={CheckboxField}
                                checked={allowInShopList}
                                handleClick={this.setAllowInShopListState}
                                errorClass=""
                                warningClass=""
                            />
                            <div className="col-md-12 mb-20 clear-both">
                                <div className="stepbox-b">
                                    <NavLink to={adminRouteCodes.INGREDIENTS} className="continues-btn">Back</NavLink>
                                    <button type="submit" className="continues-btn"><span>Save</span></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }

    componentDidUpdate() {
        const { selectDataInit } = this.state;
        const {
            loading,
            dispatch,
            match,
            initialize,
            ingredient,
        } = this.props;
        if (typeof match.params.id !== 'undefined') {
            if (selectDataInit && !loading) {
                this.setState({
                    selectDataInit: false,
                });
                let ingredientData = {
                    name: ingredient.name,
                    description: ingredient.description,
                    allow_in_shop_list: ingredient.allowInShopList,
                };
                this.setState({ allowInShopList: ingredient.allowInShopList });
                initialize(ingredientData);
            }
        }
        dispatch(hidePageLoader());
    }

    setAllowInShopListState = (value) => {
        this.props.change('allow_in_shop_list', value);
        this.setState({
            allowInShopList: value
        });
    }
}

IngredientsForm = reduxForm({
    form: 'ingredientsSaveForm',
    multipartForm: true
})(IngredientsForm)

const mapStateToProps = (state) => {
    const { adminIngredients } = state;
    return {
        loading: adminIngredients.get('loading'),
        error: adminIngredients.get('error'),
        ingredient: adminIngredients.get('ingredient'),
    };
}

IngredientsForm = withRouter(IngredientsForm);

export default connect(
    mapStateToProps,
)(IngredientsForm);