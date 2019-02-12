import React, { Component, Fragment } from 'react';
import ContentEditable from 'react-contenteditable';

class ContentEditableTextbox extends Component {
    constructor(props) {
        super(props);
        this.contentEditable = React.createRef();
    }

    render() {
        const { html, onChange, fieldProps } = this.props;
        return (
            <Fragment>
                <ContentEditable
                    innerRef={this.contentEditable}
                    html={html}
                    disabled={false}
                    onChange={(e) => onChange(e.target.value, e)}
                    tagName='div'
                    {...fieldProps}
                />
            </Fragment>
        );
    }

    focus = () => {
        this.contentEditable.current.focus();
    }
}

export default ContentEditableTextbox;