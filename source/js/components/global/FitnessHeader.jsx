import React, { Component } from 'react';

export default class FitnessHeader extends Component {
    render() {
        return (
            <div className="header">
                <header className="header d-flex justify-content-start">
                    <div className="logo">
                        <a href="index.html">
                            
                        </a>
                    </div>
                    <div className="search">
                        <form>
                            <button type="submit">
                                <i className="icon-search"></i>
                            </button>
                            <input type="search" name="" placeholder="Search" />
                        </form>
                    </div>
                    <div className="header-r d-flex">
                        <div className="header-user">
                            <a href="javascript:void(0)">
                                <span></span>Cecilia
                            </a>
                        </div>
                        <div className="header-alert">
                            <a href="javascript:void(0)">
                                <i className="icon-notifications_none"></i>
                            </a>
                        </div>
                        <div className="header-email">
                            <a href="javascript:void(0)">
                                <i className="icon-mail_outline"></i>
                            </a>
                        </div>
                        <div className="header-nav">
                            <a href="javascript:void(0)">
                                <i className="icon-menu"></i>
                            </a>
                        </div>
                    </div>
                </header>
            </div>
        );
    }
}

