import React, { Component } from 'react';
import { connect } from 'react-redux';
import FitnessHeader from '../components/global/FitnessHeader';
import FitnessNav from '../components/global/FitnessNav';
import UpdateProfileForm from '../components/Profile/UpdateProfileForm';
import { submit } from 'redux-form';
import { Alert } from "react-bootstrap";
import { isOnline, tw } from '../helpers/funs';

class UpdateProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            saveActionInit: false,
        }
    }

    render() {
        const { saveActionInit } = this.state;
        const { profileError } = this.props;
        return (
            <div className='stat-page'>
                <FitnessHeader />
                <FitnessNav />
                <section className="body-wrap">
                    <div className="body-head d-flex justify-content-start front-white-header">
                        <div className="body-head-l">
                            <h2>Update Profile</h2>
                            <p>Your goal choice shapes how your fitness assistant will ceate your meal and exercise plans, it’s important that you set goals which are achieveable. Keep updating your profile and your fitness assistant will keep you on track and meeting the goals you’ve set out for yourself.</p>
                        </div>
                        <div className="body-head-r">
                            <a href="javascript:void(0)" onClick={this.userOfflineMessage} className="pink-btn">Update Changes <i className="icon-restore"></i></a>
                        </div>
                    </div>
                    <div className="body-content row prefferences d-flex">
                        <div className="col-md-12 validation_errors_wrapper">
                            {profileError && profileError.length > 0 &&
                                <Alert bsStyle="danger">
                                    {profileError.map((o, i) => <p key={i}>{o}</p>)}
                                </Alert>
                            }
                        </div>
                        <UpdateProfileForm
                            saveActionInit={saveActionInit}
                            handleSaveActionFlag={this.handleSaveActionFlag}
                        />
                    </div>
                </section>
            </div>
        );
    }

    componentDidMount() {
        // change title 
        document.title = "Update Profile";
    }


    userOfflineMessage = (e) => {
        if (isOnline()) {
            this.handleSave()
        }
        else {
            e.preventDefault();
            tw("You are offline, please check your internet connection");
        }
    }

    handleSave = () => {
        const { dispatch } = this.props;
        dispatch(submit('update_profile_details_form'));
    }

    handleSaveActionFlag = (flag) => {
        this.setState({ saveActionInit: flag });
    }
}

const mapStateToProps = (state) => {
    const { profile } = state;
    return {
        profileError: profile.get('error'),
    };
}

export default connect(
    mapStateToProps,
)(UpdateProfile);