import React from "react";
import { Modal } from 'react-bootstrap';
import { Scrollbars } from 'react-custom-scrollbars';
import { Link } from "react-router-dom";
import { routeCodes } from "../../constants/routes";
import noProfileImg from 'img/common/no-profile-img.png';
import { FaCircleONotch } from "react-icons/lib/fa";

const UsersListModal = (props) => {
    return (
        <div className="users-list-modal-wrapper">
            <Modal show={props.show} bsSize="small" className="progress-popup users-list">
                <div className="progress-popup-head">
                    <button type="button" className="close-round" onClick={props.handleClose}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h3 className="title-h3 mb-10">{props.title ? props.title : 'Users'}</h3>
                </div>

                {props.loading &&
                    <div className="text-c">
                        <FaCircleONotch className="loader-spinner fs-25" />
                    </div>
                }

                <div className="progress-popup-body">
                    {!props.loading && props.data && props.data.length > 0 &&
                        <Scrollbars autoHide style={{ height: 400 }}>
                            <ul className="common-ul users-ul">
                                {
                                    props.data.map((o, i) => (
                                        <li key={(o._id) ? o._id : i} onClick={props.handleClose}>
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
                    {!props.loading && (!props.data || props.data.length <= 0) &&
                        <ul className="common-ul users-ul">
                            <li>No {props.title ? props.title : 'Users'} found</li>
                        </ul>
                    }
                </div>
            </Modal>
        </div>
    );
}

export default UsersListModal;