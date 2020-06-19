import React from "react";
import Media from 'react-media';
import { small_screen } from '../../../variables';
import ClassmateBrandSingleProduct from "./DesktopPage/ClassmateBrandSingleProduct";
import MobileClassmateBrandSingleProduct from "./MobilePage/MobileClassmateBrandSingleProduct";
class ClassmateBrandSingleProductIndex extends React.Component{


    render() {
        return (
            <div>
                <Media query={{maxWidth:small_screen}} render={() =>
                    (
                        <MobileClassmateBrandSingleProduct />
                    )}
                />
                <Media query={{minWidth:small_screen}} render={() =>
                    (
                        <ClassmateBrandSingleProduct />
                    )}
                />
            </div>
        );
    }
}
export default ClassmateBrandSingleProductIndex;
