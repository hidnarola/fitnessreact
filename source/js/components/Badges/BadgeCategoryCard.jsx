import React, { Component } from 'react';
import BadgeCategoryIndividualCard from './BadgeCategoryIndividualCard';
import _ from "lodash";
import cns from "classnames";
import {
    BADGE_CAT_PROFILE,
    BADGE_CAT_BODY_MASS,
    BADGE_CAT_BODY_FAT,
    BADGE_CAT_BODY_MEASUREMENT,
    BADGE_CAT_WEIGHT_LIFTED,
    BADGE_CAT_WORKOUTS,
    BADGE_CAT_RUNNING,
    BADGE_CAT_HEART_RATE,
    BADGE_CAT_CYCLE,
    BADGE_CAT_STEPS,
    BADGE_CAT_CALORIES,
    BADGE_CAT_NUTRITIONS
} from '../../constants/consts';

const badgeCategoryIcons = [
    { cat: BADGE_CAT_PROFILE, icon: 'icon-account_circle' },
    { cat: BADGE_CAT_BODY_MASS, icon: 'icon-import_export' },
    { cat: BADGE_CAT_BODY_FAT, icon: 'icon-accessibility' },
    { cat: BADGE_CAT_BODY_MEASUREMENT, icon: 'icon-straighten' },
    { cat: BADGE_CAT_WEIGHT_LIFTED, icon: 'icon-fitness_center' },
    { cat: BADGE_CAT_WORKOUTS, icon: 'icon-insert_invitation' },
    { cat: BADGE_CAT_RUNNING, icon: 'icon-directions_run' },
    { cat: BADGE_CAT_HEART_RATE, icon: 'icon-favorite' },
    { cat: BADGE_CAT_CYCLE, icon: 'icon-directions_bike' },
    { cat: BADGE_CAT_STEPS, icon: 'icon-directions_walk' },
    { cat: BADGE_CAT_CALORIES, icon: 'icon-whatshot' },
    { cat: BADGE_CAT_NUTRITIONS, icon: 'icon-restaurant' },
];

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
            var countBy = _.countBy(badge.badges, (o) => o.isCompleted);
            var totalCompleted = (countBy && countBy[1]) ? countBy[1] : 0;
            var selectedCat = _.find(badgeCategoryIcons, ['cat', badge.category]);
            var catIcon = (selectedCat && selectedCat.icon) ? selectedCat.icon : 'icon-turned_in';
            return (
                <div className="col-md-4 mb-20">
                    <div className="white-box">
                        <div className="whitebox-head d-flex badge-category-card cursor-pointer mb-10" onClick={() => this.setState({ showBadges: !showBadges })}>
                            <span className="icon-with-circle-left color-white gradient-color-1">
                                <i className={cns(catIcon, 'ml-5')}></i>
                            </span>
                            <h3 className="title-h3">{(badge.category) ? (badge.category).replace('_', ' ') : 'Badge'}</h3>
                            <a href="javascript:void(0)">
                                {typeof showBadges !== 'undefined' && showBadges &&
                                    <i className="icon-keyboard_arrow_down color-black"></i>
                                }
                                {typeof showBadges !== 'undefined' && !showBadges &&
                                    <i className="icon-navigate_next color-black"></i>
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
                        {typeof badge.badges !== 'undefined' && badge.badges && badge.badges.length > 0 &&
                            <h5>{`Achieved : ${totalCompleted} out of ${badge.badges.length}`}</h5>
                        }
                    </div>
                </div>
            );
        }
        return null;
    }
}

export default BadgeCategoryCard;