import React,{Component} from 'react';

export default class WeeksCalories extends Component{

    render(){
        return(
            <div className="white-box space-btm-30">
                <div className="whitebox-head">
                    <h3 className="title-h3">Week's Calories</h3>
                </div>
                <div className="whitebox-body weeks-calories">
                    <h4>60978</h4>
                    <h5>Kcal</h5>
                </div>
            </div>
        );
    }
}