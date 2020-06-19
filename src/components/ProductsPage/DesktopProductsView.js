import React from "react";
import Navbar from "../NavBar/Navbar";
import ProductListIndex from "./ProductListIndex";
import DesktopFooter from "../Footer/footer";

import AnimatedSlider from "../BannerCarousel/AnimatedSlider";
import AOS from 'aos';


class DesktopProductsView extends React.Component{

    state = {
        banners:[
            // {
            //     image_src:'https://cls-cdn-wip.sgp1.cdn.digitaloceanspaces.com/live/assets/front/LEP_banner1.jpg',
            //     route:false,
            //     link:''
            // },
            {
                image_src:'https://cdn.classmateshop.co.in/live/slider/Resuming_LEP_banner.jpg',
                route:false,
                link:''
            },
            // {
            //     image_src:'https://cls-cdn-wip.sgp1.cdn.digitaloceanspaces.com/live/assets/front/LEP_banner2.jpg',
            //     route:false,
            //     link:''
            // },
            // {
            //     image_src:'https://cls-cdn-wip.sgp1.cdn.digitaloceanspaces.com/live/assets/front/LEP_banner3.jpg',
            //     route:false,
            //     link:''
            // },
            // {
            //     image_src:'https://cls-cdn-wip.sgp1.cdn.digitaloceanspaces.com/live/assets/front/LEP_banner4.jpg',
            //     route:false,
            //     link:''
            // },
            // {
            //     image_src:'https://cls-cdn-wip.sgp1.cdn.digitaloceanspaces.com/live/assets/front/LEP_banner5.jpg',
            //     route:false,
            //     link:''
            // },
            // {
            //     image_src:'https://cls-cdn-wip.sgp1.cdn.digitaloceanspaces.com/live/assets/front/LEP_banner6.jpg',
            //     route:false,
            //     link:''
            // }
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
            <div className="desktop_products_page">
                <Navbar />
                <div data-aos='fade-in' style={{marginTop:' 50px'}}>
                    <AnimatedSlider banners={this.state.banners} objectFit={"fill"}/>
                </div>
                {/*<BannerCarousel>*/}
                {/*    <img src={LEP_banner1} alt="Banner1" style={{width:'100%'}}/>*/}
                {/*    <img src={LEP_banner2} alt="Banner1" style={{width:'100%'}}/>*/}
                {/*    <img src={LEP_banner3} alt="Banner1" style={{width:'100%'}}/>*/}
                {/*    <img src={LEP_banner4} alt="Banner1" style={{width:'100%'}}/>*/}
                {/*    <img src={LEP_banner5} alt="Banner1" style={{width:'100%'}}/>*/}
                {/*    <img src={LEP_banner6} alt="Banner1" style={{width:'100%'}}/>*/}
                {/*</BannerCarousel>*/}
                <ProductListIndex />
                <div data-aos='fade-in'>
                    <DesktopFooter />
                </div>
            </div>
        );
    }
}
export default DesktopProductsView;
