import React,{Component} from 'react';

import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';

const data = [
      {name: 'Jan', weight: 4000},
      {name: 'Feb', weight: 3000},
      {name: 'Mar', weight: 2000},
      {name: 'Apr', weight: 2780},
      {name: 'May', weight: 1890},
      {name: 'Jun', weight: 2390},
      {name: 'Jul', weight: 3490},
      {name: 'Sep', weight: 3290},
      {name: 'Oct', weight: 3190},
      {name: 'Nov', weight: 3190},
      {name: 'Dec', weight: 3000},
];

class SimpleAreaChart extends Component{
	render () {
        return (
            <AreaChart width={450} height={400} data={data}
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


export default class BodyFatLoss extends Component{

    render(){
        return(
            <div className="white-box space-btm-30">
                <div className="whitebox-head d-flex">
                    <h3 className="title-h3">Body Fat Loss</h3>
                    <div className="whitebox-head-r">
                        <a href="" className="icon-settings"></a>
                    </div>
                </div>
                <div className="whitebox-body bodyfat-graph">
                    <SimpleAreaChart/>
                </div>
            </div>
        );
    }
}