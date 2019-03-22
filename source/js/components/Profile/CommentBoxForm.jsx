import React, { Component } from 'react';
import ReactDOMServer from "react-dom/server";
import Emos from '../Common/Emos';
import ContentEditableTextarea from '../Common/ContentEditableTextarea';
import { Emoji } from "emoji-mart";
import { FaSpinner } from 'react-icons/lib/fa';
import { sanitizeEditableContentValue, isOnline, tw } from '../../helpers/funs';

class CommentBoxForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: "",
            buttonLoader: false
        }
        this.commentBoxRef = React.createRef();
        this.emojis = React.createRef();
    }

    render() {
        const { postId, isLoading } = this.props;
        const { comment, buttonLoader } = this.state;
        return (
            <div className="post-comment-box-form-wrapper">
                <form id={`comment-box-form-${postId}`} method="POST" onSubmit={this.handleComment}>
                    <Emos
                        ref={this.emojis}
                        pickerProps={{
                            color: "#ff337f",
                            onClick: this.handleEmoClick,
                            onSelect: this.handleEmoSelect,
                        }}
                        positionClass="top-right"
                        emosWrapClass="emotis-comment-block"
                        emojiBtnSize={16}
                    />

                    <ContentEditableTextarea
                        ref={this.commentBoxRef}
                        fieldProps={{
                            className: "my-comment-textarea",
                            placeholder: "Comment"
                        }}
                        html={comment}
                        onChange={this.handleChange}
                    />
                    {buttonLoader ?
                        <button type="submit" disabled={isLoading}>
                            <FaSpinner className="loader-spinner" />
                        </button>
                        :
                        <button type="submit" disabled={isLoading}>
                            <i className="icon-send"></i>
                        </button>
                    }
                </form>
            </div>
        );
    }

    componentDidUpdate(prevProps, prevState) {
        const { isLoading } = this.props;
        const { buttonLoader } = this.state;
        if (!isLoading && prevProps.isLoading !== isLoading && buttonLoader) {
            this.setState({ buttonLoader: false });
            this.resetComponent();
        }
    }


    handleComment = (e) => {
        e.preventDefault();
        if (isOnline()) {
            const { comment } = this.state;
            const sanitizedComment = sanitizeEditableContentValue(comment);
            if (comment && sanitizedComment && comment.trim() && sanitizedComment.trim()) {
                this.setState({ buttonLoader: true });
                const { handleComment, postId, index } = this.props;
                const data = { comment, postId, index };
                handleComment(data);
            }
        } else {
            tw("You are offline, please check your internet connection");
        }
    }

    handleChange = (value) => {
        const { buttonLoader } = this.state;
        if (!buttonLoader) {
            this.setState({ comment: value });
        } else {
            this.setState((state) => {
                return {
                    comment: state.comment
                }
            });
        }
    }

    handleEmoClick = (emoji, event) => {
        const { buttonLoader } = this.state;
        if (!buttonLoader) {
            const { id } = emoji;
            this.appendDescription(id);
            this.commentBoxRef.current.focus();
        }
    }

    handleEmoSelect = (emoji) => {
        const { buttonLoader } = this.state;
        if (!buttonLoader) {
            const { id } = emoji;
            this.appendDescription(id);
            this.commentBoxRef.current.focus();
        }
    }

    appendDescription = (id) => {
        if (id) {
            const { comment } = this.state;
            const _comment = comment +
                ReactDOMServer.renderToString(<span contentEditable={false} dangerouslySetInnerHTML={{
                    __html: Emoji({ html: true, set: 'emojione', emoji: id, size: 16 })
                }}></span>) +
                ReactDOMServer.renderToString(<span>&nbsp;</span>);
            this.setState({ comment: _comment });
        }
    }

    resetComponent = () => {
        this.setState({ comment: "" });
        this.emojis.current.forceOpenClose(false);
    }

    focus = () => {
        this.commentBoxRef.current.focus();
    }
}

export default CommentBoxForm;