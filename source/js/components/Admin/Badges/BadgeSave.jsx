import React, { Component } from 'react';
import { connect } from 'react-redux';
import BadgeForm from './BadgeForm';
import { TIME_TYPE_TIME_WINDOW } from '../../../constants/consts';
import { badgeAddRequest, badgeUpdateRequest, badgeRestData } from '../../../actions/admin/badges';
import { ts, focusToControl } from '../../../helpers/funs';
import { adminRouteCodes } from '../../../constants/adminRoutes';
import { showPageLoader, hidePageLoader } from '../../../actions/pageLoader';

class BadgeSave extends Component {
    constructor(props) {
        super(props);
        this.state = {
            saveActionInit: false,
        }
    }

    render() {
        return (
            <div className="badge-save-wrapper">
                <div className="body-head space-btm-45 d-flex justify-content-start">
                    <div className="body-head-l">
                        <h2>Badge</h2>
                    </div>
                </div>

                <div className="body-content row d-flex">
                    <div className="col-md-12">
                        <div className="white-box">
                            <div className="whitebox-head">
                                <h3 className="title-h3">Save Badge</h3>
                            </div>
                            <div className="row d-flex whitebox-body">
                                <div className="col-md-12">
                                    <BadgeForm onSubmit={this.handleSubmit} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    componentDidUpdate() {
        const {
            saveActionInit,
        } = this.state;
        const {
            loading,
            error,
            history,
            dispatch,
        } = this.props;
        if (saveActionInit && !loading) {
            this.setState({ saveActionInit: false });
            if (error.length <= 0) {
                ts('Badge saved successfully.');
                history.push(adminRouteCodes.BADGES);
            } else {
                focusToControl('#validation_errors_wrapper');
            }
            dispatch(hidePageLoader());
        }
    }

    componentWillUnmount() {
        const { dispatch } = this.props;
        dispatch(badgeRestData());
    }


    handleSubmit = (data) => {
        const { dispatch, match } = this.props;
        var timeType = data.time_type.value;
        var requestData = {
            // name: data.name,
            // descriptionCompleted: data.completeDescription,
            // descriptionInCompleted: data.incompleteDescription,
            // task: data.task.value,
            // value: data.target,
            // unit: data.unit.value,
            // point: data.points,
            timeType: timeType,
        }
        if (timeType === TIME_TYPE_TIME_WINDOW) {
            requestData.duration = {
                start: data.duration.start,
                end: data.duration.end,
            }
        } else {
            requestData.duration = null;
        }
        this.setState({ saveActionInit: true });
        dispatch(showPageLoader());
        if (typeof match.params.id !== 'undefined') {
            dispatch(badgeUpdateRequest(match.params.id, requestData));
        } else {
            dispatch(badgeAddRequest(requestData));
        }
    }
}

const mapStateToProps = (state) => {
    const { adminBadges } = state;
    return {
        loading: adminBadges.get('loading'),
        error: adminBadges.get('error'),
    };
}

export default connect(mapStateToProps)(BadgeSave);