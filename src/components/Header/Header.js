import React from "react";
import './Header.css';


class Header extends React.Component{
    render() {
        return (
            <div className="desktop_header_section">
                <img src={"https://cls-cdn-wip.sgp1.cdn.digitaloceanspaces.com/live/assets/front/classmate_logo.jpg"} alt="classmate_logo" width="200px" height="50px" className="desktop_logo"/>
            </div>
        );
    }
}
export default Header;
