import React from "react";
import './BannerCarousel.css';
import  NukaCarousel, {CarouselProps} from 'nuka-carousel';
import Box from "@material-ui/core/Box";

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


class BannerCarousel extends React.Component{

    carousel = (slides: number) => (
        <NukaCarousel
            className="carousel"
            slidesToShow={slides}
            slidesToScroll={slides}
            renderBottomCenterControls={({previousSlide,currentSlide}) => null}
            renderCenterLeftControls={({previousSlide, currentSlide}) => (
                // currentSlide !== 0 ? (
                    <Box component="div" onClick={previousSlide} className="carousel__control carousel__control--left">
                        {/*<img src={arrowImg} alt="arrowImg"/>*/}
                        <ArrowBackIcon className="banner_arrows"/>
                    </Box>
                // ) : null
            )}
            renderCenterRightControls={({nextSlide, currentSlide, slideCount, slidesToShow,}) =>
                // slideCount - slidesToShow !== currentSlide ? (
                    <Box component="div"  onClick={nextSlide} className="carousel__control carousel__control--right">
                        {/*<img src={arrowImg} alt="arrowImg"/>*/}
                        <ArrowForwardIcon className="banner_arrows"/>
                    </Box>
                // ):null
            }>
            {this.props.children}
        </NukaCarousel>
    );


    render() {
        return (
            <div>
                {
                    this.carousel(1)
                }
            </div>
        );
    }
}

export default BannerCarousel;
