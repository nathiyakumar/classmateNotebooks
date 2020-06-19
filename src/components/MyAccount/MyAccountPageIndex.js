import React from "react";
import Media from 'react-media';
import { small_screen } from '../../variables';
import MyAccountPage from "./MyAccountPage";
import MobileMyAccountPage from "./MobileMyAccountPage";
import MetaWrapper from "../../Meta/MetaWrapper";
// import ReactGA from "react-ga";


class MyAccountPageIndex extends React.Component{
    componentWillMount(){
        // ReactGA.set({
        //     location: `${window.location.origin}${window.location.pathname}${window.location.search}`,
        //     title: "My Account"
        // });
        //
        // ReactGA.pageview(window.location.pathname);
    }
    render() {
        return (
            <div>
                <MetaWrapper
                    meta={{
                        description: "My Account",
                        title: "My Account",
                    }}
                >
                <Media query={{maxWidth:small_screen}} render={() =>
                    (
                        <MobileMyAccountPage />
                    )}
                />
                <Media query={{minWidth:small_screen}} render={() =>
                    (
                        <MyAccountPage />
                    )}
                />
                </MetaWrapper>
            </div>
        );
    }
}
export default MyAccountPageIndex;
