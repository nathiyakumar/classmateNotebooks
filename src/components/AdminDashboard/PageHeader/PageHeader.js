import React from "react";
import './PageHeader.css';
class PageHeader extends React.Component{
    render() {
        return (
            <div className="pageheader_component">
                <h5 className={"pageheader_title"}>{this.props.title}</h5>
            </div>
        );
    }
}
export default PageHeader;
