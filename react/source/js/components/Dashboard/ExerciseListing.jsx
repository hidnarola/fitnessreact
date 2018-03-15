import React,{Component} from 'react';
import WorkoutImg from 'img/dashboard/img-01.jpg';

class ExerciseListing extends Component{

    constructor(props){
        super(props);
    }

    render(){
        
        const {exerList} = this.props;

        return(
            <div className="whitebox-body today-box">
                <ul>
                    {exerList.map(function(object, i){
                        return (
                            <li key={i}>
                                <div className="today-box-inr">
                                    <span>
                                        <img src={WorkoutImg} alt="" />
                                    </span>
                                    <h4>{object['name']}</h4>
                                    <h5>{object['exercise']}</h5>
                                </div>
                            </li>   
                        )
                    })}                   
                </ul>
            </div>
        )
    }
}

export default ExerciseListing;