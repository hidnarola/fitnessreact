import React, { Component, Fragment } from 'react';
import ContentEditable from 'react-contenteditable';

class ContentEditableTextarea extends Component {
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
                    onChange={(e) => onChange(e.target.value)}
                    tagName='div'
                    {...fieldProps}
                />
            </Fragment>
        );
    }
}

export default ContentEditableTextarea;