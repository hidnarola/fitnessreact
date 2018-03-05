import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WizardFormFirstPage from './WizardFormFirstPage';
import WizardFormSecondPage from './WizardFormSecondPage';
import WizardFormThirdPage from './WizardFormThirdPage';
import WizardFormFourthPage from './WizardFormFourthPage';
import cx from 'classNames';

class WizardForm extends Component {
    
    constructor(props) {
        super(props);
        this.nextPage = this.nextPage.bind(this);
        this.previousPage = this.previousPage.bind(this);
        this.state = {
            page: 1,
        };
    }

    nextPage() {
        this.setState({ page: this.state.page + 1 });
    }

    previousPage() {
        this.setState({ page: this.state.page - 1 });
    }

    render() {
        
        const { onSubmit } = this.props;
        const { page } = this.state;

        return (            
            <div class="step-wrap">
                <div class="step-box">
                    <div class="step-box-l">
                        <div class="step-bullet">
                            <ul>
                                <li className={cx({'active':(this.state.page == 1) ? true:false})} >
                                    <a href=""></a>
                                </li>
                                <li className={cx({'active':(this.state.page == 2) ? true:false})}>
                                    <a href=""></a>
                                </li>
                                <li className={cx({'active':(this.state.page == 3) ? true:false})}>
                                    <a href=""></a>
                                </li>
                                <li className={cx({'active':(this.state.page == 4) ? true:false})}>
                                    <a href=""></a>
                                </li>
                                <li className={cx({'active':(this.state.page == 5) ? true:false})}>
                                    <a href=""></a>
                                </li>
                                <li className={cx({'active':(this.state.page == 6) ? true:false})}>
                                    <a href=""></a>
                                </li>
                                <li className={cx({'active':(this.state.page == 7) ? true:false})}>
                                    <a href=""></a>
                                </li>
                            </ul>
                            <h6>Step 0{this.state.page}\08</h6>
                        </div>
                        <div class="what-difference">
                            <h3>What difference
                                <br/>does the goal make?</h3>
                            <p>Your workouts and meal plan will
                                <br/> be tailored and updated to help
                                <br/> you achieve your goal, You can
                                <br/> add secondary goals which will
                                <br/> further refine your plans.</p>
                        </div>
                    </div>
                    
                    {page === 1 && <WizardFormFirstPage onSubmit={this.nextPage} />}

                    {page === 2 &&
                        <WizardFormSecondPage
                            previousPage={this.previousPage}
                            onSubmit={this.nextPage}
                        />}

                    {page === 3 &&
                        <WizardFormThirdPage
                            previousPage={this.previousPage}
                            onSubmit={this.nextPage}
                        />}

                    {page === 4 &&
                        <WizardFormFourthPage
                            previousPage={this.previousPage}
                            onSubmit={onSubmit}
                        />}

                </div>
            </div>            
        );
    }
}

WizardForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default WizardForm;