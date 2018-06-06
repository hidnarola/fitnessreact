import React, { Component } from 'react';
import Cropper from "react-cropper";
import Dropzone from "react-dropzone";

class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
            croppedImg: null,
        }
    }

    cropImg = () => {
        this.setState({ croppedImg: this.refs.cropper.getCroppedCanvas().toDataURL() });
    }

    render() {
        return (
            <div>
                {this.state.image &&
                    // <img src={this.state.image[0].preview} />
                    <Cropper
                        ref='cropper'
                        src={this.state.image[0].preview}
                        style={{ width: 500, height: 300 }}
                        viewMode={3}
                        aspectRatio={1}
                        guides={false}
                        autoCropArea={0.8}
                        cropBoxResizable={true}
                        minCropBoxWidth={200}
                        minCropBoxHeight={200}
                    />
                }
                {this.state.croppedImg &&
                    <img src={this.state.croppedImg} />
                }
                <Dropzone
                    name="images"
                    accept={"image/jpeg, image/png, image/jpg, image/gif"}
                    onDrop={(filesToUpload, e) => {
                        this.setState({ image: filesToUpload });
                    }}
                    multiple={false}
                >
                </Dropzone>
                <button type="button" onClick={this.cropImg}>Crop</button>
            </div>
        );
    }
}

export default Test;