import React,{ Component } from 'react';
import {Button,Modal} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Values } from "redux-form-website-template";
import SimpleForm from "./SimpleForm";

class ModalPopUp extends Component {
    constructor(props, context) {
        super(props, context);  
        // this.props.func(this, 1234);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.state = {
            show: false
        };
    }
    
    componentDidMount() {
        this.props.onRef(this)
    }

    componentWillUnmount() {
        this.props.onRef(undefined)
    }
  
    handleClose() {
        this.setState({ show: false });
    }
  
    handleShow() {
        this.setState({ show: true });
    }

    showResults1(values) {
        window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
    }

    render() {      
  
        return (
            <div>    
                <Modal show={this.state.show} onHide={this.handleClose} className="widget-popup">            
                    <Modal.Body>
                        <button type="button" className="close-round" onClick={this.handleClose}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h3 className="title-h3">Add A Widget</h3>
                        <div className="choose-widget">
                            <ul>
                                <SimpleForm onSubmit={this.showResults1}/>
                                <Values form="simple" />
                                <li>
                                    <div className="custom_checkbox">	
                                        <input type="checkbox" name="user_role" value="personal" id="personal" className="chk_user_role"/>
                                        <label htmlFor="personal"><i className="icon-pie_chart"></i><big>Graph</big></label>
                                    </div>
                                </li>
                                <li>
                                     <div className="custom_checkbox">	
                                        <input type="checkbox" name="user_role" value="personal1" id="personal1" className="chk_user_role"/>
                                        <label htmlFor="personal1"><i className="icon-donut_large"></i><big>Stats</big></label>
                                    </div>
                                </li>
                                <li>
                                     <div className="custom_checkbox">	
                                        <input type="checkbox" name="user_role" value="personal2" id="personal2" className="chk_user_role"/>
                                        <label htmlFor="personal2"><i className="icon-security"></i><big>Badges</big></label>
                                    </div>
                                </li>
                                <li>
                                    <div className="custom_checkbox">	
                                        <input type="checkbox" name="user_role" value="personal3" id="personal3" className="chk_user_role"/>
                                        <label htmlFor="personal3"><i className="icon-photo_library "></i><big>Progress</big></label>
                                    </div>
                                </li>
                                <li>
                                    <div className="custom_checkbox">	
                                        <input type="checkbox" name="user_role" value="personal4" id="personal4" className="chk_user_role"/>
                                        <label htmlFor="personal4"><i className="icon-av_timer"></i><big>Goal</big></label>
                                    </div>
                                </li>
                                <li>
                                    <div className="custom_checkbox">	
                                        <input type="checkbox" name="user_role" value="personal5" id="personal5" className="chk_user_role"/>
                                        <label htmlFor="personal5"><i className="icon-photo"></i><big>Gallery</big></label>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </Modal.Body>                
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    error: state.dashboardnew.get('error'),
    loading: state.dashboardnew.get('loading'),
    allWidgets:state.dashboardnew.get('allWidgets'),
    dashboardData: state.dashboardnew.get('dashboardData'),
})

export default connect(mapStateToProps)(ModalPopUp);