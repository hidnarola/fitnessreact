import React, { Component } from "react";
import BodyViewSidebar from "./BodyViewSidebar";
import BodyViewContent from "./BodyViewContent";

class BodyView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSidebarTab: "neck"
    };
  }
  render() {
    const { activeSidebarTab } = this.state;
    return (
      <React.Fragment>
        <div className="body-content exerciseview bodyview">
          <div className="whitebox-body exerciseview-body">
            <div className="row no-gutters h-100">
              <div className="col-xs-12 col-md-3">
                <BodyViewSidebar
                  handleChangeSidebarTab={this.handleChangeSidebarTab}
                  activeSidebarTab={activeSidebarTab}
                />
              </div>
              <div className="col-xs-12 col-md-9">
                <BodyViewContent activeSidebarTab={activeSidebarTab} />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
  handleChangeSidebarTab = tab => {
    this.setState({ activeSidebarTab: tab });
  };
}

export default BodyView;
