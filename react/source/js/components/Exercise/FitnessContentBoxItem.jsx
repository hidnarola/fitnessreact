import React from 'react';
import FilterContentBoxItemList from './FilterContentBoxItemList';

const FitnessContentBoxItem = (props) => {
    const { title, data } = props;
    return (
        <div className="fitness-wrap">
            <h4>{title}</h4>
            {data &&
                data.map((d, i) => (
                    <FilterContentBoxItemList key={i} data={d} />
                ))
            }
        </div>
    );
}

export default FitnessContentBoxItem;