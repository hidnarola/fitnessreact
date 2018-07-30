import React, { Component } from 'react';
import SweetAlert from "react-bootstrap-sweetalert";

class WorkoutAdvanceViewSwitch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAlertWhileSwitchToNormalView: false,
        }
    }

    render() {
        const {
            id,
            input,
            checked,
            tabIndex,
        } = this.props;
        const { showAlertWhileSwitchToNormalView } = this.state;
        return (
            <div className="switch-wrap">
                <small>Advance View</small>
                <div className="material-switch">
                    <input
                        {...input}
                        id={id}
                        name={input.name}
                        type="checkbox"
                        checked={(checked) ? checked : false}
                        onChange={this.handleChange}
                        tabIndex={(tabIndex) ? tabIndex : ''}
                    />
                    <label htmlFor={id} className="label-default"></label>
                </div>
                <SweetAlert
                    show={showAlertWhileSwitchToNormalView}
                    warning
                    showCancel
                    confirmBtnText="Yes, change it!"
                    confirmBtnBsStyle="danger"
                    cancelBtnBsStyle="default"
                    title="Are you sure?"
                    onConfirm={this.handleAlertWhileSwitchToNormalView}
                    onCancel={this.handleCloseAlertWhileSwitchToNormalView}
                >
                    You will loss the changes and not be able to recover!
                </SweetAlert>
            </div>
        );
    }

    handleChange = (e) => {
        const { input } = this.props;
        if (!e.target.checked) {
            this.setState({ showAlertWhileSwitchToNormalView: true });
        } else {
            input.onChange(e.target.checked);
        }
    }

    handleCloseAlertWhileSwitchToNormalView = () => {
        this.setState({ showAlertWhileSwitchToNormalView: false });
    }

    handleAlertWhileSwitchToNormalView = () => {
        const { input } = this.props;
        input.onChange(false);
        this.setState({ showAlertWhileSwitchToNormalView: false });
    }
}

export default WorkoutAdvanceViewSwitch;
