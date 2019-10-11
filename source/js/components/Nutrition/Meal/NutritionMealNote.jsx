import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';

class NutritionMealNote extends Component {
  constructor(props) {
    super(props);
    this.state = { notes: [{ note: EditorState.createEmpty() }] };
  }
  onEditorStateChange = (editor, index) => {
    let { notes } = this.state;
    notes[index].note = editor;
    this.setState({ notes });
    this.props.handleChangeNotes(notes);
  };
  handleAddNewNote = () => {
    let { notes } = this.state;
    notes.push({ note: EditorState.createEmpty() });
    this.setState({ notes });
  };
  render() {
    const { notes } = this.state;
    return (
      <React.Fragment>
        <div className="exercise-tabs instructions ">
          {notes.map((item, index) => (
            <div className="excercise-boxs" key={index}>
              <div className="excercise-number">
                <span>{index + 1}.</span>
              </div>
              <div className="excercise-right">
                <div className="excercise-content  animated fadeIn">
                  <div className="row no-gutters">
                    <div className="col-xs-12 col-lg-12">
                      <div>
                        <Editor
                          editorState={item.note}
                          wrapperClassName="demo-wrapper"
                          editorClassName="demo-editor form-control draftbox"
                          onEditorStateChange={editstate =>
                            this.onEditorStateChange(editstate, index)
                          }
                          placeholder="Please Enter Notes Here..."
                          toolbar={{
                            options: ['history', 'inline', 'list'],
                            inline: {
                              options: ['bold', 'italic', 'underline'],
                            },
                            list: {
                              options: ['unordered', 'ordered'],
                            },
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <button
            className="addnote btn"
            type="button"
            onClick={() => this.handleAddNewNote()}
          >
            <FontAwesomeIcon icon="plus" /> Add Step
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default NutritionMealNote;
