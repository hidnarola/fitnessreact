import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BADGE_TYPE_COMPLETE } from '../../constants/consts';
import { getUserBadgesByTypeRequest, setUserBadgesByType } from '../../actions/userBadges';
import BadgeIndividualCard from './BadgeIndividualCard';
import ErrorCloud from "svg/error-cloud.svg";
import { FaCircleONotch } from "react-icons/lib/fa";
import NoRecordFound from '../Common/NoRecordFound';
import { IDB_TBL_BADGES, IDB_READ_WRITE, IDB_READ } from '../../constants/idb';
import { connectIDB, isOnline } from '../../helpers/funs';

class Complete extends Component {

    constructor(props) {
        super(props);
        this.iDB;
    }
    
    render() {
        const { loading, badges, error } = this.props;
        if (loading) {
            return (
                <div className="no-content-loader">
                    <FaCircleONotch className="loader-spinner fs-100" />
                </div>
            );
        }
        return (
            <div className="badge-card-wrapper">
                {!loading && typeof badges !== 'undefined' && badges && badges.length > 0 &&
                    <div className="body-content budges">
                        <div className="row d-flex">
                            {badges.map((badge, index) => {
                                return (
                                    <BadgeIndividualCard
                                        key={index}
                                        badge={badge}
                                        badgeType={BADGE_TYPE_COMPLETE}
                                    />
                                );
                            })}
                        </div>
                    </div>
                }

                {!loading && typeof badges !== 'undefined' && badges && badges.length <= 0 && error && error.length <= 0 &&
                    <NoRecordFound title="No badges awarded!" />
                }

                {!loading && typeof error !== 'undefined' && error && error.length > 0 &&
                    <div className="server-error-wrapper">
                        <ErrorCloud />
                        <h4>Something went wrong! please try again.</h4>
                    </div>
                }
            </div>
        );
    }

    componentDidMount() {
        connectIDB()().then((connection) => {
            this.handleIDBOpenSuccess(connection);
        });

        if (isOnline()) {
            const { dispatch } = this.props;
            dispatch(getUserBadgesByTypeRequest(BADGE_TYPE_COMPLETE));
        }
    }

    handleIDBOpenSuccess = (connection) => {
        this.iDB = connection.result;
        if (!isOnline()) {
            this.getDataFromIDB();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { loading, selectedBadgeType, badges, error } = this.props
        if (!loading && prevProps.loading !== loading) {
            this.storeBadgeInIDB(selectedBadgeType, JSON.stringify(badges));
        }
    }

    getDataFromIDB = () => {
        const { selectedBadgeType, dispatch } = this.props;
        if (selectedBadgeType) {
            const idbTbls = [IDB_TBL_BADGES];
            try {
                const transaction = this.iDB.transaction(idbTbls, IDB_READ);
                if (transaction) {
                    const osBadge = transaction.objectStore(IDB_TBL_BADGES);
                    const iDBGetReq = osBadge.get(BADGE_TYPE_COMPLETE);
                    iDBGetReq.onsuccess = (event) => {
                        const { target: { result } } = event;
                        if (result) {
                            const resultObj = JSON.parse(result.data);
                            const data = { badges: resultObj, error: [] }
                            dispatch(setUserBadgesByType(data));
                        } else {
                            const data = { badges: [], error: [] }
                            dispatch(setUserBadgesByType(data));
                        }
                    }
                }
            } catch (error) {
            }
        }
    }

    storeBadgeInIDB = (type, data) => {
        try {
            const idbData = { type, data };
            const transaction = this.iDB.transaction([IDB_TBL_BADGES], IDB_READ_WRITE);
            const objectStore = transaction.objectStore(IDB_TBL_BADGES);
            const iDBGetReq = objectStore.get(type);
            iDBGetReq.onsuccess = (event) => {
                const { target: { result } } = event;
                if (result) {
                    objectStore.put(idbData);
                } else {
                    objectStore.add(idbData);
                }
            }
        } catch (error) { }
    }

    componentWillUnmount() {
        try {
            this.iDB.close();
        } catch (error) { }
    }


}

const mapStateToProps = (state) => {
    const { userBadges } = state;
    return {
        loading: userBadges.get('loading'),
        selectedBadgeType: userBadges.get('selectedBadgeType'),
        badges: userBadges.get('badges'),
        error: userBadges.get('error')
    };
}

export default connect(
    mapStateToProps,
)(Complete);