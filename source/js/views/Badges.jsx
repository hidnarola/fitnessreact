import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { routeCodes } from 'constants/routes';
import FitnessHeader from 'components/global/FitnessHeader';
import FitnessNav from 'components/global/FitnessNav';
import Complete from 'components/Badges/Complete';
import InComplete from 'components/Badges/InComplete';
import Tracking from 'components/Badges/Tracking';
import { IDB_TBL_BADGES, IDB_READ_WRITE } from '../constants/idb';
import { connectIDB, isOnline } from '../helpers/funs';

class Badges extends Component {

    constructor(props) {
        super(props);
        this.iDB;
    }

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

        // change title 
        document.title = "badges";

        connectIDB()().then((connection) => {
            this.handleIDBOpenSuccess(connection);
        });
    }

    handleIDBOpenSuccess = (connection) => {
        this.iDB = connection.result;
    }

    componentDidUpdate(prevProps, prevState) {
        const { match, history } = this.props;
        if (match.isExact) {
            history.push(routeCodes.BADGESTRACKING);
        }
    }

    componentWillUnmount() {
        try {
            const idbs = [IDB_TBL_BADGES];
            if (isOnline()) {
                const transaction = this.iDB.transaction(idbs, IDB_READ_WRITE);
                if (transaction) {
                    const osBadge = transaction.objectStore(IDB_TBL_BADGES);
                    osBadge.clear();
                }
            }
            this.iDB.close();
        } catch (error) { }
    }

}

const mapStateToProps = (state) => {
    const { userBadges } = state;
    return {
    };
}

export default connect(
    mapStateToProps,
)(Badges);