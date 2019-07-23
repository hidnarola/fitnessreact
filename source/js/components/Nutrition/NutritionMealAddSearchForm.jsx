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
                        <div className="search search_Cstm">
                            <Field
                                name="search_term"
                                className="form-control"
                                placeholder="Search Meal"
                                component={InputField}
                                errorClass="help-block"
                                validate={[required]}
                            />
                            <button type="submit" className="btn btn-primary">
                                <svg fill="currentColor" preserveAspectRatio="xMidYMid meet" height="24" width="24" viewBox="0 0 40 40" style={{ "verticalAlign": "middle" }}><g><path d="m27.2 18.6q0-4.2-2.9-7.1t-7.1-2.9-7 2.9-3 7.1 2.9 7 7.1 3 7.1-3 2.9-7z m11.4 18.5q0 1.2-0.8 2.1t-2 0.8q-1.2 0-2-0.8l-7.7-7.7q-4 2.8-8.9 2.8-3.2 0-6.1-1.3t-5-3.3-3.4-5-1.2-6.1 1.2-6.1 3.4-5.1 5-3.3 6.1-1.2 6.1 1.2 5 3.3 3.4 5.1 1.2 6.1q0 4.9-2.7 8.9l7.6 7.6q0.8 0.9 0.8 2z"></path></g></svg>
                            </button>
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
                `${(wrapperClass) ? wrapperClass : ''} ${(meta.touched && meta.error) ? 'has-error' : ''}`
            }
        >
            <input
                {...input}
                type={type ? type : 'text'}
                disabled={disabled ? disabled : false}
                className={className}
                placeholder={placeholder}
                autoComplete="off"
            />
            {meta.touched &&
                ((meta.error && <div className={errorClass}>{meta.error}</div>) || (meta.warning && <span className={warningClass}>{meta.warning}</span>))
            }
        </div>
    );
}