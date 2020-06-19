import React from "react";
import Media from 'react-media';
import { small_screen } from '../../variables';
import DesktopProductsView from "./DesktopProductsView";
import MobileProductsView from "./MobileProductsPage/MobileProductsView";
import MetaWrapper from "../../Meta/MetaWrapper";
// import ReactGA from "react-ga";

class ProductsPage extends React.Component{

    componentWillMount(){
        // ReactGA.set({
        //     location: `${window.location.origin}${window.location.pathname}${window.location.search}`,
        //     title: "Buy Office & School Stationeries in Wholesale Price at Classmate Stationery Store Online"
        // });
        //
        // ReactGA.pageview(window.location.pathname);
    }

    render() {
        return (
            <div>
                <MetaWrapper
                    meta={{
                        description: "Order office, school stationeries in wholesale price at Classmate store for Pulse Notebooks, 3D Notebooks, Themed Geometry boxes, Professional Diaries & Notepads.",
                        title: "Buy Office & School Stationeries in Wholesale Price at Classmate Stationery Store Online",
                    }}
                >
                <Media query={{maxWidth:small_screen}} render={() =>
                    (
                        <MobileProductsView />
                    )}
                />
                <Media query={{minWidth:small_screen}} render={() =>
                    (
                        <DesktopProductsView />
                    )}
                />
                </MetaWrapper>
            </div>
        );
    }
}

export default ProductsPage;
