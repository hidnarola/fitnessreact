import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import _ from 'lodash';

class NutritionTrackModal extends Component {
    render() {
        const { show, handleYes, handleClose, nutritions, nutritionTrackList, handleNutritionTrackSelect } = this.props;
        return (
            <div className="delete-confirmation-wrapper">
                <Modal show={show}>
                    <Modal.Header>
                        <Modal.Title>Nutritions to track</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        {nutritions && nutritions.length > 0 &&
                            nutritions.map((obj) => {
                                var index = _.indexOf(nutritionTrackList, obj._id);
                                var isChecked = (index >= 0) ? true : false;
                                return (
                                    <div key={obj._id}>
                                        <input
                                            type="checkbox"
                                            id={`modal_${obj._id}`}
                                            name={`modal_${obj._id}`}
                                            onChange={handleNutritionTrackSelect}
                                            checked={isChecked}
                                            value={obj._id}
                                        />
                                        {obj.name}
                                    </div>
                                )
                            })
                        }
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={handleClose}>No</Button>
                        <Button bsStyle="warning" onClick={handleYes}>Yes</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default NutritionTrackModal;