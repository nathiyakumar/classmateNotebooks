import React from "react";
import './AppHeader.css';

class AppHeader extends React.Component{
    render() {
        return (
            <div className="appheader_component">
                <div>
                     <span className="appheader_section" onClick={this.props.onBack}>
                        <i className="ri-arrow-left-line appheader_arrow"/>
                        <p className={"appheader_title"}>{this.props.title}</p>
                     </span>

                </div>
            </div>
        );
    }
}

export default AppHeader;
