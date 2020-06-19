import React from 'react';
import Media from 'react-media';
import { small_screen } from '../../variables';
import TermsAndCondition from './DesktopTermsAndContion/TermsAndCondition';
import MobileTermsAndCondition from './mobileTermsAndContion/MobileTermsAndCondition'
import MetaWrapper from "../../Meta/MetaWrapper";
// import ReactGA from "react-ga";

class CommonTermsAndCondition extends React.Component{
    componentWillMount(){
        // ReactGA.set({
        //     location: `${window.location.origin}${window.location.pathname}${window.location.search}`,
        //     title: "Common Terms And Condition"
        // });
        //
        // ReactGA.pageview(window.location.pathname);
    }

    render() {
        return (
            <div>
                <MetaWrapper
                    meta={{
                        description: "Common Terms And Condition",
                        title: "Common Terms And Condition",
                    }}
                >
                <Media query={{maxWidth:small_screen}} render={() =>
                    (
                        <MobileTermsAndCondition />
                    )}
                />
                <Media query={{minWidth:small_screen}} render={() =>
                    (
                        <TermsAndCondition />
                    )}
                />
                </MetaWrapper>
            </div>
        );
    }

}

export default CommonTermsAndCondition;
