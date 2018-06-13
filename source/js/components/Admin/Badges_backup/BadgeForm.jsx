import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import { InputField, EditorField, SelectField_ReactSelect, SelectField_ReactSelectMulti } from '../../../helpers/FormControlHelper';
import { required, requiredReactSelect, requiredReactSelectMulti } from '../../../formValidation/validationRules';
import BadgeTaskField from './BadgeTaskField';
import { adminRouteCodes } from '../../../constants/adminRoutes';
import TagsInput from "react-tagsinput";
import { TIME_TYPE_TIME_WINDOW, TIME_TYPE_STANDARD } from '../../../constants/consts';
import { capitalizeFirstLetter, prepareDropdownOptionsData } from '../../../helpers/funs';
import DateRangePicker from 'react-daterange-picker';
import { badgeTaskListRequest } from '../../../actions/admin/badgeTasks';
import { badgeCategoryListRequest } from '../../../actions/admin/badgeCategories';

const timeTypeOptions = [
    { value: TIME_TYPE_STANDARD, label: capitalizeFirstLetter(TIME_TYPE_STANDARD).replace('_', ' ') },
    { value: TIME_TYPE_TIME_WINDOW, label: capitalizeFirstLetter(TIME_TYPE_TIME_WINDOW).replace('_', ' ') },
    // { value: TIME_TYPE_TIMED, label: capitalizeFirstLetter(TIME_TYPE_TIMED).replace('_', ' ') },
];

class BadgeForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            incompleteDescription: '',
            completeDescription: '',
            tags: [],
            timeDateRange: null,
            timeDateRangeState: null,
            timeType: '',
            initPageDataLoad: false,
        }
    }

    componentWillMount() {
        const { dispatch } = this.props;
        this.setState({ initPageDataLoad: true });
        dispatch(badgeTaskListRequest());
        dispatch(badgeCategoryListRequest());
    }

    render() {
        const { incompleteDescription, completeDescription, tags, timeDateRange, timeType } = this.state;
        const { handleSubmit, badgeTasks, badgeCategories } = this.props;
        const badgeTasksOptions = prepareDropdownOptionsData(badgeTasks, '_id', 'name');
        const badgeCategoriesOptions = prepareDropdownOptionsData(badgeCategories, '_id', 'name');
        return (
            <div className="badge-form-data">
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-12">
                            <Field
                                name="name"
                                className="form-control"
                                label="Name"
                                labelClass="control-label display_block"
                                wrapperClass="form-group"
                                placeholder="Name"
                                component={InputField}
                                errorClass="help-block"
                                warningClass=""
                                validate={[required]}
                            />
                            <Field
                                name="incomplete_description"
                                value={incompleteDescription}
                                handleChange={this.handleChangeIncompleteDesc}
                                className="editor-min-height-200"
                                label="Incomplete Description"
                                labelClass="control-label display_block"
                                wrapperClass="form-group"
                                placeholder="Incomplete Description"
                                component={EditorField}
                            />
                            <Field
                                name="complete_description"
                                value={completeDescription}
                                handleChange={this.handleChangeCompleteDesc}
                                className="editor-min-height-200"
                                label="Complete Description"
                                labelClass="control-label display_block"
                                wrapperClass="form-group"
                                placeholder="Complete Description"
                                component={EditorField}
                            />
                            <Field
                                name="points"
                                type="number"
                                className="form-control"
                                label="Points"
                                labelClass="control-label display_block"
                                wrapperClass="form-group"
                                placeholder="Points"
                                component={InputField}
                                errorClass="help-block"
                                warningClass=""
                                validate={[required]}
                            />
                            <Field
                                name="task"
                                label="Task"
                                labelClass="control-label display_block"
                                wrapperClass="col-md-12 form-group no-padding"
                                actionOptions={badgeTasksOptions}
                                component={BadgeTaskField}
                            />
                            <Field
                                name="time_type"
                                label="Time Type"
                                labelClass="control-label display_block"
                                wrapperClass="form-group"
                                placeholder="Time Type"
                                component={SelectField_ReactSelect}
                                options={timeTypeOptions}
                                errorClass="help-block"
                                validate={[requiredReactSelect]}
                                onChange={(val) => this.setState({ timeType: val.value })}
                            />
                            {timeType && timeType === TIME_TYPE_TIME_WINDOW &&
                                <div className="form-group">
                                    <label className="control-label display_block">Select Dates</label>
                                    <div className="badges-timed-date-range-wrapper">
                                        <DateRangePicker
                                            firstOfWeek={1}
                                            numberOfCalendars={2}
                                            selectionType='range'
                                            value={timeDateRange}
                                            onSelect={this.handleTimeDateRange}
                                        />
                                    </div>
                                </div>
                            }
                            {/* {timeType && timeType === TIME_TYPE_TIMED &&
                                <Field
                                    name="hours"
                                    type="number"
                                    className="form-control"
                                    label="Hours"
                                    labelClass="control-label display_block"
                                    wrapperClass="form-group"
                                    placeholder="Hours"
                                    component={InputField}
                                    errorClass="help-block"
                                    warningClass=""
                                    validate={[required]}
                                />
                            } */}
                            <Field
                                name="categories"
                                label="Categories"
                                labelClass="control-label display_block"
                                wrapperClass="form-group"
                                placeholder="Categories"
                                component={SelectField_ReactSelectMulti}
                                options={badgeCategoriesOptions}
                                errorClass="help-block"
                                validate={[requiredReactSelectMulti]}
                            />

                            <div className="form-group">
                                <label>Tags</label>
                                <TagsInput
                                    value={tags}
                                    onChange={this.handleTagChange}
                                    inputProps={{
                                        placeholder: 'Tags'
                                    }}
                                />
                            </div>

                            <div className="col-md-12 mb-20 clear-both text-center">
                                <div className="stepbox-b stepbox-b-center">
                                    <NavLink to={adminRouteCodes.EXERCISE} className="continues-btn">Back</NavLink>
                                    <button type="submit" className="continues-btn"><span>Save</span></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }

    // ----Start Methods----
    handleChangeIncompleteDesc = (editorText) => {
        this.props.change('incomplete_description', editorText);
        this.setState({ incompleteDescription: editorText });
    }

    handleChangeCompleteDesc = (editorText) => {
        this.props.change('complete_description', editorText);
        this.setState({ completeDescription: editorText });
    }

    handleTagChange = (tags) => {
        // this.props.change('complete_description', editorText);
        this.setState({ tags });
    }
    handleTimeDateRange = (range, state) => {
        // this.props.change('complete_description', editorText);
        this.setState({
            timeDateRange: range,
            timeDateRangeState: state
        });
    }
    // ----End Methods----
}

BadgeForm = reduxForm({ form: 'badgeSaveForm' })(BadgeForm);

const mapStateToProps = (state) => {
    const { adminBadgeTasks, adminBadgeCategories } = state;
    return {
        badgeTasks: adminBadgeTasks.get('badgeTasks'),
        badgeCategories: adminBadgeCategories.get('badgeCategories'),
    };
}

export default connect(mapStateToProps)(BadgeForm);