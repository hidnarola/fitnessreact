import React,{ Component } from 'react';


export default class InComplete extends Component{

    render(){
        return(
            <div className="body-content budges">
                <div className="row d-flex">
                    <div className="col-md-4">
                        <div className="badges-box">                            
                            <h3>Getting Started</h3>
                            <p>Congratulations on completing your first
                                <br/> workout, Keep it up!</p>
                            <h5>Completed
                                <small>June 8, 2017</small>
                            </h5>
                            <h6>10pts</h6>
                        </div>
                    </div>                    
                </div>
            </div>
        );
    }
}