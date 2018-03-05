import React from 'react';
import { Field, reduxForm } from 'redux-form';
import validate from './validate';

import icon01 from 'img/registration/icon-01.jpg';
import icon02 from 'img/registration/icon-02.jpg';
import icon03 from 'img/registration/icon-03.jpg';
import icon04 from 'img/registration/icon-04.jpg';
import icon05 from 'img/registration/icon-05.jpg';
import icon06 from 'img/registration/icon-06.jpg';

const colors = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Indigo', 'Violet'];

const renderColorSelector = ({ input, meta: { touched, error } }) => (
    <div>
        <select {...input}>
            <option value="">Select a color...</option>
            {colors.map(val => <option value={val} key={val}>{val}</option>)}
        </select>
        {touched && error && <span>{error}</span>}
    </div>
);

const WizardFormThirdPage = props => {
    // const { handleSubmit, pristine, previousPage, submitting } = props;
    const { handleSubmit, previousPage } = props;
    return (
        <div>
        
            <div className="step-box-r">
                <div className="stepbox-head">
                    <h2>Your Goal</h2>
                </div>
                <div className="stepbox-m">
                    <ul className="goal-level">
                        <li>
                            <a >
                                <img src={icon01} alt="" />
                            </a>
                            <span>Gain Muscle</span>
                        </li>
                        <li>
                            <a >
                                <img src={icon02} alt="" />
                            </a>
                            <span>Gain Flexibility</span>
                        </li>
                        <li>
                            <a >
                                <img src={icon03} alt="" />
                            </a>
                            <span>Lose Fat</span>
                        </li>
                        <li>
                            <a >
                                <img src={icon04} alt="" />
                            </a>
                            <span>gain Strength</span>
                        </li>
                        <li>
                            <a >
                                <img src={icon05} alt="" />
                            </a>
                            <span>Gain Power</span>
                        </li>
                        <li>
                            <a >
                                <img src={icon06} alt="" />
                            </a>
                            <span>Increase Endurance</span>
                        </li>
                    </ul>
                </div>
                <div className="stepbox-b">
                    {/* <a  className="back-btn">
                        <i className="icon-skip_previous"></i>
                        <span>Back</span>
                    </a>
                    <a  className="continues-btn">
                        <span>Continues</span>
                        <i className="icon-skip_next"></i>
                    </a> */}
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Favorite Color</label>
                    <Field name="favoriteColor" component={renderColorSelector} />
                </div>
                <div>
                    <label htmlFor="employed">Employed</label>
                    <div>
                        <Field
                            name="employed"
                            id="employed"
                            component="input"
                            type="checkbox"
                        />
                    </div>
                </div>
                <div>
                    <label>Notes</label>
                    <div>
                        <Field name="notes" component="textarea" placeholder="Notes" />
                    </div>
                </div>
                <div>
                    <button type="button" className="previous" onClick={previousPage}>
                        Previous
                    </button>
                    <button type="submit" className="continues-btn">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default reduxForm({
    form: 'wizard', //                 <------ same form name
    destroyOnUnmount: false, //        <------ preserve form data
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    validate,
})(WizardFormThirdPage);
