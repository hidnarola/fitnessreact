import React from 'react';

const ProfilePhotoBlock = (props) => {
    const { image, caption } = props;
    return (
        <div className="profile-list">
            <span>
                <a href="">
                    <img src={image} alt="" />
                </a>
            </span>
            {caption &&
                <h4>
                    <a href="">{caption}</a>
                </h4>
            }
        </div>
    );
}

export default ProfilePhotoBlock;