import React from "react";
import './MblPaperkraftBrandPage.css';
import {Typography} from "@material-ui/core";


const PaperkraftLogo = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/paperkraft-logo.png'



class MblPaperkraftBrandPage extends React.Component {

    constructor(props){
        super(props);
    }
    componentDidMount() {

        (function ($) {
            /* Store the original positions */
            var d1 = $('.one');
            var d1orgtop = d1.position().top;
            var d2 = $('.two');
            var d2orgtop = d2.position().top;
            var d3 = $('.three');
            var d3orgtop = d3.position().top;
            var d4 = $('.four');
            var d4orgtop = d4.position().top;
            var d5 = $('.five');
            var d5orgtop = d5.position().top;

            /* respond to the scroll event */
            $(window).scroll(function () {
                /* get the current scroll position */
                var st = $(window).scrollTop();

                /* change classes based on section positions */
                if (st >= d1orgtop) {
                    d1.addClass('latched');
                } else {
                    d1.removeClass('latched');
                }
                if (st >= d2orgtop) {
                    d2.addClass('latched');
                } else {
                    d2.removeClass('latched');
                }
                if (st >= d3orgtop) {
                    d3.addClass('latched');
                } else {
                    d3.removeClass('latched');
                }
                if (st >= d4orgtop) {
                    d4.addClass('latched');
                } else {
                    d4.removeClass('latched');
                }
                if (st >= d5orgtop) {
                    d5.addClass('latched');
                } else {
                    d5.removeClass('latched');
                }
            });

        })(window.jQuery);

}

    Readmore() {
        var dots = document.getElementById("TextDots");
        var moreText = document.getElementById("TextMore");
        var readMoreBtn = document.getElementById("readMoreBtn");
        var readLessBtn = document.getElementById("readLessBtn");

        if (dots.style.display === "none") {
            dots.style.display = "inline";
            readMoreBtn.style.display = "flex";
            readLessBtn.style.display = "none";
            moreText.style.display = "none";
        } else {
            dots.style.display = "none";
            readLessBtn.style.display = "flex";
            readMoreBtn.style.display = "none";
            moreText.style.display = "inline";
        }
    }

    render() {
        return (

            <>

                <div className="MblPaperkraftbtmPage" style={{
                    backgroundColor: "#ffffff",
                    backgroundRepeat: 'no-repeat', height: "100%"
                }}>
                    <img src={PaperkraftLogo} className="paperkraft_logo"/>
                    <img src='https://cls-cdn-wip.sgp1.cdn.digitaloceanspaces.com/live/assets/front/PK Mobile.png' className="PaperkraftmobileBrangImg"/>
                    <Typography variant="h4">About Paperkraft</Typography>
                    <p>Paperkraft, by ITC, was launched in 2002, with the Green Impression Series range of notebooks. By
                        2008, it evolved into a standalone premium stationery brand that<span id="TextDots">...</span>
                        <span id="TextMore"> focused on being environmentally friendly and green conscious. Its philosophy, as well as its products, have evolved over the years; the constant being that it strives to offer products that are meant for truly discerning professionals, to add style and sophistication to their lives. Since 2005, Paperkraft expanded its portfolio to include Signature Series NoteBooks, Twin Ruling Notebooks, Signature Series PU Cover Notebooks, and Yearless Diaries in its endeavour to cater to the growing market of professionals. What makes every Paperkraft product so special? It's what, in a sense, makes you who you are as well. You are a true professional and you always demand more from yourself. You aim to set the benchmark and not just to achieve it. Every product from Paperkraft is the culmination of meticulous research, the finest materials and immaculate design brought to life by quality craftsmanship. After all, we understand what it means to speak your language, The Language Of Professionals</span>
                    </p>
                    <button className="readMoreBtn" onClick={this.Readmore} id="readMoreBtn"><span>Read more</span>
                    </button>
                    <button className="readLessBtn" onClick={this.Readmore} id="readLessBtn"><span>Read less</span>
                    </button>
                </div>
                <div className="spacer"/>

                <div className="one" onScroll='Animation();'>

                    <div className="PaperkrafScrollsectionDiv " style={{marginTop: "56px"}}>
                        <Typography className="PaperkraftbrandTitle" variant="h5">Signature Colour Series</Typography>
                        <Typography className="PaperkrafbrandSubTitle">Starting from <b>₹275</b></Typography>
                        <img src='https://cls-cdn-wip.sgp1.cdn.digitaloceanspaces.com/live/assets/front/paperkraft1.png' className="mblPaperkraftNotebookSeries"/>
                        {/*<span className="sec1Blob"/>*/}
                        <span style={{display: "block", marginTop: "20px", padding: '10px'}}>
                            <button className="PaperkraftBrandBtn"  onClick={(event) => {
                                this.props.GotoCategoryPage(event, 1)
                            }}>VIEW PRODUCTS</button>
                        </span>
                    </div>

                </div>

                <div className="spacer"/>
                <div className="two">

                    <div className="PaperkrafScrollsectionDiv" style={{marginTop: "56px"}}>
                        <Typography className="PaperkraftbrandTitle" variant="h5">Signature Series</Typography>
                        <Typography className="PaperkrafbrandSubTitle">Starting from <b>₹275</b></Typography>
                        <img src='https://cls-cdn-wip.sgp1.cdn.digitaloceanspaces.com/live/assets/front/paperkraft2.png' className="mblPaperkraftNotebookSeries"/>

                        <span style={{display: "block", marginTop: "20px", padding: '10px'}}>
                            <button className="PaperkraftBrandBtn"  onClick={(event) => {
                                this.props.GotoCategoryPage(event, 2)
                            }}>VIEW PRODUCTS</button>
                        </span>
                    </div>
                </div>
                <div className="spacer"/>
                <div className="three">
                    <div className="PaperkrafScrollsectionDiv" style={{marginTop: "56px"}}>
                        <Typography className="PaperkraftbrandTitle" variant="h5">Green Impression Series</Typography>
                        <Typography className="PaperkrafbrandSubTitle">Starting from <b>₹275</b></Typography>
                        <img src='https://cls-cdn-wip.sgp1.cdn.digitaloceanspaces.com/live/assets/front/paperkarft3.png' className="mblPaperkraftNotebookSeries"/>

                        <span style={{display: "block", marginTop: "20px", padding: '10px'}}>
                            <button className="PaperkraftBrandBtn"  onClick={(event) => {
                                this.props.GotoCategoryPage(event, 3)
                            }}>VIEW PRODUCTS</button>
                        </span>
                    </div>
                </div>
                <div className="spacer"/>
                <div className="four">
                    <div className="PaperkrafScrollsectionDiv" style={{marginTop: "56px"}}>
                        <Typography className="PaperkraftbrandTitle" variant="h5">Expression Series</Typography>
                        <Typography className="PaperkrafbrandSubTitle">Starting from <b>₹275</b></Typography>
                        <img src='https://cls-cdn-wip.sgp1.cdn.digitaloceanspaces.com/live/assets/front/paperkraft4.png' className="mblPaperkraftNotebookSeries"/>

                        <span style={{display: "block", marginTop: "20px", padding: '10px'}}>
                            <button className="PaperkraftBrandBtn"  onClick={(event) => {
                                this.props.GotoCategoryPage(event, 4)
                            }}>VIEW PRODUCTS</button>
                        </span>
                    </div>
                </div>
                <div className="spacer"/>
                <div className="five">
                    <div className="PaperkrafScrollsectionDiv" style={{marginTop: "56px"}}>
                        <Typography className="PaperkraftbrandTitle" variant="h5">Seasons Gifting Series</Typography>
                        <Typography className="PaperkrafbrandSubTitle">Starting from <b>₹275</b></Typography>
                        <img src='https://cls-cdn-wip.sgp1.cdn.digitaloceanspaces.com/live/assets/front/paperkraft5.png' className="mblPaperkraftNotebookSeries"/>

                        <span style={{display: "block", marginTop: "20px", padding: '10px'}}>
                            <button className="PaperkraftBrandBtn"  onClick={(event) => {
                                this.props.GotoCategoryPage(event, 5)
                            }}>VIEW PRODUCTS</button>
                         </span>
                    </div>
                </div>

                <div style={{clear: 'both'}}/>
                <div style={{height: '1000px'}}/>
        </>
        )
    }

}

export default MblPaperkraftBrandPage
