import React from "react";
import Media from 'react-media';
import { small_screen } from '../../variables';
import CustomDesignProductList from "./CustomDesignProductList";
import MobileCustomDesignProductList from "./MobileCustomDesignProductList";
import MetaWrapper from "../../Meta/MetaWrapper";


class CustomDesignProductListIndex extends React.Component{
    render() {
        return (
            <div>
                <MetaWrapper
                    meta={{
                        description: "Find Classmate designer notebooks delivering near you at Classmate store online with customization features such as Size, Binding, Number of Pages and Ruling.",
                        title: "Buy Designer Notebooks Online - Colorful Notebooks at Classmate Store",
                    }}
                >
                <Media query={{maxWidth:small_screen}} render={() =>
                    (
                        <MobileCustomDesignProductList />
                    )}
                />
                <Media query={{minWidth:small_screen}} render={() =>
                    (
                        <CustomDesignProductList />
                    )}
                />
                </MetaWrapper>
            </div>
        );
    }
}
export default CustomDesignProductListIndex;
