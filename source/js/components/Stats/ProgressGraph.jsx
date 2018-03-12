import React,{Component} from 'react';

import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';

const data = [
      {name: 'Jan', weight: 800},
      {name: 'Feb', weight: 864},
      {name: 'Mar', weight: 820},
      {name: 'Apr', weight: 850},
      {name: 'May', weight: 980},
      {name: 'Jun', weight: 750},
      {name: 'Jul', weight: 756},
      {name: 'Sep', weight: 752},
      {name: 'Oct', weight: 854},
      {name: 'Nov', weight: 482},
      {name: 'Dec', weight: 986},
];

class SimpleAreaChart extends Component{
    render () {
        return (
            <ResponsiveContainer>
                <AreaChart data={data}
                      margin={{top: 0, right: 0, left: 0, bottom: 0}}>
                  <Area type='monotone' dataKey='weight' stroke='#ffffff' fill='#40F8F4' />
                </AreaChart>
            </ResponsiveContainer>
        );
    }
}


export default class BodyFatLoss extends Component{

    render(){
        return(
            <div className="graph-box">
                
                <div class="graph-box-content">
                    <h3 className="title-h3">Weight Lifted</h3>
                    <h5>986</h5>
                    <h6>Kilograms</h6>
                </div>
                <div className="graph-box-background">
                    <SimpleAreaChart/>
                </div>
            </div>
        );
    }
}