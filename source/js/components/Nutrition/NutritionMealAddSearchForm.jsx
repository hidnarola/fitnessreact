import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { required } from '../../formValidation/validationRules';

class NutritionMealAddSearchForm extends Component {
    render() {
        const { handleSubmit } = this.props;
        return (
            <div className="nutrition-meal-add-search-form-wrapper">
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-11">
                            <Field
                                name="search_term"
                                className="form-control"
                                wrapperClass="form-group"
                                placeholder="Search Recipe"
                                component={InputField}
                                errorClass="help-block"
                                validate={[required]}
                            />
                        </div>
                        <div className="col-md-1">
                            <button type="submit" className="btn btn-primary"><span>Search</span></button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

NutritionMealAddSearchForm = reduxForm({
    form: 'nutritionMealAddSearchForm'
})(NutritionMealAddSearchForm);

const mapStateToProps = (state) => {
    return {

    };
}

export default connect(
    mapStateToProps,
)(NutritionMealAddSearchForm);

const InputField = (props) => {
    const { input, meta, wrapperClass, className, placeholder, errorClass, type, disabled } = props;
    return (
        <div
            className={
                `${wrapperClass} ${(meta.touched && meta.error) ? 'has-error' : ''}`
            }
        >
            <input
                {...input}
                type={type ? type : 'text'}
                disabled={disabled ? disabled : false}
                className={className}
                placeholder={placeholder}
            />
            {meta.touched &&
                ((meta.error && <div className={errorClass}>{meta.error}</div>) || (meta.warning && <span className={warningClass}>{meta.warning}</span>))
            }
        </div>
    );
}