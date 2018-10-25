import React from "react";
import { Modal } from 'react-bootstrap';
import { Scrollbars } from 'react-custom-scrollbars';
import { Link } from "react-router-dom";
import { routeCodes } from "../../constants/routes";
import noProfileImg from 'img/common/no-profile-img.png';

const LikesListModal = (props) => {
    return (
        <div className="likes-list-modal-wrapper">
            <Modal show={props.show} bsSize="small" className="progress-popup likes-list">
                <div className="progress-popup-head">
                    <button type="button" className="close-round" onClick={props.handleClose}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h3 className="title-h3 mb-10">{props.title ? props.title : 'Likes'}</h3>
                </div>

                <div className="progress-popup-body">
                    {props.likes && props.likes.length > 0 &&

                        <Scrollbars autoHide style={{ height: 400 }}>
                            <ul className="common-ul likes-ul">
                                {
                                    props.likes.map((o, i) => (
                                        <li key={(o._id) ? o._id : i}>
                                            <Link className="Menu-link" to={`${routeCodes.PROFILE}/${o.username}`}>
                                                <span>
                                                    <img
                                                        src={o.avatar}
                                                        className="avatar"
                                                        alt="Avatar"
                                                        onError={(e) => {
                                                            e.target.src = noProfileImg
                                                        }}
                                                    />
                                                </span>
                                                {o.firstName} {o.lastName ? o.lastName : ''}
                                            </Link>
                                        </li>
                                    ))
                                }
                            </ul>
                        </Scrollbars>
                    }
                </div>
            </Modal>
        </div>
    );
}

export default LikesListModal;