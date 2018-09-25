import React, { Component } from 'react';
import { connect } from 'react-redux';
import BadgeForm from './BadgeForm';
import { TIME_TYPE_TIME_WINDOW } from '../../../constants/consts';
import { badgeAddRequest, badgeUpdateRequest, badgeRestData } from '../../../actions/admin/badges';
import { ts, focusToControl } from '../../../helpers/funs';
import { adminRouteCodes } from '../../../constants/adminRoutes';
import { showPageLoader, hidePageLoader } from '../../../actions/pageLoader';
import { Alert } from "react-bootstrap";

class BadgeSave extends Component {
    constructor(props) {
        super(props);
        this.state = {
            saveActionInit: false,
        }
    }

    render() {
        const { error } = this.props;
        return (
            <div className="badge-save-wrapper">
                <div className="body-content row d-flex">
                    <div className="col-md-12">
                        <div className="white-box">
                            <div className="whitebox-head">
                                <h3 className="title-h3">Save Badge</h3>
                            </div>
                            <div className="row d-flex whitebox-body">
                                <div className="col-md-12 validation_errors_wrapper">
                                    {error && error.length > 0 &&
                                        <Alert bsStyle="danger">
                                            {
                                                error.map((e, i) => {
                                                    return <p key={i}>{e}</p>
                                                })
                                            }
                                        </Alert>
                                    }
                                </div>
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
                focusToControl('.validation_errors_wrapper');
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
        var timeType = (data.time_type) ? data.time_type.value : '';
        var requestData = {
            name: data.name,
            descriptionCompleted: data.completeDescription,
            descriptionInCompleted: data.incompleteDescription,
            task: (data.task) ? data.task.value : '',
            value: data.target,
            unit: (data.unit) ? data.unit.value : '',
            point: data.points,
            timeType: timeType,
            status: (data.status) ? data.status.value : null,
        }
        if (timeType === TIME_TYPE_TIME_WINDOW) {
            requestData.duration = data.duration;
            requestData.timeWindowType = (data.time_window_type) ? data.time_window_type.value : '';
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