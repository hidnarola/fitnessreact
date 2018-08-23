import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { changeUserTimelineWidgetsState } from '../../actions/timelineWidgets';

class WidgetsListModal extends Component {
    render() {
        const {
            show,
            handleClose,
            badges,
            progressPhoto,
        } = this.props;
        return (
            <Modal show={show} className="widget-popup timeline-widgets-wrapper">
                <button type="button" onClick={handleClose} className="close-round" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <h3 className="title-h3">Add A Widget</h3>
                <div className="choose-widget">
                    <ul>
                        <li>
                            <button type="button">
                                <div className="choosewidget-box">
                                    <i className="icon-pie_chart"></i>
                                    <big>Graph</big>
                                </div>
                            </button>
                        </li>
                        <li>
                            <button type="button">
                                <div className="choosewidget-box">
                                    <i className="icon-donut_large"></i>
                                    <big>Stats</big>
                                </div>
                            </button>
                        </li>
                        <li>
                            <div className="choosewidget-box">
                                <i className="icon-security"></i>
                                <big>Badges</big>
                            </div>
                            <input type="checkbox" name="badges" id="badges" checked={badges} onChange={this.handleChange} />
                            <label htmlFor="badges"></label>
                        </li>
                        <li>
                            <div className="choosewidget-box">
                                <i className="icon-photo_library "></i>
                                <big>Progress</big>
                            </div>
                            <input type="checkbox" name="progressPhoto" id="progressPhoto" checked={progressPhoto} onChange={this.handleChange} />
                            <label htmlFor="progressPhoto"></label>
                        </li>
                    </ul>
                </div>
            </Modal>
        );
    }

    handleChange = (e) => {
        const { dispatch } = this.props;
        let value = e.target.checked;
        let name = e.target.name;
        dispatch(changeUserTimelineWidgetsState(name, value));
    }
}

const mapStateToProps = (state) => {
    const { timelineWidgets } = state;
    return {
        badges: timelineWidgets.get('badges'),
        progressPhoto: timelineWidgets.get('progressPhoto'),
        stats: timelineWidgets.get('stats'),
        graph: timelineWidgets.get('graph'),
    };
}

export default connect(
    mapStateToProps,
)(WidgetsListModal);