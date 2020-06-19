import React from "react";
import Media from 'react-media';
import { small_screen } from '../../variables';
import SingleProductPage from "./SingleProductPage";
import MobileSingleProductPage from "./MobileSingleProductPage";
// import ReactGA from 'react-ga';


class SingleProductPageIndex extends React.Component{

    componentDidMount(){

        // ReactGA.initialize('UA-57376375-16');
        // ReactGA.event({
        //     'page_title' : 'Single product page',
        //     'page_path': window.location.pathname
        // });
    }

    render() {
        return (
            <div>
                <Media query={{maxWidth:small_screen}} render={() =>
                    (
                        <MobileSingleProductPage />
                    )}
                />
                <Media query={{minWidth:small_screen}} render={() =>
                    (
                        <SingleProductPage />
                    )}
                />
            </div>
        );
    }
}
export default SingleProductPageIndex;
