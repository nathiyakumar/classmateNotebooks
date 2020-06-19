import React from 'react';
import DesktopHome from "./components/Home/DesktopHome";
import Media from 'react-media';
import { small_screen } from './variables';
import MobileHomePage from "./components/Home/MobileHomePage";
import MetaWrapper from "./Meta/MetaWrapper";

class App extends React.Component{

    render() {
        return (
            <div>
                <MetaWrapper
                    meta={{
                        description: "Find Classmate notebooks & stationeries delivering near you in wholesale price at Classmate store for Pens, Mechanical pencils, Geometry box, Stationery kit, Professional Notebooks and more",
                        title: "Buy Classmate Stationery Online in Wholesale Price",
                    }}
                >
                    <Media query={{maxWidth:small_screen}} render={() =>
                        (
                            <MobileHomePage />
                        )}
                    />
                    <Media query={{minWidth:small_screen}} render={() =>
                        (
                            <DesktopHome />
                        )}
                    />
                </MetaWrapper>
            </div>
        );
    }

}
export default App;
