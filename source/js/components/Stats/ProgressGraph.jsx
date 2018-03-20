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
                  <Area type='monotone' dataKey='weight' stroke='#ffffff' fill='#F2F2F2' />
                </AreaChart>
            </ResponsiveContainer>
        );
    }
}



function Contents (props){
    var info = props;

    return(
        <div className="graph-box">                
            <div className="graph-box-content">
                <h3 className="title-h3">{info.title}</h3>
                <h5>{info.quantity}</h5>
                <h6>{info.unit}</h6>
            </div>
            <div className="graph-box-background">
                <ResponsiveContainer>
                    <AreaChart data={data}
                        margin={{top: 0, right: 0, left: 0, bottom: 0}}>
                    <Area type='monotone' dataKey='weight' stroke='#ffffff' fill='#F2F2F2' />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
export default class ProgressGraph extends Component{

    render(){
        return(
          Contents(this.props)
            
        );
    }
}

