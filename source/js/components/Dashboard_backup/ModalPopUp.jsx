import React,{ Component } from 'react';
import {Button,Modal} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Values } from "redux-form-website-template";
import SimpleForm from "./SimpleForm";
import { Field, reduxForm } from 'redux-form';
import { setWidgets } from '../../actions/dashboard';

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
        const { handleSubmit, pristine, reset, submitting, allWidgets } = this.props;

        return (
            <div>    
                <Modal show={this.state.show} onHide={this.handleClose} className="widget-popup">            
                    <Modal.Body>
                        <button type="button" className="close-round" onClick={this.handleClose}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h3 className="title-h3">Add A Widget</h3>
                        <div className="choose-widget">                            
                            <SimpleForm onSubmit={this.showResults1} />
                            <Values form="simple"/>
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