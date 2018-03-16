import React from 'react';

const FilterContentBoxItemList = (props) => {
    const { data } = props;
    if (data) {
        return (
            <div className="fitness-test-box dropdown">
                <div className="fitness-test" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                    <a href="">
                        <i className="icon-play_arrow"></i>
                    </a>
                    <h5>{data.title}</h5>
                    <span>
                        <img src={data.imageUrl} alt="" />
                    </span>
                </div>
            </div>
        );
    }
    return null;
}

export default FilterContentBoxItemList;