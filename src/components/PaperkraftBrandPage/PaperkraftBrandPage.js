import React from "react";
import './PaperkraftBrandPage.css';

import {Typography} from "@material-ui/core";


class PaperkraftBrandPage  extends React.Component{



    render() {
        return(

            <div className="PaperkraftBrandPage">

                <div className="accordion">
                    <ul>
                        { this.props.categories.map((item , index) => {

                            return <li style={{backgroundColor: item.backgroundColor}} key={index}>
                                    <span className="leftSideBrandSec">
                                    <img src={item.image} className="paperkraftBrandImg" alt={"paperkraftBrandImg"}/>
                                        <div>
                                            <a  className="sliderLink">
                                                <Typography variant="h2">{item.name}</Typography>
                                                <p className="BrandPrice">Starting from <span>{item.Price}</span></p>
                                                    <button className="PaperkraftBrandBtn" onClick={(event) => {
                                                        this.props.GotoCategoryPage(event, item.id)
                                                    }}>VIEW CATEGORY</button>
                                            </a>
                                        </div>
                                    </span>
                                </li>

                        })}
                    </ul>
                </div>

            </div>
        )
    }
}

export default PaperkraftBrandPage
