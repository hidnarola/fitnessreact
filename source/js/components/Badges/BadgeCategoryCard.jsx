import React, { Component } from 'react';
import BadgeCategoryIndividualCard from './BadgeCategoryIndividualCard';

class BadgeCategoryCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showBadges: false,
        }
    }

    render() {
        const { badge } = this.props;
        const { showBadges } = this.state;
        if (badge) {
            return (
                <div className="col-md-4 mb-20">
                    <div className="white-box">
                        <div className="whitebox-head d-flex badge-category-card">
                            <h3 className="title-h3">{(badge.category) ? (badge.category).replace('_', ' ') : 'Badge'}</h3>
                            <a href="javascript:void(0)" onClick={() => this.setState({ showBadges: !showBadges })}>
                                {typeof showBadges !== 'undefined' && showBadges &&
                                    <i className="icon-arrow_drop_down"></i>
                                }
                                {typeof showBadges !== 'undefined' && !showBadges &&
                                    <i className="icon-arrow_drop_up"></i>
                                }
                            </a>
                        </div>
                        {typeof showBadges !== 'undefined' && showBadges &&
                            <div className="whitebox-body">
                                {
                                    badge.badges.map((badge, index) => {
                                        return (
                                            <BadgeCategoryIndividualCard
                                                key={index}
                                                badge={badge}
                                            />
                                        );
                                    })
                                }
                            </div>
                        }
                    </div>
                </div>
            );
        }
        return null;
    }
}

export default BadgeCategoryCard;