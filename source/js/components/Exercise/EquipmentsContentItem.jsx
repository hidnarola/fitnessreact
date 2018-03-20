import React from 'react';

const EquipmentsContentItem = (props) => {
    const { data } = props;
    if (data) {
        return (
            <div className={"machine-box " + ((data.isActive === true) ? "active" : "")}>
                <span>
                    <img src={data.imageUrl} alt="" />
                </span>
                <h4>{data.title}</h4>
                <h6>
                    <i className="icon-check"></i>
                </h6>
            </div>
        );
    }
    return null;
}

export default EquipmentsContentItem;