import React from "react";
import Media from 'react-media';
import { small_screen } from '../../variables';
import MblBrandPage from './MblBrandPage';
import DesktopAboutusPage from './DesktopAboutusPage';
import MetaWrapper from "../../Meta/MetaWrapper";


class ClassmateBrandPageIndex extends React.Component{


    render() {
        return (
            <div>
                <MetaWrapper
                    meta={{
                        description: "Order several stationeries at a wholesale price such as 3D Notebooks, Puzzles, Art Stationeries, Pens and Pencils, Geometry boxes at Classmate online store delivering near you.",
                        title: "One Stop Destination to All Your Stationeries at Classmate Store Online",
                    }}
                >
                <Media query={{maxWidth:small_screen}} render={() =>
                    (
                        <MblBrandPage />
                    )}
                />
                <Media query={{minWidth:small_screen}} render={() =>
                    (
                        <DesktopAboutusPage />
                    )}
                />
                </MetaWrapper>
            </div>
        );
    }
}
export default ClassmateBrandPageIndex;
