import React from "react";
import "./ClassmateBrandListIndex.css";
import MetaWrapper from "../../../../Meta/MetaWrapper";
import Media from "react-media";
import {small_screen} from "../../../../variables";
import ClassmateBrand from "../DesktopPage/ClassmateBrand";
import MobileClassmateBrand from "../MobilePage/MobileClassmateBrand";

class ClassmateBrandListIndex extends React.Component{

    render() {
        return (
            <div className="classmate_brand_list_component">
                <MetaWrapper
                    meta={{
                        description: "Order several stationeries at a wholesale price such as 3D Notebooks, Puzzles, Art Stationeries, Pens and Pencils, Geometry boxes at Classmate online store delivering near you.",
                        title: "One Stop Destination to All Your Stationeries at Classmate Store Online",
                    }}
                >
                    <Media query={{maxWidth:small_screen}} render={() =>
                        (
                            <MobileClassmateBrand />
                        )}
                    />
                    <Media query={{minWidth:small_screen}} render={() =>
                        (
                            <ClassmateBrand/>
                        )}
                    />
                </MetaWrapper>

            </div>
        );
    }
}
export default ClassmateBrandListIndex;
