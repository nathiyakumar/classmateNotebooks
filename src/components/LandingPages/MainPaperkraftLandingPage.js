import React from "react";
import MetaWrapper from "../../Meta/MetaWrapper";
import Media from "react-media";
import {small_screen} from "../../variables";
import  PaperkraftLandingPageDesktop from './PaperkraftLandingPageDesktop'
import PaperkraftLandingPageMobile from "./PaperkraftLandingPageMobile";
// import ReactGA from "react-ga";


class MainPaperkraftLandingPage  extends React.Component{

    componentWillMount(){
        // ReactGA.set({
        //     location: `${window.location.origin}${window.location.pathname}${window.location.search}`,
        //     title: "Paperkraft Giftbox Series"
        // });
        //
        // ReactGA.pageview(window.location.pathname);
    }

    render() {
        return (
            <div>
                <div>
                    <MetaWrapper
                        meta={{
                            description: "Paperkraft premium gift box – A classy gifting option to professionals. A stylish and elegantly designed notebook with 80 GSM robust Perma white papers that lasts for 100 years. It contains a gift box with a hardbound notebook and a matte black pen.",
                            title: "Paperkraft Giftbox Series",
                        }}
                    >
                        <Media query={{maxWidth:small_screen}} render={() =>
                            (
                                <PaperkraftLandingPageMobile />
                            )}
                        />
                        <Media query={{minWidth:small_screen}} render={() =>
                            (
                                <PaperkraftLandingPageDesktop />
                            )}
                        />
                    </MetaWrapper>
                </div>
            </div>
        );
    }
}

export default MainPaperkraftLandingPage
