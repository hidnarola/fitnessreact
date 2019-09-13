import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';

class CalendarDayNoteList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    };
  }
  onEditorStateChange: Function = editorState => {
    this.setState({
      editorState,
    });
  };
  render() {
    const { editorState } = this.state;
    return (
      <React.Fragment>
        <h3>Notes</h3>
        <div className="excercise-boxs">
          <div className="excercise-number">
            <span>1.</span>
          </div>
          <div className="excercise-right">
            <div className="excercise-content  animated fadeIn">
              <div className="row no-gutters">
                <div className="col-xs-12 col-lg-12">
                  <div>
                    <Editor
                      editorState={editorState}
                      wrapperClassName="demo-wrapper"
                      editorClassName="demo-editor form-control draftbox"
                      onEditorStateChange={this.onEditorStateChange}
                      placeholder="Please Enter Notes Here..."
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button className="addnote btn">
          <FontAwesomeIcon icon="plus" /> Add Note
        </button>
      </React.Fragment>
    );
  }
}

export default CalendarDayNoteList;
