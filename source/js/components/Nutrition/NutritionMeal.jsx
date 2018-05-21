import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { routeCodes } from 'constants/routes';
import FitnessHeader from '../global/FitnessHeader';
import FitnessNav from '../global/FitnessNav';
import moment from "moment";
import { getUserTodaysMealRequest, deleteUserRecipeRequest } from '../../actions/userNutritions';
import noProfileImg from 'img/common/no-profile-img.png'
import { capitalizeFirstLetter } from '../../helpers/funs';
import {
    DAY_DRIVE_BREAKFAST,
    DAY_DRIVE_LUNCH,
    DAY_DRIVE_DINNER,
    DAY_DRIVE_PRE_LUNCH_SNACKS,
    DAY_DRIVE_SNACKS,
    DAY_DRIVE_POST_LUNCH_SNACKS
} from '../../constants/consts';
import _ from "lodash";
import { showPageLoader, hidePageLoader } from '../../actions/pageLoader';
import {
    DropdownButton,
    ButtonToolbar,
    MenuItem
} from "react-bootstrap";
import { FaTrash } from 'react-icons/lib/fa';
import DeleteConfirmation from '../Admin/Common/DeleteConfirmation';


const dayDriveOptions = [
    { value: DAY_DRIVE_BREAKFAST, label: capitalizeFirstLetter(DAY_DRIVE_BREAKFAST.replace('_', ' ')) },
    { value: DAY_DRIVE_LUNCH, label: capitalizeFirstLetter(DAY_DRIVE_LUNCH.replace('_', ' ')) },
    { value: DAY_DRIVE_DINNER, label: capitalizeFirstLetter(DAY_DRIVE_DINNER.replace('_', ' ')) },
    { value: DAY_DRIVE_PRE_LUNCH_SNACKS, label: capitalizeFirstLetter(DAY_DRIVE_SNACKS.replace('_', ' ')) },
    { value: DAY_DRIVE_POST_LUNCH_SNACKS, label: capitalizeFirstLetter(DAY_DRIVE_SNACKS.replace('_', ' ')) },
];

class NutritionMeal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectActionInit: false,
            todaysMeal: [],
            showDeleteModal: false,
            selectedMealId: null,
            deleteActionInit: false,
        }
    }

    componentWillMount() {
        const { dispatch } = this.props;
        var todaysDate = moment().startOf('day');
        var requestObj = {
            date: todaysDate,
        }
        this.setState({ selectActionInit: true });
        dispatch(showPageLoader());
        dispatch(getUserTodaysMealRequest(requestObj));
    }

    render() {
        var total_enerc_kal = 0;
        var total_procnt = 0;
        var total_fat = 0;
        var total_chocdf = 0;
        const {
            todaysMeal,
            showDeleteModal,
        } = this.state;
        const { loading } = this.props;
        return (
            <div className="fitness-nutrition">
                <FitnessHeader />
                <FitnessNav />
                <section className="body-wrap">
                    <div className="body-head d-flex justify-content-start">
                        <div className="body-head-l">
                            <h2>nutrition</h2>
                            <p>Your meal plan is balanced and tailored to provide the right mix for your goal. For your fitness assistant
                                to provide the best meal plans make sure you rate recipes you like. You can further fine tune the meals
                                selected for you by changing your nutrition settings. </p>
                        </div>
                        <div className="body-head-r ml-auto">

                            <NavLink
                                activeClassName='active'
                                className='pink-btn'
                                exact
                                to={routeCodes.NUTRITIONSHOP}
                            >
                                <span>Shopping List</span>
                                <i className="icon-shopping_cart"></i>
                            </NavLink>

                            <NavLink
                                activeClassName='active'
                                className='white-btn'
                                exact
                                to={routeCodes.NUTRITIONPREFERENCE}
                            >
                                <span>Nutrition Settings</span>
                                <i className="icon-settings"></i>
                            </NavLink>
                        </div>
                    </div>
                    <div className="body-content d-flex row justify-content-start">
                        <div className="col-md-8">
                            <div className="white-box">
                                <div className="whitebox-head d-flex profile-head">
                                    <h3 className="title-h3 size-14">Today's Meals</h3>
                                    <div className="whitebox-head-r">
                                        <a href="" className="green-blue">
                                            Add meal<i className="icon-control_point"></i>
                                        </a>
                                    </div>
                                </div>

                                <div className="whitebox-body">
                                    {todaysMeal && todaysMeal.length <= 0 && (!loading) &&
                                        <span>No Records found</span>
                                    }
                                    {todaysMeal && todaysMeal.length > 0 &&
                                        todaysMeal.map((meal, index) => {
                                            var dayDriveType = _.find(dayDriveOptions, { value: meal.dayDriveType });
                                            var enerc_kal = Math.round(meal.totalNutrients['ENERC_KCAL'].quantity).toFixed(0);
                                            var procnt = Math.round(meal.totalNutrients['PROCNT'].quantity).toFixed(0);
                                            var fat = Math.round(meal.totalNutrients['FAT'].quantity).toFixed(0);
                                            var chocdf = Math.round(meal.totalNutrients['CHOCDF'].quantity).toFixed(0);
                                            total_enerc_kal = parseInt(total_enerc_kal) + parseInt(enerc_kal);
                                            total_procnt = parseInt(total_procnt) + parseInt(procnt);
                                            total_fat = parseInt(total_fat) + parseInt(fat);
                                            total_chocdf = parseInt(total_chocdf) + parseInt(chocdf);
                                            return (
                                                <div className="meal-wrap d-flex" key={index}>
                                                    <div className="meal-img">
                                                        <img
                                                            src={meal.image}
                                                            alt="Recipe"
                                                            onError={(e) => {
                                                                e.target.src = noProfileImg
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="meal-name">
                                                        <small>{(dayDriveType) ? dayDriveType.label : ''}</small>
                                                        <h5>
                                                            <NavLink to={`${routeCodes.NUTRITION_RECIPE_DETAILS}/${meal._id}`}>
                                                                {meal.name}
                                                            </NavLink>
                                                        </h5>
                                                    </div>
                                                    <div className="meal-info">
                                                        <small>Cals</small>
                                                        <big>
                                                            {enerc_kal}
                                                            {meal.totalNutrients['ENERC_KCAL'].unit}
                                                        </big>
                                                    </div>
                                                    <div className="meal-info">
                                                        <small>Protein</small>
                                                        <big>
                                                            {procnt}
                                                            {meal.totalNutrients['PROCNT'].unit}
                                                        </big>
                                                    </div>
                                                    <div className="meal-info">
                                                        <small>Fat</small>
                                                        <big>
                                                            {fat}
                                                            {meal.totalNutrients['FAT'].unit}
                                                        </big>
                                                    </div>
                                                    <div className="meal-info">
                                                        <small>Carbs</small>
                                                        <big>
                                                            {chocdf}
                                                            {meal.totalNutrients['CHOCDF'].unit}
                                                        </big>
                                                    </div>
                                                    <div className="meal-info">
                                                        <ButtonToolbar>
                                                            <DropdownButton title="" className="icon-more_horiz" id="dropdown-size-small" noCaret>
                                                                <MenuItem eventKey="1" onClick={() => this.handleShowDeleteModal(meal._id)}>
                                                                    <FaTrash className="v-align-sub" /> Delete
                                                                </MenuItem>
                                                            </DropdownButton>
                                                        </ButtonToolbar>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="recipe-nutrition white-box">
                                <div className="whitebox-head meal-paln">
                                    <h3 className="title-h3 size-14">Meal Plan Stats</h3>
                                </div>
                                <div className="whitebox-body">
                                    <div className="dtl-div">
                                        <ul className="common-ul">
                                            <li>
                                                <div className="grey-white">
                                                    <h4>
                                                        Total Calories
                                                        </h4>
                                                    <h5>
                                                        {total_enerc_kal}<sub>kcal</sub>
                                                    </h5>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="grey-white">
                                                    <h4>
                                                        Total Protein
                                                        </h4>
                                                    <h5>
                                                        {total_procnt}<sub>g</sub>
                                                    </h5>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="grey-white">
                                                    <h4>
                                                        Total Fat
                                                        </h4>
                                                    <h5>
                                                        {total_fat}<sub>g</sub>
                                                    </h5>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="grey-white">
                                                    <h4>
                                                        Total Carbs
                                                        </h4>
                                                    <h5>
                                                        {total_chocdf}<sub>g</sub>
                                                    </h5>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="nutrition-chart">
                                        <img src="" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <DeleteConfirmation
                    show={showDeleteModal}
                    handleClose={this.handleCloseDeleteModal}
                    handleYes={this.handleDelete}
                />
            </div>
        );
    }

    componentDidUpdate() {
        const {
            loading,
            todaysMeal,
            dispatch,
        } = this.props;
        const {
            selectActionInit,
            deleteActionInit,
        } = this.state;
        if (selectActionInit && !loading) {
            this.setState({ selectActionInit: false, todaysMeal });
            dispatch(hidePageLoader());
        } else if (deleteActionInit && !loading) {
            var todaysDate = moment().startOf('day');
            var requestObj = {
                date: todaysDate,
            }
            this.setState({ deleteActionInit: false, selectActionInit: true });
            this.handleCloseDeleteModal();
            dispatch(getUserTodaysMealRequest(requestObj));
        }
    }

    handleShowDeleteModal = (_id) => {
        this.setState({
            selectedMealId: _id,
            showDeleteModal: true
        });
    }

    handleCloseDeleteModal = () => {
        this.setState({
            selectedMealId: null,
            showDeleteModal: false
        });
    }

    handleDelete = () => {
        const { dispatch } = this.props;
        var _id = this.state.selectedMealId;
        dispatch(showPageLoader());
        dispatch(deleteUserRecipeRequest(_id));
        this.setState({ deleteActionInit: true });
    }

}

const mapStateToProps = (state) => {
    const { userNutritions } = state;
    return {
        loading: userNutritions.get('loading'),
        error: userNutritions.get('error'),
        todaysMeal: userNutritions.get('todaysMeal'),
    };
}

export default connect(
    mapStateToProps
)(NutritionMeal);