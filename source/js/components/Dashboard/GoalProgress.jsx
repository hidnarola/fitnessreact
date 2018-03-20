import React,{Component} from 'react';
import CircularProgressbar from 'react-circular-progressbar';
import { connect } from 'react-redux';

class GoalProgress extends Component{

    constructor(props){
        super(props);
                
    }

    render(){        
        
        const {loading,goalProgress} = this.props;
        let style = {
            content: "70% Complete"
        }

        return(
            <div className="white-box space-btm-30">                
                <div className="whitebox-head d-flex">
                    <h3 className="title-h3">Goal Progress</h3>
                    <div className="whitebox-head-r">
                        <a href="" className="icon-settings"></a>
                    </div>
                </div>
                <div className="whitebox-body goal-progress">
                    <div className="static_text" style={style}>
                    <CircularProgressbar 
                            percentage={(loading === true) ? 0 : goalProgress} 
                            strokeWidth={5} 
                            textForPercentage={ (pct) => `Run 1000k` }
                            />
                            </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    error: state.dashboardnew.get('error'),
    loading: state.dashboardnew.get('loading'),
    goalProgress: state.dashboardnew.get('goalProgress'),
})

export default connect(mapStateToProps)(GoalProgress)
