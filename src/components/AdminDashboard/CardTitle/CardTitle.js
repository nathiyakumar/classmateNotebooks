import React from "react";
import "./CardTitle.css";

class CardTitle extends React.Component{
    render() {
        return (
            <div className="admin_cart_title_component">
                <div className="component_title">{this.props.title}</div>
                <div>{this.props.toolbar}</div>
            </div>
        );
    }
}

export default CardTitle;
