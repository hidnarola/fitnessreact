import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import _ from 'lodash';
import { capitalizeFirstLetter } from '../../helpers/funs';

class NutritionTrackModal extends Component {
    render() {
        const { show, handleYes, handleClose, nutritions, nutritionTrackList, handleNutritionTrackSelect } = this.props;
        return (
            <div className="nutrition-track-modal-wrapper">
                <Modal show={show} className="nutrition-track-options-modal">
                    <div className="nutrition-track-options-modal-head">
                        <button type="button" className="close-round" onClick={handleClose}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h3 className="title-h3">Nutritions to track</h3>
                    </div>

                    <div className="nutrition-track-options-modal-body">
                        <div className="col-md-12 no-padding pull-left">
                            {nutritions && nutritions.length > 0 &&
                                nutritions.map((obj) => {
                                    var index = _.indexOf(nutritionTrackList, obj._id);
                                    var isChecked = (index >= 0) ? true : false;
                                    return (
                                        <div className="pull-left custom_check" key={obj._id} onClick={() => handleNutritionTrackSelect(obj._id)}>
                                            <input
                                                type="checkbox"
                                                id={`modal_${obj._id}`}
                                                name={`modal_${obj._id}`}
                                                checked={isChecked}
                                                value={obj._id}
                                            />
                                            <label>{capitalizeFirstLetter(obj.name)}</label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="col-md-12 no-padding clear-both">
                            <div className="nutrition-track-options-modal-submit">
                                <button type="button" onClick={handleYes}>Save</button>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default NutritionTrackModal;