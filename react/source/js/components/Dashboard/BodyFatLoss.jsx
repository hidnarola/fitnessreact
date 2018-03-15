import React,{Component} from 'react';
import {connect} from 'react-redux';
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';

const data = [
      {name: 'Jan', weight: 0},
      {name: 'Feb', weight: 0},
      {name: 'Mar', weight: 0},
      {name: 'Apr', weight: 0},
      {name: 'May', weight: 0},
      {name: 'Jun', weight: 0},
      {name: 'Jul', weight: 0},
      {name: 'Sep', weight: 0},
      {name: 'Oct', weight: 0},
      {name: 'Nov', weight: 0},
      {name: 'Dec', weight: 0},
];

class SimpleAreaChart extends Component{
	render () {
        return (
            <AreaChart width={450} height={400} data={this.props.chartData}
                    margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                <XAxis dataKey="name"/>
                <YAxis/>
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip/>
                <Area type='monotone' dataKey='weight' stroke='#8884d8' fill='#8884d8' />
            </AreaChart>
        );
    }
}


class BodyFatLoss extends Component{

    constructor(props){
        super(props);
    }

    render(){

        const {bodyFat,loading} = this.props;

        return(
            <div className="white-box space-btm-30">
                <div className="whitebox-head d-flex">
                    <h3 className="title-h3">Body Fat Loss</h3>
                    <div className="whitebox-head-r">
                        <a href="" className="icon-settings"></a>
                    </div>
                </div>
                <div className="whitebox-body bodyfat-graph">
                    <SimpleAreaChart chartData={(loading)?  data:bodyFat['data']} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    error: state.dashboardnew.get('error'),
    loading: state.dashboardnew.get('loading'),
    dashboardData: state.dashboardnew.get('dashboardData'),
    bodyFat: state.dashboardnew.get('bodyFat'),
})

export default connect(mapStateToProps)(BodyFatLoss)