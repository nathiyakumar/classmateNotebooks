import React from "react";
import './LandingPages.css';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";


import OwlCarousel from "react-owl-carousel";
import {withRouter} from 'react-router-dom'
import {Link} from 'react-router-dom';
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const Classmate_Logo = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/classmate_logo.jpg';
const Line_img = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/brush-line.svg';
const NoteBook1 = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/christmas_nb1.png';
const NoteBook2 = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/christmas_nb2.png';
const NoteBook3 = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/christmas_nb3.png';
const NoteBook4 = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/christmas_nb4.png';
const NoteBook5 = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/christmas_nb5.png';
const Snow = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/snow.svg';




class LandingPages extends React.Component {
    render() {
        return (
            <>
                <Grid container style={{margin: '0px'}}>
                    <Grid item sm={6} xs={12} className="grid" style={{padding: '0px'}}>
                        <div className="landing-page-header">
                            <Link to="/"><img src={Classmate_Logo} alt="classmate logo"/></Link>
                        </div>
                        <div className="landing-page-content">
                            <h1>Make Someone Feel <span style={{display: 'inline-grid'}}>Special <img
                                style={{width: "100%"}} src={Line_img} alt="lineImg"/></span> This Christmas!</h1>

                            <p className="landing-page-subtitle">Gift your loved ones our Christmas themed
                                notebooks.</p>

                            <div className="ContentSteps"
                                 style={{display: "flex", alignItems: 'center'}}
                            >
                                <div  style={{display: "flex", alignItems: 'center'}}>
                                     <span style={{display: "flex", justifyContent: 'center', marginBottom: '10px',marginRight: '10px',
                                         alignItems: 'center'}}>
                                    <div className="landing-page-step">1</div>
                                    <span className="step_span">Choose Varient</span>
                                   <i className="ri-arrow-right-line" style={{
                                       marginLeft: '10px',
                                       marginRight: '10px',
                                       position: 'relative',
                                       top: '4px'
                                   }}/>
                                </span>
                                    <span style={{display: "flex", justifyContent: 'center', marginBottom: '10px',
                                        alignItems: 'center'}}>
                                <div className="landing-page-step">2</div>
                                    <span className="step_span">Upload Image</span>
                                   <i className="ri-arrow-right-line" style={{
                                       marginLeft: '10px',
                                       marginRight: '10px',
                                       position: 'relative',
                                       top: '4px'
                                   }}/>
                                </span>
                                </div>
                                {/*<span style={{display: "flex", justifyContent: 'center', marginBottom: '10px'}}>*/}
                                {/*    <div className="landing-page-step">1</div>*/}
                                {/*    <span className="step_span">Choose Varient</span>*/}
                                {/*   <i className="ri-arrow-right-line" style={{*/}
                                {/*       marginLeft: '10px',*/}
                                {/*       marginRight: '10px',*/}
                                {/*       position: 'relative',*/}
                                {/*       top: '4px'*/}
                                {/*   }}/>*/}
                                {/*</span>*/}
                                {/*<span style={{display: "flex", justifyContent: 'center', marginBottom: '10px'}}>*/}
                                {/*<div className="landing-page-step">2</div>*/}
                                {/*    <span className="step_span">Upload Image</span>*/}
                                {/*   <i className="ri-arrow-right-line" style={{*/}
                                {/*       marginLeft: '10px',*/}
                                {/*       marginRight: '10px',*/}
                                {/*       position: 'relative',*/}
                                {/*       top: '4px'*/}
                                {/*   }}/>*/}
                                {/*</span>*/}
                                <span style={{display: "flex", justifyContent: 'center', marginBottom: '10px', alignSelf: 'center', alignItems: 'center'}}>
                                   <div className="landing-page-step">3</div>
                                    <span className="step_span">Place Order</span>
                                </span>

                            </div>

                            <p className="landing-page-subtitle1">Pack of 6 starts from Rs.450/&#42;</p>
                            <Button className="buy-Button" onClick={() => {
                                this.props.history.push('/classmate-customised-notebooks/select-pages');
                            }}>GIFT YOUR NOTEBOOK NOW</Button>
                        </div>
                        <div className="landing_image">
                            <OwlCarousel
                                className="owl-theme"
                                loop={true}
                                margin={10}
                                smartSpeed={5000}
                                autoplay={true}
                                dots={false}
                                items={2}
                                style={{transform: 'rotate(-90deg)'}}

                            >
                                <img src={NoteBook1} className="item"
                                     style={{width: '85%', transform: 'rotate(90deg)'}} alt="NoteBook1"/>
                                <img src={NoteBook2} className="item"
                                     style={{width: '85%', transform: 'rotate(90deg)'}} alt="NoteBook2"/>
                                <img src={NoteBook3} className="item"
                                     style={{width: '85%', transform: 'rotate(90deg)'}} alt="NoteBook3"/>
                                <img src={NoteBook4} className="item"
                                     style={{width: '85%', transform: 'rotate(90deg)'}} alt="NoteBook4"/>
                                <img src={NoteBook5} className="item"
                                     style={{width: '85%', transform: 'rotate(90deg)'}} alt="NoteBook5"/>
                            </OwlCarousel>
                        </div>
                    </Grid>
                    <Grid item sm={6} xs={12} className="grid  landingBg">
                        <div className="landingBg_left">
                            <div className='left-snow'>
                                <img src={Snow} alt='snow'/>
                            </div>
                            <Button className="buy-Button-mbl" onClick={() => {
                                this.props.history.push('/classmate-customised-notebooks/select-pages');
                            }}>
                                 <span style={{display: ' flex', justifyContent: 'space-around'}}>
                                     <span style={{
                                         letterSpacing: ' 2px'
                                     }}> CUSTOMIZE NOW</span>
                                     <i className="ri-arrow-right-line" style={{marginLeft: '25px'}}/>
                                 </span>
                            </Button>
                            <p className="landing-page-subtitle1_mbl">Pack of 6 starts from Rs.450/&#42;</p>

                        </div>
                        <div className="customise_btn_div" onClick={() => {
                            this.props.history.push('/classmate-customised-notebooks/select-pages');
                        }}>
                             <span style={{
                                 display: ' flex', justifyContent: 'space-around', alignItems: 'center',
                                 height: '100%'
                             }}>
                                    CUSTOMIZE NOW
                                     <i className="ri-arrow-right-line" style={{marginLeft: '25px'}}/>
                                 </span>
                        </div>

                    </Grid>
                </Grid>

            </>
        );
    }
}

export default withRouter(LandingPages);
