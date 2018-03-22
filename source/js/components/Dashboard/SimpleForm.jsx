import React,{Component} from 'react';
import {connect} from 'react-redux';
import { Field, reduxForm } from 'redux-form';

class MyCustomInput extends Component {
    render() {
        const { value, onChange,input } = this.props
        return (
            <li>
                <div className="custom_checkbox">	
                    <input className="chk_user_role" type="checkbox" name="user_role" value="personal" id="personal" {...input}  />
                    <label htmlFor="personal"><i className="icon-pie_chart"></i><big>Graph</big></label>
                </div>
            </li>
        )
    }
}

let SimpleForm = props => {
    const { handleSubmit, pristine, reset, submitting,allWidgets } = props;
    
    console.log(allWidgets);

    return (
            <form onSubmit={handleSubmit}>
                <ul>
                    <li>
                        <div className="custom_checkbox">
                            <Field component="input" className="chk_user_role" type="checkbox" name="totalWorkOut" 
                                   value="totalWorkOut" id="totalWorkOut"  />
                            <label htmlFor="totalWorkOut"><i className="icon-pie_chart"></i><big>total work out</big></label>
                        </div>
                    </li>

                    <li>
                        <div className="custom_checkbox">	
                            <Field component="input" className="chk_user_role" type="checkbox" name="goalProgress" value="goalProgress" id="goalProgress" />
                            <label htmlFor="goalProgress"><i className="icon-donut_large"></i><big>Goal Progress</big></label>
                        </div>
                    </li>
                    <li>
                        <div className="custom_checkbox">	
                            <Field component="input" className="chk_user_role" type="checkbox" name="badges" value="badges" id="badges" />
                            <label htmlFor="badges"><i className="icon-security"></i><big>Badges</big></label>
                        </div>
                    </li>
                    <li>
                        <div className="custom_checkbox">	
                            <Field component="input" className="chk_user_role" type="checkbox" name="user_role" value="personal3" id="personal3" />
                            <label htmlFor="personal3"><i className="icon-photo_library "></i><big>Progress</big></label>
                        </div>
                    </li>
                    <li>
                        <div className="custom_checkbox">	
                            <Field component="input" className="chk_user_role" type="checkbox" name="user_role" value="personal4" id="personal4" />
                            <label htmlFor="personal4"><i className="icon-av_timer"></i><big>Goal</big></label>
                        </div>
                    </li>
                    <li>
                        <div className="custom_checkbox">	
                            <Field component="input" className="chk_user_role" type="checkbox" name="user_role" value="personal5" id="personal5" />
                            <label htmlFor="personal5"><i className="icon-photo"></i><big>Gallery</big></label>
                        </div>
                    </li>
                    <li>
                        <button type="submit" >Submit</button>
                        <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
                    </li>
                </ul>
            </form>
    );
};


SimpleForm = reduxForm({
    form: 'simple', // a unique identifier for this form
})(SimpleForm);

SimpleForm = connect(
    state =>({
        initialValues:{
                        totalWorkOut: state.dashboardnew.get('allWidgets').todayWorkOut,
                        goalProgress:state.dashboardnew.get('allWidgets').goalProgress,
                        badges:state.dashboardnew.get('allWidgets').badges
                    }
    })
)(SimpleForm);

export default SimpleForm;
