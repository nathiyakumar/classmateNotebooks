import React from "react";
import MobileNavbar from "../../NavBar/MobileNavbar";
import ProductListIndex from "../ProductListIndex";
import MobileFooterPage from "../../Footer/MobileFooterPage";
import AOS from "aos";
import AnimatedSlider from "../../BannerCarousel/AnimatedSlider";

class MobileProductsView extends React.Component{
    state = {
        banners:[
            {
                image_src:'https://cdn.classmateshop.co.in/live/slider/Resuming-op-mobile.jpg',
                route:false,
                link:''
            }
        ]
    };
    componentDidMount() {
        // for animation puspose
        AOS.init({
            duration : 1000
        })
        // for animation puspose
    }
    render() {
        return (
            <div>
                <MobileNavbar />
                <div data-aos='fade-in'>
                    <AnimatedSlider banners={this.state.banners} objectFit={"fill"}/>
                </div>
                <ProductListIndex />
                <MobileFooterPage />
            </div>
        );
    }
}

export default MobileProductsView;
