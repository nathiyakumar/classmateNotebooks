import React from "react";
import './footer.css'
import {Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {Link} from 'react-router-dom';
import {connect} from "react-redux";
import Popup from "../NavBar/Popup";
// import ReactGA from "react-ga";

const heartImg = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/heart.png';


class DesktopFooter extends React.Component{

    state = {
        showPopup:false
    };

    openLoginForm = () => {

        this.setState({
            showPopup:true
        })
    };
    closeLoginForm = () =>{

        this.setState({
            showPopup:false
        })
    };

    sendEventToGA = (category,label) =>{
        // ReactGA.event({
        //     'action':'click',
        //     'category':category,
        //     'label':label,
        //
        // });

    };


    render() {
        return(
            <div>
                <footer className="desktopFooter">
                    <div className="footerNavigation">
                        {/*<div className="letsDesign">*/}
                        {/*    <span>*/}
                        {/*    <Typography variant="h6" style={{color:"#fff",padding: '20px 35px 0px 45px'}}>Ready to persionalize your notebook now?</Typography>*/}
                        {/*    <Typography style={{padding: '9px 0px 0px 45px'}}>Let's design!</Typography>*/}
                        {/*    </span>*/}
                        {/*    <span style={{margin: 'auto 0',right: '-39px'}}>*/}
                        {/*    <ButtonGroup variant="contained" style={{color:"#fff"}} aria-label="split button">*/}
                        {/*        <Button className="DesignBtn" style={{color:"#000",backgroundColor:"#fff"}}>Design Now</Button>*/}
                        {/*        <Button className="DesignBtn"*/}
                        {/*                style={{color:"#000",backgroundColor:"#d6d6ff"}}*/}
                        {/*                size="small"*/}
                        {/*                aria-haspopup="true"*/}
                        {/*        >*/}
                        {/*            <i className="ri-arrow-right-up-line" style={{fontSize: '16px'}}></i>*/}
                        {/*        </Button>*/}
                        {/*    </ButtonGroup>*/}

                        {/*    </span>*/}

                        {/*</div>*/}
                        <Grid container spacing={3}>
                            <Grid item xs={1}>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography variant="h6" className="FooterItem">Products</Typography>
                                <ul className="FooterItemList">
                                    <li>
                                        <Link to="/classmate-customised-notebooks/select-pages" onClick={()=>this.sendEventToGA('design notebooks','CustomizerFooter')}>
                                            <Typography>Make Your Notebook</Typography>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/classmate-school-and-office-stationery-products" onClick={()=>this.sendEventToGA('Limited Edition Products','LEPFooter')}>
                                            <Typography>Limited Edition Products</Typography>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/classmate-designer-notebooks" onClick={()=>this.sendEventToGA('custom designs','DesignerNBFooter')}>
                                            <Typography>Custom Designs</Typography>
                                        </Link>
                                    </li>
                                    {/*<li><Typography>Stationeries</Typography></li>*/}
                                    {/*<li><Typography>Paperkraft</Typography></li>*/}
                                </ul>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography variant="h6" className="FooterItem">Company</Typography>
                                <ul className="FooterItemList">
                                    {/*<li><Typography>About Classmate</Typography></li>*/}
                                    {/*<li><Typography>About Paperkraft</Typography></li>*/}
                                    {/*<li><Typography>Contact Us</Typography></li>*/}
                                    <li>
                                        <Link to="/press_media">
                                            <Typography>Press & Media</Typography>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/business-inquiry">
                                            <Typography>Inquiry</Typography>
                                        </Link>
                                    </li>
                                    <li>
                                        <a href="https://cdn.classmateshop.co.in/live/assets/31-ITC%20E_Product%20catalogue%20Final_08_02_19.pdf" target="_blank">
                                            <Typography> Download Catalogue</Typography>
                                        </a>
                                    </li>


                                </ul>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography variant="h6" className="FooterItem">Misc</Typography>
                                <ul className="FooterItemList">
                                    <li>
                                        <Link to="/terms-conditions">
                                            <Typography>Terms & Conditions</Typography>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/terms-conditions">
                                            <Typography>Privacy Policy</Typography>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/terms-conditions">
                                            <Typography>Return Policy</Typography>
                                        </Link>
                                    </li>
                                    {/*<li>*/}
                                    {/*    <a href="https://www.classmateshop.com/d2c/terms-conditions" target="_blank">*/}
                                    {/*        <Typography>F.A.Q</Typography>*/}
                                    {/*    </a>*/}
                                    {/*</li>*/}
                                </ul>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography variant="h6" className="FooterItem">Account</Typography>
                                <ul className="FooterItemList">
                                    <li>
                                        {
                                            this.props.user_details.token ? <Link to="/MyAccount"> <Typography style={{cursor:"pointer"}}>My Orders</Typography></Link>:<Typography onClick={this.openLoginForm} style={{cursor:"pointer"}}>My Orders</Typography>
                                        }

                                    </li>
                                    {/*<li>*/}
                                    {/*    <Link to="/tracking-orders">*/}
                                    {/*        <Typography  style={{cursor:"pointer"}}>Track Orders</Typography>*/}
                                    {/*    </Link>*/}
                                    {/*</li>*/}
                                    {/*<li><Typography>Track My Orders</Typography></li>*/}
                                    {/*<li><Typography>Manager Account</Typography></li>*/}
                                </ul>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography variant="h6" className="FooterItem"> Follow us on</Typography>
                                <ul className="FooterItemList" style={{ display: "flex"}}>
                                    <li>
                                        <a href="https://www.facebook.com/Classmate/" target="_blank">
                                            <i className="ri-facebook-box-fill" style={{color:'#fff',fontSize: '30px',paddingRight: '10px'}}/>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://twitter.com/classmatebyitc?lang=en" target="_blank">
                                             <i className="ri-twitter-fill"  style={{color: '#fff',fontSize: '30px',paddingRight: '10px'}}/>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.instagram.com/classmatebyitc/" target="_blank">
                                            <i className="ri-instagram-fill"  style={{color: '#fff',fontSize: '30px',paddingRight: '10px'}}/>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.youtube.com/channel/UC2XJG6wkwnlJ7xyNzM3ftjg" target="_blank">
                                             <i className="ri-youtube-fill"  style={{color: '#fff',fontSize: '30px',paddingRight:' 10px'}}/>
                                        </a>
                                    </li>
                                </ul>
                            </Grid>
                            <Grid item xs={1}>
                            </Grid>
                        </Grid>
                    </div>

                    <div className="stickyFooter">
                        <div className="footerBtmContent">

                            <span className="leftContent" ><span>Copyright © 2019 ITC Ltd. All rights reserved.</span></span>
                            <span className="rightContent"><span>Crafted with<span><img src={heartImg} style={{width:' 17px', height: '14px',marginLeft: '9px'}}/></span></span></span>
                        </div>
                    </div>

                </footer>
                {this.state.showPopup ?
                    <Popup  closeLoginForm={this.closeLoginForm} completeLogin={this.completeLogin} goToMyorders="true"/>
                    : null
                }
            </div>
        )
    }

}

const mapStateToProps = state => ({
    user_details:state.UserReducer.user_details
})



export default connect(mapStateToProps)(DesktopFooter);
