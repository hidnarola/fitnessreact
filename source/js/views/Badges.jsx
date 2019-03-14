import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { routeCodes } from 'constants/routes';
import { setUserBadgesByType } from '../actions/userBadges';
import FitnessHeader from 'components/global/FitnessHeader';
import FitnessNav from 'components/global/FitnessNav';
import Complete from 'components/Badges/Complete';
import InComplete from 'components/Badges/InComplete';
import Tracking from 'components/Badges/Tracking';
import { IDB_TBL_BADGES, IDB_READ_WRITE } from '../constants/idb';
import { connectIDB, isOnline } from '../helpers/funs';

class Badges extends Component {

    componentWillMount() {
        const { match, history } = this.props;
        if (match.isExact) {
            history.push(routeCodes.BADGESTRACKING);
        }
    }

    render() {
        return (
            <div className='stat-page'>
                <FitnessHeader />
                <FitnessNav />
                <section className="body-wrap">
                    <div className="body-head space-btm-45 d-flex justify-content-start front-white-header with-tabs">
                        <div className="body-head-l ">
                            <h2>Badges</h2>
                        </div>
                    </div>

                    <div className="body-head-l-btm profile-new-menu">
                        <NavLink activeClassName='pink-btn-new' className='white-btn' exact to={routeCodes.BADGESTRACKING}>Tracking</NavLink>
                        <NavLink activeClassName='pink-btn-new' className='white-btn' exact to={routeCodes.BADGESINCOMPLETE}>Incomplete</NavLink>
                        <NavLink activeClassName='pink-btn-new' className='white-btn' exact to={routeCodes.BADGESCOMPLETE}>Complete</NavLink>
                    </div>

                    <Switch>
                        <Route exact path={routeCodes.BADGESCOMPLETE} component={Complete} />
                        <Route exact path={routeCodes.BADGESINCOMPLETE} component={InComplete} />
                        <Route exact path={routeCodes.BADGESTRACKING} component={Tracking} />
                    </Switch>
                </section>
            </div>
        );
    }

    componentDidMount() {
        connectIDB()().then((connection) => {
            const { dispatch } = this.props;
            const iDB = connection.result;
            dispatch(setUserBadgesByType({ iDB }))
        });
    }

    componentDidUpdate(prevProps, prevState) {
        const { match, history } = this.props;
        if (match.isExact) {
            history.push(routeCodes.BADGESTRACKING);
        }
    }

    componentWillUnmount() {
        try {
            console.log("unmount")
            const idbs = [IDB_TBL_BADGES];
            const { iDB } = this.props;
            if (isOnline()) {
                const transaction = iDB.transaction(idbs, IDB_READ_WRITE);
                if (transaction) {
                    const osBadge = transaction.objectStore(IDB_TBL_BADGES);
                    osBadge.clear();
                }
            }
            iDB.close();
            dispatch(setUserBadgesByType({ iDB: null }))
        } catch (error) {
        }
    }

}

const mapStateToProps = (state) => {
    const { userBadges } = state;
    return {
        iDB: userBadges.get('iDB')
    };
}

export default connect(
    mapStateToProps,
)(Badges);