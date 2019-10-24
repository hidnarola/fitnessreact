import React, { Component } from "react";
import BadgesCard from "./BadgesCard";
import CSSTransition from "react-transition-group/CSSTransition";

const cssTransitionProps = {
  timeout: 450,
  className: "col-xs-12 col-md-4 animated",
  classNames: {
    enter: "fadeIn",
    exit: "fadeOut"
  },
  unmountOnExit: true
};

class BadgesContent extends Component {
  render() {
    const { badgesList = [], selectedViewList } = this.props;
    return (
      <React.Fragment>
        <div className="exercise-content">
          <div className="content-title">
            <h3>Badges</h3>
          </div>
          <div className="content-badges p-2" style={{ borderRadius: "5px" }}>
            <div className="row no-gutters">
              {badgesList.length > 0 ? (
                badgesList.map((badge, index) => {
                  return badge.badges.map((item, k) => (
                    <React.Fragment key={k}>
                      {selectedViewList === "all" && (
                        <CSSTransition
                          in={badge.checked}
                          {...cssTransitionProps}
                        >
                          <div key={`badge${index}${k}`}>
                            <BadgesCard badges={item} />
                          </div>
                        </CSSTransition>
                      )}
                      {selectedViewList === "completed" &&
                        item.isCompleted === 1 && (
                          <CSSTransition
                            in={badge.checked}
                            {...cssTransitionProps}
                          >
                            <div key={`badge${index}${k}`}>
                              <BadgesCard badges={item} />
                            </div>
                          </CSSTransition>
                        )}
                      {selectedViewList === "inCompleted" &&
                        item.isCompleted === 0 && (
                          <CSSTransition
                            in={badge.checked}
                            {...cssTransitionProps}
                          >
                            <div key={`badge${index}${k}`}>
                              <BadgesCard badges={item} />
                            </div>
                          </CSSTransition>
                        )}
                    </React.Fragment>
                  ));
                })
              ) : (
                <div className="col-md-12">
                  <div className="badges-card">
                    <div className="badges-title">No Records Found</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default BadgesContent;
