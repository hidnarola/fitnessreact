import React, { Component } from "react";
import cns from "classnames";

export default class LikeButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLikedByLoggedUser: false
        }
    }

    componentWillMount() {
        const { isLikedByLoggedUser } = this.props;
        if (isLikedByLoggedUser !== this.state.isLikedByLoggedUser) {
            this.setState({ isLikedByLoggedUser });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.isLikedByLoggedUser !== nextProps.isLikedByLoggedUser) {
            this.setState({ isLikedByLoggedUser: nextProps.isLikedByLoggedUser });
        }
    }


    render() {
        const {
            isLikedByLoggedUser,
        } = this.state;
        return (
            <a
                href="javascript:void(0)"
                className={cns('icon-thumb_up', { 'liked-color': isLikedByLoggedUser })}
                onClick={this.handleClick}
            >
            </a>
        );
    }

    handleClick = () => {
        const {
            index,
            postId,
            handleToggleLike,
        } = this.props;
        this.setState({ isLikedByLoggedUser: !this.state.isLikedByLoggedUser });
        handleToggleLike(index, postId);
    }
}