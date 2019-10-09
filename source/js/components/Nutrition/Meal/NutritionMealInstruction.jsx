import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';

class NutritionMealInstruction extends Component {
  constructor(props) {
    super(props);
    this.state = { instructions: [{ instruction: EditorState.createEmpty() }] };
  }
  onEditorStateChange = (editor, index) => {
    const { instructions } = this.state;
    instructions[index].instruction = editor;
    this.setState({ instructions });
    this.props.handleChangeInstructions(instructions);
  };
  componentDidMount() {
    // let { instructions } = this.props;
    // instructions &&
    //   instructions.forEach((item, index) => {
    //     const html = item.instruction;
    //     const contentBlock = htmlToDraft(html);
    //     if (contentBlock) {
    //       const contentState = ContentState.createFromBlockArray(
    //         contentBlock.contentBlocks,
    //       );
    //       const editorState = EditorState.createWithContent(contentState);
    //       instructions[index].instruction = editorState;
    //     }
    //   });
    // this.setState({ instructions });
    // instructions[0] = instructions[0].instruction.createFromBlockArray(
    //   '<p>hello</p>',
    // );
    // this.setState({ instructions });
  }

  handleAddNewInst = () => {
    let { instructions } = this.state;
    instructions.push({ instruction: EditorState.createEmpty() });
    this.setState({ instructions });
  };
  render() {
    const { instructions } = this.state;

    return (
      <React.Fragment>
        <div className="exercise-tabs instructions ">
          {instructions.map((item, index) => (
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
                          editorState={item.instruction}
                          wrapperClassName="demo-wrapper"
                          editorClassName="demo-editor form-control draftbox"
                          onEditorStateChange={editor =>
                            this.onEditorStateChange(editor, index)
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
            type="button"
            className="addnote btn"
            onClick={() => this.handleAddNewInst()}
          >
            <FontAwesomeIcon icon="plus" /> Add Step
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default connect()(NutritionMealInstruction);
