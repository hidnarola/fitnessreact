import React,{Component} from 'react';
import CircularProgressbar from 'react-circular-progressbar';

export default class GoalProgress extends Component{

    constructor(props){
        super(props);
                
    }

    render(){        

        return(
            <div className="white-box space-btm-30">                
                <div className="whitebox-head d-flex">
                    <h3 className="title-h3">Goal Progress</h3>
                    <div className="whitebox-head-r">
                        <a href="" className="icon-settings"></a>
                    </div>
                </div>
                <div className="whitebox-body goal-progress">
                    <CircularProgressbar 
                            percentage={60} 
                            strokeWidth={5} 
                            textForPercentage={ (pct) => `${pct}%` }
                            />
                </div>
            </div>
        );
    }
}