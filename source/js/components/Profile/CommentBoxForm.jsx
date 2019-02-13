import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

class CommentBoxForm extends Component {
    render() {
        const { handleSubmit, postId, commentLoading, commentBoxRef } = this.props;
        return (
            <div className="post-comment-box-form-wrapper">
                <form onSubmit={handleSubmit}>
                    <div className="row no-margin">
                        <Field
                            name={`comment_${postId}`}
                            wrapperClass="comment-form-box"
                            className="form-control"
                            placeholder="Comment"
                            component={CommentBoxField}
                            commentLoading={commentLoading}
                            commentBoxRef={commentBoxRef}
                        />
                    </div>
                </form>
            </div>
        );
    }
}

CommentBoxForm = reduxForm({
    form: 'commentBoxForm'
})(CommentBoxForm);

const mapStateToProps = (state) => {
    const { postComments } = state;
    return {
        commentLoading: postComments.get('loading'),
    };
}

export default connect(
    mapStateToProps,
)(CommentBoxForm);

class CommentBoxField extends Component {
    render() {
        const { input, meta, wrapperClass, className, placeholder, errorClass, commentLoading, commentBoxRef } = this.props;
        return (
            <div
                className={
                    `${wrapperClass} ${(meta.submitFailed && meta.error) ? 'has-error' : ''}`
                }
            >
                <textarea
                    {...input}
                    className={className}
                    placeholder={placeholder}
                    ref={commentBoxRef}
                />
                <button type="submit" disabled={commentLoading}>
                    <i className="icon-send"></i>
                </button>
                {meta.submitFailed &&
                    ((meta.error && <div className={errorClass}>{meta.error}</div>) || (meta.warning && <span className={warningClass}>{meta.warning}</span>))
                }
            </div>
        );
    }
}