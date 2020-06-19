import React from "react";
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import {Link} from 'react-router-dom';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);


class AnimatedSlider extends React.Component{

    state = {
        index: 0,
    };

    handleChangeIndex = index => {
        this.setState({
            index,
        });
    };



    render() {

        const { index } = this.state;
        return (
            <div>
                <AutoPlaySwipeableViews index={index} onChangeIndex={this.handleChangeIndex} enableMouseEvents>
                    {this.props.banners.map((item, index) =>
                        <div key={index}>
                            {
                                item.route === true ? (
                                    <>
                                        {
                                            this.props.sendEventToGA ? <Link to={item.link} onClick={()=>this.props.sendEventToGA(item.gaCategory,item.galabel)}>
                                                <img src={item.image_src} alt="Banner1" style={{width:'100%',height:'100%',objectFit:this.props.objectFit}}/>
                                            </Link> : <Link to={item.link} >
                                                <img src={item.image_src} alt="Banner1" style={{width:'100%',height:'100%',objectFit:this.props.objectFit}}/>
                                            </Link>
                                        }
                                    </>



                                ) : (
                                    <>
                                        {
                                            item.link !== ''?(<a href={item.link} target="_blank"  rel="noopener noreferrer" >
                                                <img src={item.image_src} alt="Banner1" style={{width:'100%',height:'100%',objectFit:this.props.objectFit}}/>
                                            </a>):<img src={item.image_src} alt="Banner1" style={{width:'100%',height:'100%',objectFit:this.props.objectFit}}/>
                                        }
                                    </>

                                )
                            }
                        </div>)}
                </AutoPlaySwipeableViews>
            </div>
        );
    }
}

export default AnimatedSlider;
