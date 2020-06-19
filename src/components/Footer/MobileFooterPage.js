import React from "react";
import './MobileFooterPage.css'
import {Typography} from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import {Link} from 'react-router-dom';
import {connect} from "react-redux";
import Popup from "../NavBar/Popup";
// import ReactGA from "react-ga";

const Instagram = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/social_instagram_logo.svg';


class MobileFooterPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            openProduct: false,
            openCompany: false,
            openAccount: false,
            openMisc: false,
            showPopup:false

        };
        // this.handleClick = this.handleClick.bind(this)
    }

    handleClick = (menu) => {

        if (menu === "Products") {
            this.setState({
                openProduct: !this.state.openProduct,
            });
        } else if (menu === "Company") {
            this.setState({
                openCompany: !this.state.openCompany,
            });
        } else if (menu === "Misc") {
            this.setState({
                openMisc: !this.state.openMisc
            });
        } else if (menu === "Account") {
            this.setState({

                openAccount: !this.state.openAccount,
            });
        }

    };

    openLoginForm = () => {

        this.setState({
            showPopup:true
        })
    }
    closeLoginForm = () =>{

        this.setState({
            showPopup:false
        })
    }

    sendEventToGA = (category,label) =>{
        // ReactGA.event({
        //     'action':'click',
        //     'category':category,
        //     'label':label,
        //
        // });

    }

    render() {
        const {openProduct, openCompany, openMisc, openAccount} = this.state;


        return (
            <div style={{
                position: 'relative',
                'bottom': ' 0px',
                zIndex : '99'
            }}>
                <footer>
                    <div className="MobileFooterPage">
                        {/*<Typography className="MblFooterTitle">Subscribe and get 15% off on your next order</Typography>*/}
                        {/*<ButtonGroup className="MobileEmailGroup">*/}
                        {/*    <input type="text" className="emailfield" placeholder="Enter Your Email Id" name="email"/>*/}
                        {/*    <button className="subscribeBtn">SUBSCRIBE</button>*/}
                        {/*</ButtonGroup>*/}
                        <List className="footerNavList"
                              component="nav"
                              aria-labelledby="nested-list-subheader"
                        >
                            <div className="NavList">
                                <ListItem button onClick={(event) => {
                                    this.handleClick('Products')
                                }}>
                                    {/*{open ? <ChevronLeftIcon /> : <ExpandMore />}*/}

                                    <ListItemText primary="Products"/>
                                    <i className="ri-arrow-down-s-line"/>
                                </ListItem>
                                <Collapse in={openProduct} timeout="auto" unmountOnExit className='collapseLists'>
                                    <List component="div" disablePadding>
                                        <ListItem onClick={this.SelectDesign}>
                                            <Link to="/classmate-customised-notebooks/select-pages" onClick={()=>this.sendEventToGA('design notebooks','CustomizerFooter')}>
                                                <ListItemText primary="Make Your Notebook"/>
                                            </Link>
                                        </ListItem>
                                        <ListItem onClick={this.SelectDesign}>
                                            <Link to="/classmate-school-and-office-stationery-products" onClick={()=>this.sendEventToGA('Limited Edition Products','LEPFooter')}>
                                                <ListItemText primary="Limited Edition Products"/>
                                            </Link>
                                        </ListItem>
                                        <ListItem onClick={this.SelectDesign}>
                                            <Link to="/classmate-designer-notebooks" onClick={()=>this.sendEventToGA('custom designs','DesignerNBFooter')}>
                                                <ListItemText primary="Custom Designs"/>
                                            </Link>
                                        </ListItem>
                                        {/*<ListItem onClick={this.SelectDesign}>*/}
                                        {/*    <ListItemText primary="Stationeries"/>*/}
                                        {/*</ListItem>*/}
                                        {/*<ListItem onClick={this.SelectDesign}>*/}
                                        {/*    <ListItemText primary="Paperkraft"/>*/}
                                        {/*</ListItem>*/}

                                    </List>
                                </Collapse>
                            </div>
                            <div className="NavList">
                                <ListItem onClick={(event) => {
                                    this.handleClick('Company')
                                }} button>

                                    <ListItemText primary="Company"/>
                                    <i className="ri-arrow-down-s-line"></i>
                                </ListItem>
                                <Collapse in={openCompany} timeout="auto" unmountOnExit className='collapseLists'>
                                    <List component="div" disablePadding>
                                        {/*<ListItem onClick={this.SelectDesign}>*/}
                                        {/*    <ListItemText primary="About Classmate"/>*/}
                                        {/*</ListItem>*/}
                                        {/*<ListItem onClick={this.SelectDesign}>*/}
                                        {/*    <ListItemText primary="About Paperkraft"/>*/}
                                        {/*</ListItem>*/}
                                        {/*<ListItem onClick={this.SelectDesign}>*/}
                                        {/*    <ListItemText primary="Contact Us"/>*/}
                                        {/*</ListItem>*/}
                                        <ListItem onClick={this.SelectDesign}>
                                            <Link to="/press_media">
                                                <ListItemText primary="Press & Media"/>
                                            </Link>
                                        </ListItem>
                                        <ListItem onClick={this.SelectDesign}>
                                            <Link to="/business-inquiry">
                                                <ListItemText primary="Inquiry"/>
                                            </Link>
                                        </ListItem>
                                        <ListItem onClick={this.SelectDesign}>
                                            <a href="https://cdn.classmateshop.co.in/live/assets/31-ITC%20E_Product%20catalogue%20Final_08_02_19.pdf" target="_blank">
                                                <ListItemText primary="Download Catalogue"/>
                                            </a>
                                        </ListItem>

                                    </List>
                                </Collapse>
                            </div>
                            <div className="NavList">
                                <ListItem onClick={(event) => {
                                    this.handleClick('Misc')
                                }} button>
                                    {/*{open ? <ChevronLeftIcon /> : <ExpandMore />}*/}

                                    <ListItemText primary="Misc"/>
                                    <i className="ri-arrow-down-s-line"></i>
                                </ListItem>
                                <Collapse in={openMisc} timeout="auto" unmountOnExit className='collapseLists'>
                                    <List component="div" disablePadding>
                                        <ListItem onClick={this.SelectDesign}>
                                            <Link to="/terms-conditions">
                                                <ListItemText primary="Terms & Conditions"/>
                                            </Link>
                                        </ListItem>
                                        <ListItem onClick={this.SelectDesign}>
                                            <Link to="/terms-conditions">
                                                <ListItemText primary="Privacy Policy"/>
                                            </Link>
                                        </ListItem>
                                        <ListItem onClick={this.SelectDesign}>
                                            <Link to="/terms-conditions">
                                                <ListItemText primary="Return Policy"/>
                                            </Link>
                                        </ListItem>
                                        {/*<ListItem onClick={this.SelectDesign}>*/}
                                        {/*    <a href="https://www.classmateshop.com/d2c/terms-conditions" target="_blank">*/}
                                        {/*        <ListItemText primary="F.A.Q"/>*/}
                                        {/*    </a>*/}
                                        {/*</ListItem>*/}

                                    </List>
                                </Collapse>
                            </div>
                            <div className="NavList">
                                <ListItem onClick={(event) => {
                                    this.handleClick('Account')
                                }} button>
                                    {/*{open ? <ChevronLeftIcon /> : <ExpandMore />}*/}

                                    <ListItemText primary="Account"/>
                                    <i className="ri-arrow-down-s-line"></i>
                                </ListItem>
                                <Collapse in={openAccount} timeout="auto" unmountOnExit className='collapseLists'>
                                    <List component="div" disablePadding>
                                        <ListItem onClick={this.SelectDesign}>
                                            {
                                                this.props.user_details.token ? <Link to="/MyAccount">  <ListItemText primary="My Order" style={{color: '#9ea3a7'}}/></Link>: <ListItemText onClick={this.openLoginForm} primary="My Order"  style={{color: '#9ea3a7'}}/>
                                            }

                                        </ListItem>
                                        {/*<ListItem >*/}
                                        {/*    <Link to="/tracking-orders">*/}
                                        {/*        <ListItemText primary="Track Orders"/>*/}
                                        {/*    </Link>*/}
                                        {/*</ListItem>*/}
                                        {/*<ListItem onClick={this.SelectDesign}>*/}
                                        {/*    <ListItemText primary="Manager Account"/>*/}
                                        {/*</ListItem>*/}
                                    </List>
                                </Collapse>
                            </div>
                        </List>
                        <Typography className="copyRight">Copyright © 2019 ITC Inc. All rights reserved.</Typography>
                    </div>
                    <div className="MobileStickyFooter">
                        <div className="MobilefooterBtmContent">

                            <span>Follow us on</span>
                            <ul style={{display: "flex"}}>
                                <li>
                                    <a href="https://www.facebook.com/Classmate/" target="_blank">
                                        <i className="ri-facebook-box-fill"
                                       style={{color: '#3B5998', fontSize: '30px', paddingRight: '10px'}}/>
                                    </a>
                                </li>
                                <li>
                                    <a href="https://twitter.com/classmatebyitc?lang=en" target="_blank">
                                        <i className="ri-twitter-fill"
                                       style={{color: '#1DA1F2', fontSize: '30px', paddingRight: '10px'}}/>
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.instagram.com/classmatebyitc/" target="_blank">
                                        <img src={Instagram} alt="Instagram" className="social_media_icons"/>

                                        {/*<i className="ri-instagram-fill"*/}
                                        {/*   style={{color: '#1DA1F2', fontSize: '30px', paddingRight: '10px'}}/>*/}
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.youtube.com/channel/UC2XJG6wkwnlJ7xyNzM3ftjg" target="_blank">
                                        <i className="ri-youtube-fill"
                                       style={{color: '#FF0000', fontSize: '30px', paddingRight: ' 10px'}}/>
                                    </a>
                                </li>
                            </ul>
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



export default connect(mapStateToProps)(MobileFooterPage);
