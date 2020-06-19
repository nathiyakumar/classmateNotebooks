import React from "react";
import './Loader.css';

class Loader extends React.Component{
    render() {
        return (
            <div className="loader">
                <div className="loader__items">
                    <span />
                    <span />
                    <span />
                </div>
            </div>
        );
    }
}

export default Loader;
