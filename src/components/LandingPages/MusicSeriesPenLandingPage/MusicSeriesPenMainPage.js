import React from "react";
import MetaWrapper from "../../../Meta/MetaWrapper";
import Media from "react-media";
import {small_screen} from "../../../variables";
import MusicSeriesPenLandingDesktop from './MusicSeriesPenLandingDesktop'
import MusicSeriesPenLandingMbl from "./MusicSeriesPenLandingMbl"
// import ReactGA from "react-ga";


class MusicSeriesPenMainPage extends React.Component {

    componentWillMount() {
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
                            description: 'Paperkraft premium pens for Premium Writing Experience. Aesthetically Enhanced Writing Instruments for Exuberant Experience. Near the sticky buy now button, mention the content "starting at Rs.1400"',
                            title: "Premium Paperkraft Callista & Scepter Pen.",
                        }}
                    >
                        <Media query={{maxWidth: small_screen}} render={() =>
                            (
                                <MusicSeriesPenLandingMbl/>
                            )}
                        />
                        <Media query={{minWidth: small_screen}} render={() =>
                            (
                                <MusicSeriesPenLandingDesktop/>
                            )}
                        />
                    </MetaWrapper>
                </div>
            </div>
        );
    }
}

export default MusicSeriesPenMainPage
