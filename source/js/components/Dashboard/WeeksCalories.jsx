import React,{Component} from 'react';
import {connect} from 'react-redux';

class WeeksCalories extends Component{

    render(){
        
        const {weeksCalories,loading} = this.props;

        return(
            <div className="white-box space-btm-30">
                <div className="whitebox-head">
                    <h3 className="title-h3">Week's Calories</h3>
                </div>
                <div className="whitebox-body weeks-calories">
                    <h4>{(loading) ? 0:weeksCalories}</h4>
                    <h5>Kcal</h5>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    error: state.dashboardnew.get('error'),
    loading: state.dashboardnew.get('loading'),    
    weeksCalories: state.dashboardnew.get('weeksCalories'),
})

export default connect(mapStateToProps)(WeeksCalories)