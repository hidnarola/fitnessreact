import React,{ Component } from 'react';


export default class NutritionStats extends Component{

    render(){
        return(
            <div className="fitness-stats">
                <div className="body-content">
                    <div className="d-flex row">
                        <div className="col-md-9">
                            <div className="fat-changes">
                                <h1>Nutrition</h1>
                                <ul className="d-flex">
                                    <li>
                                        <div className="fatchanges-box">
                                            <h3 className="title-h3">Total Distance Run</h3>
                                            <h5>500</h5>
                                            <h6>kilometers</h6>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="fatchanges-box">
                                            <h3 className="title-h3">Total Time Running</h3>
                                            <h5>13</h5>
                                            <h6>Hours</h6>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="fatchanges-box">
                                            <h3 className="title-h3">Total elevation</h3>
                                            <h5>5.4</h5>
                                            <h6>kilometers</h6>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <div className="body-fat">
                                <div className="bodyfat-head d-flex justify-content-start">
                                    <div className="bodyfat-l dropdown mr-auto">
                                        <a href="javascript:void(0)" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">Distance run
                                            <span className="icon-expand_more"></span>
                                        </a>
                                        <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                                            <li>
                                                <a href="#">Action</a>
                                            </li>
                                            <li>
                                                <a href="#">Another action</a>
                                            </li>
                                            <li>
                                                <a href="#">Something else here</a>
                                            </li>
                                            <li>
                                                <a href="#">Separated link</a>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="bodyfat-day ">
                                        <a href="">14 Days</a>
                                        <a href="">21 Days</a>
                                    </div>
                                    <div className="bodyfat-ellipsis ">
                                        <a href="javascript:void(0)" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                            <span className="icon-more_horiz"></span>
                                        </a>
                                        <ul className="dropdown-menu" aria-labelledby="dropdownMenu	">
                                            <li>
                                                <a href="#">Action</a>
                                            </li>
                                            <li>
                                                <a href="#">Another action</a>
                                            </li>
                                            <li>
                                                <a href="#">Something else here</a>
                                            </li>
                                            <li>
                                                <a href="#">Separated link</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="bodyfat-body">
                                    <div className="average">
                                        <p>
                                            <span className="bg-blue"></span> Peer Average</p>
                                        <p>
                                            <span className="bg-purple"></span> Target weight</p>
                                        <p>
                                            <span className="bg-pink"></span> Your Weight</p>
                                    </div>
                                    <img src="images/graph.jpg" alt="" />
                                </div>
                            </div>

                            <div className="fat-changes">
                                <ul className="d-flex">
                                    <li>
                                        <div className="fatchanges-box">
                                            <h3 className="title-h3">Peak heart rate </h3>
                                            <h5>180</h5>
                                            <h6>BPM</h6>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="fatchanges-box">
                                            <h3 className="title-h3">distance cycled</h3>
                                            <h5>854</h5>
                                            <h6>kilometers</h6>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="fatchanges-box">
                                            <h3 className="title-h3">Total steps</h3>
                                            <h5>180k</h5>
                                            <h6>steps</h6>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                        </div>
                        <div className="col-md-3 leader-board">
                            <div className="white-box">
                                <div className="leaderboard-head d-flex">
                                    <h3 className="title-h3 mr-auto">leaderboard</h3>
                                    <div className="whitebox-head-r">
                                        <a href="" className="icon-public"></a>
                                        <a href="" className="icon-people"></a>
                                    </div>
                                </div>
                                <div className="whitebox-body">
                                    <div className="bodyfat-changes">
                                        <select>
                                            <option>Body Fat Changes</option>
                                            <option>Changes 01</option>
                                            <option>Changes 02</option>
                                            <option>Changes 03</option>
                                            <option>Changes 04</option>
                                        </select>
                                    </div>
                                    <div className="leaderboard-list">
                                        <ul>
                                            <li>
                                                <div className="leaderboard-list-inr">
                                                    <span></span>
                                                    <h3>
                                                        <a href="">Louisa Willis</a>
                                                    </h3>
                                                    <h4>32%</h4>
                                                    <div className="count-leadeboard bg-blue">1</div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="leaderboard-list-inr">
                                                    <span></span>
                                                    <h3>
                                                        <a href="">Louisa Willis</a>
                                                    </h3>
                                                    <h4>32%</h4>
                                                    <div className="count-leadeboard bg-pink">1</div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="leaderboard-list-inr">
                                                    <span></span>
                                                    <h3>
                                                        <a href="">Louisa Willis</a>
                                                    </h3>
                                                    <h4>32%</h4>
                                                    <div className="count-leadeboard bg-purple">1</div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="leaderboard-list-inr">
                                                    <span></span>
                                                    <h3>
                                                        <a href="">Louisa Willis</a>
                                                    </h3>
                                                    <h4>32%</h4>
                                                    <div className="count-leadeboard">1</div>
                                                </div>
                                            </li>
                                            <li>
                                                <i className="icon-more_horiz"></i>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}