import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

class CommentBoxForm extends Component {
    render() {
        const { handleSubmit, postId } = this.props;
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
    return {

    };
}

export default connect(
    mapStateToProps,
)(CommentBoxForm);

const CommentBoxField = (props) => {
    const { input, meta, wrapperClass, className, labelClass, placeholder, errorClass } = props;
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
            />
            <button type="submit">
                <i className="icon-send"></i>
            </button>
            {meta.submitFailed &&
                ((meta.error && <div className={errorClass}>{meta.error}</div>) || (meta.warning && <span className={warningClass}>{meta.warning}</span>))
            }
        </div>
    );
}