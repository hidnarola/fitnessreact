import React from 'react';
import { Field, reduxForm } from 'redux-form';
import validate from './validate';

import icon01 from 'img/registration/icon-01.jpg';
import icon02 from 'img/registration/icon-02.jpg';
import icon03 from 'img/registration/icon-03.jpg';
import icon04 from 'img/registration/icon-04.jpg';
import icon05 from 'img/registration/icon-05.jpg';
import icon06 from 'img/registration/icon-06.jpg';

const WizardFormFourthPage = props => {
    const { handleSubmit, pristine, previousPage, submitting } = props;
    return (
        <div className="step-box-r">
            <div className="stepbox-head">
                <h2>Personal Details</h2>
            </div>
            <div className="stepbox-m personal-dtl">
                <form>
                    <ul className="">
                        <li>
                            <div className="form-div">
                                <label>Full Name</label>
                                <div className="input-wrap">
                                    <input type="text" name="" placeholder="" />
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="form-div">
                                <label>Username</label>
                                <div className="input-wrap">
                                    <input type="text" name="" placeholder="" />
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="form-div">
                                <label>Gender</label>
                                <div className="input-wrap radiobox">
                                    <div className="radiobox-inr">
                                        <input id="male" type="radio" name="gender" value="male"/>
                                        <label for="male">
                                                
                                        </label>
                                    </div>
                                    <div className="radiobox-inr">
                                        <input id="female" type="radio" name="gender" value="female"/>
                                        <label for="female">
                                                
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="form-div">
                                <label>D.O.B</label>
                                <div className="input-wrap dob-input">
                                    <input type="text" name="" placeholder="" />
                                    <span> / </span>
                                    <input type="text" name="" placeholder="" />
                                    <span> / </span>
                                    <input type="text" name="" placeholder="" />
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="form-div">
                                <label>Height</label>
                                <div className="input-wrap height-input-wrap">
                                    <div className="height-input">
                                        <input type="text" name="" placeholder="" />
                                        <label>FT</label>
                                    </div>
                                    <div className="height-input">
                                        <input type="text" name="" placeholder="" />
                                        <label>IN</label>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="form-div">
                                <label>Weight</label>
                                <div className="input-wrap weight-wrap">
                                    <input type="text" name="" placeholder="" />
                                    <label>KG</label>
                                </div>
                            </div>
                        </li>
                    </ul>
                </form>
            </div>
            <div className="stepbox-b">
                <a href="" className="back-btn">
                    <i className="icon-skip_previous"></i>
                    <span>Back</span>
                </a>
                <a href="" className="continues-btn">
                    <span>Continues</span>
                    <i className="icon-skip_next"></i>
                </a>
            </div>
        </div>        
    );
};
export default reduxForm({
    form: 'wizard', //                 <------ same form name
    destroyOnUnmount: false, //        <------ preserve form data
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    validate,
})(WizardFormFourthPage);
