import React, { Component } from 'react';
import { connect } from 'react-redux';
import FitnessHeader from '../global/FitnessHeader';
import FitnessNav from '../global/FitnessNav';
import DateRangePicker from 'react-daterange-picker';
import moment from "moment";
import { getUserShoppingListRequest } from '../../actions/userShoppingList';
import { showPageLoader, hidePageLoader } from '../../actions/pageLoader';
import { capitalizeFirstLetter } from '../../helpers/funs';

class NutritionShopping extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeDateRange: moment.range(
                moment().startOf('day'),
                moment().startOf('day').add(6, 'days'),
            ),
            timeDateRangeState: null,
            selectActionInit: false,
            shoppingList: {},
        }
    }

    componentWillMount() {
        this.getShoppingList();
    }

    render() {
        const {
            timeDateRange,
            shoppingList,
        } = this.state;
        const { loading } = this.props;
        var shoppingListKeys = Object.keys(shoppingList);
        return (
            <div className="fitness-nutrition">
                <FitnessHeader />
                <FitnessNav />

                <section className="body-wrap">
                    <div className="body-head d-flex justify-content-start">
                        <div className="body-head-l">
                            <h2>Shopping List</h2>
                            <p>Each fitness test feeds directly into our algorithm - every test is used to identify the most efficient and effective structure of your training plan. Each test is designed to identify imbalances and weaknesses that may lead to increased risk of injury or decreased performance - now and in the future. This may also allow us to identify opportunities for rapid improvement.</p>
                        </div>
                        <div className="body-head-r">
                            <a href="" className="white-btn">Print <i className="icon-print"></i></a>
                            <a href="javascript:void(0)" onClick={this.getShoppingList} className="green-blue-btn">Search  <i className="icon-control_point"></i></a>
                            <DateRangePicker
                                firstOfWeek={1}
                                numberOfCalendars={2}
                                selectionType='range'
                                value={timeDateRange}
                                onSelect={this.handleTimeDateRange}
                            />
                        </div>
                    </div>

                    <div className="body-content d-flex row justify-content-start profilephoto-content">
                        <div className="col-md-12">
                            <div className="white-box space-btm-20">
                                <div className="whitebox-head d-flex">
                                    <h3 className="title-h3">Shop Items</h3>
                                </div>
                                <div className="whitebox-body profile-body">
                                    <div className="row d-flex">
                                        {shoppingList && shoppingListKeys.length > 0 &&
                                            shoppingListKeys.map((key, index) => {
                                                return (
                                                    <div className="col-md-4" key={index}>
                                                        <div className="friend-box vertical-middle-r">
                                                            <div className="friend-box-info"><h5 className="vertical-middle-c">{capitalizeFirstLetter(key)}</h5></div>
                                                            <div className="friend-box-status"><h6 className="vertical-middle-c">{Math.ceil(shoppingList[key]).toFixed(0)}g</h6></div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                        {shoppingList && shoppingListKeys.length <= 0 && !loading &&
                                            <span>List is empty</span>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        );
    }

    componentDidUpdate() {
        const { selectActionInit } = this.state;
        const {
            loading,
            shoppingList,
            dispatch,
        } = this.props;
        if (selectActionInit && !loading) {
            this.setState({
                selectActionInit: false,
                shoppingList
            });
            dispatch(hidePageLoader());
        }
    }

    handleTimeDateRange = (range, state) => {
        this.setState({
            timeDateRange: range,
            timeDateRangeState: state
        });
    }

    getShoppingList = () => {
        const { timeDateRange } = this.state;
        const { dispatch } = this.props;
        var requestData = {
            start_date: timeDateRange.start,
            end_date: timeDateRange.end,
        }
        this.setState({ selectActionInit: true });
        dispatch(showPageLoader());
        dispatch(getUserShoppingListRequest(requestData));
    }

}

const mapStateToProps = (state) => {
    const { userShoppingList } = state;
    return {
        loading: userShoppingList.get('loading'),
        error: userShoppingList.get('error'),
        shoppingList: userShoppingList.get('shoppingList'),
    }
}

export default connect(
    mapStateToProps
)(NutritionShopping);