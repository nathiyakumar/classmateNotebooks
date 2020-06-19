import React, { Component } from "react";
import './MobileNavbar.css';
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import {Link} from "react-router-dom";
import AuthContext from "../AuthProvider/auth-context";
import CartContext from "../CartProvider/cart-context";
import Badge from "@material-ui/core/Badge/Badge";

import Drawer from "@material-ui/core/Drawer";


import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Collapse from "@material-ui/core/Collapse";
import ReactSlidingPane from "../SlidingPanel/SlidingPanel";
import ShoppingCart from "../shoppingCart/shoppingCart";
import {UserLoggedout} from "../../Actions/non_customiser_action";
import {compose} from "redux";
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom';
import Popup from "./Popup";
import MenuItem from "@material-ui/core/MenuItem";

import {AddOrderData, AddToCart} from "../../Actions/non_customiser_action";
import {clearNotebookSpecifications} from '../../Actions/index';
// import ReactGA from 'react-ga';

import cogoToast from 'cogo-toast';



const CartIcon = "https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/cart-icon.svg";
const userImg = "https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/user.svg";
const UserAvator = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/user_avator.png';



const styles = theme => ({
    appBar: {
        backgroundColor:'#061922',
        zIndex: theme.zIndex.drawer + 1001,
        [theme.breakpoints.up('sm')]: {
            padding:'0 16%'
        },
        position: 'relative',
    },
    toolbar: theme.mixins.toolbar,
    grow: {
        flexGrow: 1,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    subnested:{
        paddingLeft: theme.spacing(6),
    },
    drawerPaper: {
        height: "100%",
        backgroundColor: '#072533',
        zIndex: theme.zIndex.drawer + 1000,
    }
});


class MobileNavbar extends Component {

    static contextType  = CartContext;

    state = {
        open:false,
        side:'left',
        openCateory1:false,
        openCateory2:false,
        openCateory3:false,
        openCateory4:false,
        openSlidingPanel:false,
        openMyaccount:false,
        showPopup:false,
        openSubCateory1:false,
        openSubCateory2:false
    }


    toggleDrawer = (side) => {
        this.setState({
            open:!this.state.open,
            side:side
        })
    }

    handleCategoryClick = (value) => {

        this.setState({
            [value]:!this.state[value]
        })

    };

    generateCategoryUrl = (category_name,category_id) => {
        return `/category/${category_name}/${category_id}/`;

    }

    openCartSlidingPane = () => {
        this.setState({
            openSlidingPanel:true
        })
    }

    closeCartSlidingpane = () => {
        this.setState({
            openSlidingPanel:false
        })
    }
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
    sendEventToGA = (category,label) => {

        // ReactGA.event({
        //     'action':'click',
        //     'category':category,
        //     'label':label,
        //
        // });

    }

    render() {
        const {classes} = this.props;
        return (
            <AuthContext.Consumer>
                {
                    AuthProviderData => {
                        const { logged_in,user_details } = AuthProviderData;
                        return(
                            <div className="mobile_navbar">
                                <marquee className="marq" bgcolor="Green" direction="left" loop="" style={{ display:  this.state.open === true? 'none': 'flex'}}>
                                    <div className="geek1">
                                        {/* Amidst COVID-19 restrictions, your delivery would be delayed
                                        by atleast 10-15 days as per prevaling situvations. We will keep you updated.
                                        Let us all stay safe and take necessary precautions! */}

Classmate is taking orders again! Get all your favorite stationery delivered at your doorstep. Orders for personalized notebooks will be resumed soon.
                                    </div>
                                </marquee>
                                    <AppBar className={classes.appBar} style={{backgroundColor:'#061922'}}>
                                        <Toolbar>
                                            <IconButton edge="start"  color="inherit" aria-label="menu" onClick={() => this.toggleDrawer('top')}>
                                                {
                                                    this.state.open === true? <CloseIcon />: <MenuIcon />
                                                }


                                            </IconButton>
                                            <Link to={"/"}>
                                                <img src='https://cls-cdn-wip.sgp1.cdn.digitaloceanspaces.com/live/assets/front/cm_logo.svg' alt="classmate_logo" className="mobile_logo"/>
                                            </Link>
                                            <div className={classes.grow} />
                                            <CartContext.Consumer>

                                                {
                                                    CartProvider => {
                                                        let cart_count = CartProvider.cart_data && CartProvider.cart_data.checkoutQuantity?CartProvider.cart_data.checkoutQuantity:0;
                                                        return(
                                                            <>
                                                                <IconButton aria-label="show 4 new mails" color="inherit" onClick={this.openCartSlidingPane}>
                                                                    <Badge badgeContent={CartProvider.cart_data && CartProvider.cart_data.checkoutQuantity?CartProvider.cart_data.checkoutQuantity:0} className="mobile_cart_count_badge" color="secondary">
                                                                        <img src={CartIcon} />
                                                                    </Badge>
                                                                </IconButton>
                                                                {

                                                                    this.state.openSlidingPanel === true?
                                                                        <ReactSlidingPane
                                                                            isOpen={this.state.openSlidingPanel}
                                                                            title={'YOUR CART ('+cart_count+' Item)'}
                                                                            onRequestClose={this.closeCartSlidingpane} >
                                                                            <ShoppingCart />
                                                                        </ReactSlidingPane>:null
                                                                }
                                                            </>
                                                        )
                                                    }
                                                }

                                            </CartContext.Consumer>
                                            {
                                                logged_in?null:
                                                    <>
                                                        <IconButton aria-label="show 4 new mails" color="inherit" onClick={this.openLoginForm}>
                                                            <img src={userImg} alt="userimg"/>
                                                        </IconButton>
                                                        {this.state.showPopup ?
                                                            <Popup  closeLoginForm={this.closeLoginForm}/>
                                                            : null
                                                        }
                                                    </>
                                            }
                                        </Toolbar>
                                    </AppBar>
                                <Drawer
                                    anchor={this.state.side}
                                    open={this.state.open}
                                    onClose={() => this.toggleDrawer('top')}
                                    variant="persistent"
                                    classes={{
                                        paper: classes.drawerPaper,
                                    }}
                                >
                                    <div className={classes.toolbar} />
                                    <div>
                                       <div className="login_user_details">
                                           <div className="user_avator">
                                                <img src={UserAvator} alt="userimage"/>
                                           </div>
                                           {
                                               logged_in?<p>Hi {user_details.user.firstName}</p>:<p>Hi User</p>
                                           }
                                       </div>
                                        <div className="mobile_category_list">
                                            <List
                                                component="nav"
                                                aria-labelledby="nested-list-subheader" >

                                                <ListItem button style={{borderBottom:'1px solid #ffffff6b'}} onClick={() => {
                                                    this.toggleDrawer('top')}}>
                                                    <Link to="/">
                                                        <ListItemText primary="Home" />
                                                    </Link>
                                                </ListItem>
                                                <ListItem button style={{borderBottom:'1px solid #ffffff6b'}} onClick={() => {
                                                    this.toggleDrawer('top')}}>
                                                    <Link to="" onClick={()=>{cogoToast.info("Orders for personalized notebooks will be resumed soon.", { position: 'top-center'})}}>
                                                        <ListItemText id="main_menu_make_your_notebook" primary="Make Your Notebook" />
                                                    </Link>
                                                </ListItem>
                                                <ListItem button onClick={() => {
                                                    this.handleCategoryClick('openCateory1');
                                                    this.sendEventToGA('custom designs','DesignerNBHeader');
                                                }} style={{borderBottom:'1px solid #ffffff6b'}}>
                                                    <ListItemText primary="Custom designs" id="main_menu_custom_designs" />
                                                    {this.state.openCateory1 ? <RemoveIcon /> : <AddIcon />}
                                                </ListItem>
                                                <Collapse in={this.state.openCateory1} timeout="auto" unmountOnExit>
                                                    <List component="div" disablePadding>
                                                        <ListItem button className={classes.nested} onClick={() => this.handleCategoryClick('openSubCateory1')} style={{borderBottom:'1px solid #ffffff6b'}}>
                                                                <ListItemText primary="Disney Marvel Designs" />
                                                            {this.state.openSubCateory1 ? <RemoveIcon /> : <AddIcon />}
                                                        </ListItem>
                                                        <Collapse in={this.state.openSubCateory1} timeout="auto" unmountOnExit>
                                                            <List component="div" disablePadding>
                                                                <ListItem button className={classes.subnested}>
                                                                    <a onClick={() => {
                                                                        this.toggleDrawer('top');
                                                                        this.props.history.push('/classmate-designer-notebooks/Avengers',{ category_id: "TGljZW5zZWREZXNpZ25Cb29rc0NhdGVnb3J5VHlwZToy" });
                                                                    }}>
                                                                        <ListItemText primary="Avengers" />
                                                                    </a>
                                                                </ListItem>
                                                                <ListItem button className={classes.subnested}>
                                                                    <a onClick={() => {
                                                                        this.toggleDrawer('top');
                                                                        this.props.history.push('/classmate-designer-notebooks/End Game',{ category_id: "TGljZW5zZWREZXNpZ25Cb29rc0NhdGVnb3J5VHlwZTo1" });
                                                                    }}>
                                                                        <ListItemText primary="End Game" />
                                                                    </a>
                                                                </ListItem>
                                                                {/*<ListItem button className={classes.subnested} >*/}
                                                                {/*    <Link to="/classmate-designer-notebooks">*/}
                                                                {/*        <ListItemText primary="Infinty War" />*/}
                                                                {/*    </Link>*/}
                                                                {/*</ListItem>*/}
                                                                <ListItem button className={classes.subnested}>
                                                                    <a onClick={() => {
                                                                        this.toggleDrawer('top');
                                                                        this.props.history.push('/classmate-designer-notebooks/Captain Marvel',{ category_id: "TGljZW5zZWREZXNpZ25Cb29rc0NhdGVnb3J5VHlwZToz" });
                                                                    }}>
                                                                        <ListItemText primary="Captain Marvel" />
                                                                    </a>
                                                                </ListItem>
                                                                {/*<ListItem button className={classes.subnested} >*/}
                                                                {/*    <Link to="/classmate-designer-notebooks">*/}
                                                                {/*        <ListItemText primary="AntMan and the WASP" />*/}
                                                                {/*    </Link>*/}
                                                                {/*</ListItem>*/}
                                                            </List>
                                                        </Collapse>
                                                        <ListItem button className={classes.nested} onClick={() => this.handleCategoryClick('openSubCateory2')} style={{borderBottom:'1px solid #ffffff6b'}}>
                                                            <ListItemText primary="Disney Design" />
                                                            {this.state.openSubCateory2 ? <RemoveIcon /> : <AddIcon />}
                                                        </ListItem>
                                                        <Collapse in={this.state.openSubCateory2} timeout="auto" unmountOnExit>
                                                            <List component="div" disablePadding>
                                                                <ListItem button className={classes.subnested}>
                                                                    <a onClick={() => {
                                                                        this.toggleDrawer('top');
                                                                        this.props.history.push('/classmate-designer-notebooks/Incredibles',{ category_id: "TGljZW5zZWREZXNpZ25Cb29rc0NhdGVnb3J5VHlwZTo5" });
                                                                    }}>
                                                                        <ListItemText primary="Incredibles 2" />
                                                                    </a>
                                                                </ListItem>
                                                                {/*<ListItem button className={classes.subnested} >*/}
                                                                {/*    <Link to="/classmate-designer-notebooks">*/}
                                                                {/*        <ListItemText primary="Frozen" />*/}
                                                                {/*    </Link>*/}
                                                                {/*</ListItem>*/}
                                                            </List>
                                                        </Collapse>
                                                        <ListItem button className={classes.nested} style={{borderBottom:'1px solid #ffffff6b'}}>
                                                            <a onClick={() => {
                                                                this.toggleDrawer('top');
                                                                this.props.history.push('/classmate-designer-notebooks/Football',{ category_id: "TGljZW5zZWREZXNpZ25Cb29rc0NhdGVnb3J5VHlwZTo3" });
                                                            }}>
                                                                <ListItemText primary="Football" />
                                                            </a>
                                                        </ListItem>
                                                        <ListItem button className={classes.nested} style={{borderBottom:'1px solid #ffffff6b'}}>
                                                            <a onClick={() => {
                                                                this.toggleDrawer('top');
                                                                this.props.history.push('/classmate-designer-notebooks/Christmas',{ category_id: "TGljZW5zZWREZXNpZ25Cb29rc0NhdGVnb3J5VHlwZTo0" });
                                                            }}>
                                                                <ListItemText primary="Christmas" />
                                                            </a>
                                                        </ListItem>
                                                        <ListItem button className={classes.nested} style={{borderBottom:'1px solid #ffffff6b'}}>
                                                            <a onClick={() => {
                                                                this.toggleDrawer('top');
                                                                this.props.history.push('/classmate-designer-notebooks/Fathers Day',{ category_id: "TGljZW5zZWREZXNpZ25Cb29rc0NhdGVnb3J5VHlwZTo2" });
                                                            }}>
                                                                <ListItemText primary="Fathers Day" />
                                                            </a>
                                                        </ListItem>
                                                        <ListItem button className={classes.nested} style={{borderBottom:'1px solid #ffffff6b'}}>
                                                            <a onClick={() => {
                                                                this.toggleDrawer('top');
                                                                this.props.history.push('/classmate-designer-notebooks/Generic',{ category_id: "TGljZW5zZWREZXNpZ25Cb29rc0NhdGVnb3J5VHlwZTo4" });
                                                            }}>
                                                                <ListItemText primary="Generic" />
                                                            </a>
                                                        </ListItem>
                                                        <ListItem button className={classes.nested} style={{borderBottom:'1px solid #ffffff6b'}}>
                                                            <a onClick={() => {
                                                                this.toggleDrawer('top');
                                                                this.props.history.push('/classmate-designer-notebooks/Autism Society WB',{ category_id: "TGljZW5zZWREZXNpZ25Cb29rc0NhdGVnb3J5VHlwZToxMQ==" });
                                                            }}>
                                                                <ListItemText primary="Autism Society WB" />
                                                            </a>
                                                        </ListItem>
                                                        {/*<ListItem button className={classes.nested} style={{borderBottom:'1px solid #ffffff6b'}}>*/}
                                                        {/*    <a onClick={() => {*/}
                                                        {/*        this.toggleDrawer('top');*/}
                                                        {/*        this.props.history.push('/classmate-designer-notebooks/Independence Day',{ category_id: "TGljZW5zZWREZXNpZ25Cb29rc0NhdGVnb3J5VHlwZToxMA==" });*/}
                                                        {/*    }}>*/}
                                                        {/*        <ListItemText primary="Independence Day" />*/}
                                                        {/*    </a>*/}
                                                        {/*</ListItem>*/}
                                                    </List>
                                                </Collapse>
                                                <ListItem button style={{borderBottom:'1px solid #ffffff6b'}} onClick={() => {
                                                    this.sendEventToGA('Limited Edition Products','LEPHeader');
                                                    this.toggleDrawer('top')}}>
                                                    <Link to="/classmate-school-and-office-stationery-products">
                                                        <ListItemText id="main_menu_limited_edition_products" primary="Buy Stationery Products" />
                                                    </Link>
                                                </ListItem>
                                                <ListItem button onClick={() => this.handleCategoryClick('openCateory2')} style={{borderBottom:'1px solid #ffffff6b'}}>
                                                        <ListItemText primary="Our Portfolio" />
                                                    {this.state.openCateory2 ? <RemoveIcon /> : <AddIcon />}
                                                </ListItem>
                                                <Collapse in={this.state.openCateory2} timeout="auto" unmountOnExit>
                                                    <List component="div" disablePadding>
                                                        <ListItem button className={classes.nested} onClick={() => {
                                                            this.toggleDrawer('top')}}>
                                                            <Link to="/classmate-office-and-school-stationeries"  style={{padding: 0}}>
                                                                <ListItemText primary="Classmate" />
                                                            </Link>
                                                        </ListItem>
                                                        <ListItem button className={classes.nested} onClick={() => {
                                                            this.toggleDrawer('top')}}>
                                                            <Link to="/paperkraft-notebook-series">
                                                                <ListItemText primary="Paperkraft" />
                                                            </Link>
                                                        </ListItem>
                                                    </List>
                                                </Collapse>
                                                <ListItem button style={{borderBottom:'1px solid #ffffff6b'}} onClick={() => {
                                                    this.toggleDrawer('top')}}>
                                                    <Link to="/business-inquiry">
                                                        <ListItemText primary="Inquiry" />
                                                    </Link>
                                                </ListItem>
                                                {/*<ListItem button style={{borderBottom:'1px solid #ffffff6b'}} onClick={() => {*/}
                                                {/*    this.toggleDrawer('top')}}>*/}
                                                {/*    <Link to="/tracking-orders">*/}
                                                {/*        <ListItemText primary="Track Orders" />*/}
                                                {/*    </Link>*/}
                                                {/*</ListItem>*/}




















                                                {/*<ListItem button style={{borderBottom:'1px solid #ffffff6b'}}>*/}
                                                {/*    <Link to="/classmate-designer-notebooks">*/}
                                                {/*        <ListItemText primary="Themed Notebooks" />*/}
                                                {/*    </Link>*/}
                                                {/*</ListItem>*/}
                                                {/*<ListItem button onClick={() => this.handleCategoryClick('openCateory1')} style={{borderBottom:'1px solid #ffffff6b'}}>*/}
                                                {/*    <ListItemText primary="Classmate Notebooks" />*/}
                                                {/*    {this.state.openCateory1 ? <RemoveIcon /> : <AddIcon />}*/}
                                                {/*</ListItem>*/}
                                                {/*<Collapse in={this.state.openCateory1} timeout="auto" unmountOnExit>*/}
                                                {/*    <List component="div" disablePadding>*/}
                                                {/*        <ListItem button className={classes.nested}>*/}
                                                {/*            <Link to={this.generateCategoryUrl("Long Notebook","Q2F0ZWdvcnlUeXBlOjEx")}>*/}
                                                {/*                <ListItemText primary="Long Notebook" />*/}
                                                {/*            </Link>*/}
                                                {/*        </ListItem>*/}
                                                {/*        <ListItem button className={classes.nested} >*/}
                                                {/*            <Link to={this.generateCategoryUrl("Practical Notebook","Q2F0ZWdvcnlUeXBlOjEy")}>*/}
                                                {/*                <ListItemText primary="Practical Notebook" />*/}
                                                {/*            </Link>*/}
                                                {/*        </ListItem>*/}
                                                {/*        <ListItem button className={classes.nested}>*/}
                                                {/*            <Link to={this.generateCategoryUrl("Pocket Notebok","Q2F0ZWdvcnlUeXBlOjEz")}>*/}
                                                {/*                <ListItemText primary="Pocket Notebook" />*/}
                                                {/*            </Link>*/}
                                                {/*        </ListItem>*/}
                                                {/*        <ListItem button className={classes.nested} >*/}
                                                {/*            <Link to={this.generateCategoryUrl("Drawing Book","Q2F0ZWdvcnlUeXBlOjE0")}>*/}
                                                {/*                <ListItemText primary="Drawing Book" />*/}
                                                {/*            </Link>*/}
                                                {/*        </ListItem>*/}
                                                {/*        <ListItem button className={classes.nested} >*/}
                                                {/*            <Link to={this.generateCategoryUrl("Accountancy Book","Q2F0ZWdvcnlUeXBlOjE1")}>*/}
                                                {/*                <ListItemText primary="Accountancy Book" />*/}
                                                {/*            </Link>*/}
                                                {/*        </ListItem>*/}
                                                {/*        <ListItem button className={classes.nested} >*/}
                                                {/*            <Link to={this.generateCategoryUrl("Classmate Spiral Notebook","Q2F0ZWdvcnlUeXBlOjI=")}>*/}
                                                {/*                <ListItemText primary="Classmate Spiral Notebook" />*/}
                                                {/*            </Link>*/}
                                                {/*        </ListItem>*/}
                                                {/*        <ListItem button className={classes.nested}>*/}
                                                {/*            <Link to={this.generateCategoryUrl("Classmate Puzles Notebook","Q2F0ZWdvcnlUeXBlOjM=")}>*/}
                                                {/*                <ListItemText primary="Classmate Puzles Notebook" />*/}
                                                {/*            </Link>*/}
                                                {/*        </ListItem>*/}
                                                {/*    </List>*/}
                                                {/*</Collapse>*/}
                                                {/*<ListItem button onClick={() => this.handleCategoryClick('openCateory2')} style={{borderBottom:'1px solid #ffffff6b'}}>*/}
                                                {/*    <ListItemText primary="Writing Instruments" />*/}
                                                {/*    {this.state.openCateory2 ? <RemoveIcon /> : <AddIcon />}*/}
                                                {/*</ListItem>*/}
                                                {/*<Collapse in={this.state.openCateory2} timeout="auto" unmountOnExit>*/}
                                                {/*    <List component="div" disablePadding>*/}
                                                {/*        <ListItem button className={classes.nested}>*/}
                                                {/*            <Link to={this.generateCategoryUrl("Pen","Q2F0ZWdvcnlUeXBlOjU=")}>*/}
                                                {/*                <ListItemText primary="Pen" />*/}
                                                {/*            </Link>*/}
                                                {/*        </ListItem>*/}
                                                {/*    </List>*/}
                                                {/*</Collapse>*/}
                                                {/*<ListItem button onClick={() => this.handleCategoryClick('openCateory3')} style={{borderBottom:'1px solid #ffffff6b'}}>*/}
                                                {/*    <ListItemText primary="Mathamatical Instuments" />*/}
                                                {/*    {this.state.openCateory3 ? <RemoveIcon /> : <AddIcon />}*/}
                                                {/*</ListItem>*/}
                                                {/*<Collapse in={this.state.openCateory3} timeout="auto" unmountOnExit>*/}
                                                {/*    <List component="div" disablePadding>*/}
                                                {/*        <ListItem button className={classes.nested} >*/}
                                                {/*            <Link to={this.generateCategoryUrl("Geometry Box","Q2F0ZWdvcnlUeXBlOjg=")}>*/}
                                                {/*                <ListItemText primary="Geometry Box" />*/}
                                                {/*            </Link>*/}
                                                {/*        </ListItem>*/}
                                                {/*        <ListItem button className={classes.nested}>*/}
                                                {/*            <Link to={this.generateCategoryUrl("Scale","Q2F0ZWdvcnlUeXBlOjk=")}>*/}
                                                {/*                <ListItemText primary="Scale" />*/}
                                                {/*            </Link>*/}
                                                {/*        </ListItem>*/}
                                                {/*    </List>*/}
                                                {/*</Collapse>*/}
                                                {/*<ListItem button onClick={() => this.handleCategoryClick('openCateory4')} style={{borderBottom:'1px solid #ffffff6b'}}>*/}
                                                {/*    <ListItemText primary="Art Stationery" />*/}
                                                {/*    {this.state.openCateory4 ? <RemoveIcon /> : <AddIcon />}*/}
                                                {/*</ListItem>*/}
                                                {/*<Collapse in={this.state.openCateory4} timeout="auto" unmountOnExit>*/}
                                                {/*    <List component="div" disablePadding>*/}
                                                {/*        <ListItem button className={classes.nested} >*/}
                                                {/*            <Link to={this.generateCategoryUrl("Sketch","Q2F0ZWdvcnlUeXBlOjIx")}>*/}
                                                {/*                <ListItemText primary="Sketch" />*/}
                                                {/*            </Link>*/}
                                                {/*        </ListItem>*/}
                                                {/*        <ListItem button className={classes.nested} >*/}
                                                {/*            <Link to={this.generateCategoryUrl("Cryons","Q2F0ZWdvcnlUeXBlOjE4")}>*/}
                                                {/*                <ListItemText primary="Cryons" />*/}
                                                {/*            </Link>*/}
                                                {/*        </ListItem>*/}
                                                {/*        <ListItem button className={classes.nested}>*/}
                                                {/*            <Link to={this.generateCategoryUrl("Oil Pastels","Q2F0ZWdvcnlUeXBlOjE5")}>*/}
                                                {/*                <ListItemText primary="Oil Pastels" />*/}
                                                {/*            </Link>*/}
                                                {/*        </ListItem>*/}
                                                {/*    </List>*/}
                                                {/*</Collapse>*/}
                                                {/*<ListItem button style={{borderBottom:'1px solid #ffffff6b'}}>*/}
                                                {/*    <Link to="/classmate-office-and-school-stationeries">*/}
                                                {/*        <ListItemText primary="Paperkraft" />*/}
                                                {/*    </Link>*/}
                                                {/*</ListItem>*/}
                                                {
                                                    logged_in?(
                                                        <>
                                                            <ListItem button onClick={() => this.handleCategoryClick('openMyaccount')} style={{borderBottom:'1px solid #ffffff6b'}}>
                                                                <ListItemText primary="My Account" />
                                                                {this.state.openMyaccount ? <RemoveIcon /> : <AddIcon />}
                                                            </ListItem>
                                                            <Collapse in={this.state.openMyaccount} timeout="auto" unmountOnExit>
                                                                <List component="div" disablePadding>
                                                                    <ListItem button className={classes.nested}  onClick={() => {
                                                                        this.props.history.push('/MyAccount');
                                                                    }}>
                                                                            <ListItemText primary="My Orders" />
                                                                    </ListItem>
                                                                    <ListItem button className={classes.nested} onClick={() => {
                                                                        localStorage.clear();
                                                                        let logout = {}
                                                                        this.context.addCartData({});
                                                                        this.props.sendUserLoggedoutDatasToStore(logout);
                                                                        this.props.sendCartDatasToStore({});
                                                                        this.props.sendOrderDatasToStore({});
                                                                        this.props.clearSpecsFromStore('clear');

                                                                        this.props.history.push('/');
                                                                        AuthProviderData.LoggedOut();

                                                                        this.toggleDrawer('top');
                                                                    }} >
                                                                        <ListItemText primary="Logout" />
                                                                    </ListItem>
                                                                </List>
                                                            </Collapse>
                                                        </>
                                                    ):null
                                                }
                                            </List>
                                        </div>

                                    </div>
                                </Drawer>
                            </div>
                        )
                    }
                }
            </AuthContext.Consumer>
        );
    }
}

// export default withStyles(styles)(MobileNavbar);

const mapStateToProps = state => ({
    cart_data:state.CartReducer.cart_data
})

const mapDispatchToProps = dispatch => ({
    sendUserLoggedoutDatasToStore: loggedout => dispatch(UserLoggedout(loggedout)),
    sendCartDatasToStore: (cart_data) => dispatch(AddToCart(cart_data)),
    sendOrderDatasToStore: order_data => dispatch(AddOrderData(order_data)),
    clearSpecsFromStore: data => dispatch(clearNotebookSpecifications(data))
})


export default compose(
    withRouter,
    connect(mapStateToProps,mapDispatchToProps)
)(withStyles(styles)(MobileNavbar));



