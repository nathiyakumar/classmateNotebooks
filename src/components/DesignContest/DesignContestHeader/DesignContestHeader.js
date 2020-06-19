import React, {useEffect} from 'react';
import {fade, makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import './DesignContestHeader.css'
import Popup from "../Popup";
import AuthContext from "../../AuthProvider/auth-context";
import CartContext from "../../CartProvider/cart-context";
import {connect} from 'react-redux'
import {UserLoggedout} from '../../../Actions/non_customiser_action';
import {withRouter} from 'react-router-dom';
import {compose} from 'redux';
import {Link} from 'react-router-dom';
import * as PropTypes from "prop-types";
import Tooltip from "@material-ui/core/Tooltip";
import {AddOrderData, AddToCart} from "../../../Actions/non_customiser_action";
import {clearNotebookSpecifications} from '../../../Actions/index';
// import ReactGA from 'react-ga';
import $ from 'jquery';

const useStyles = makeStyles(theme => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    },
    sectionDesktop: {
        // display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
}));

function DesignContestHeaders(props) {


    let contextType = CartContext;


    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const [openSlidingPanel, setopenSlidingPanel] = React.useState(false);

    const [cart_count, setcart_count] = React.useState(0);

    const [authenticated, setauthenticated] = React.useState(false);
    const [username, setusername] = React.useState('');


    const [showPopup, setshowPopup] = React.useState(false);


    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    useEffect(() => {

        // var cart = $('.shopping-cart');

        // localStorage.setItem('cart_top_position', cart.offset().top);
        // localStorage.setItem('cart_left_position', cart.offset().left);
        //
        // let cart_count = props.cart_data && props.cart_data.checkoutQuantity ? props.cart_data.checkoutQuantity : 0;
        //
        // setcart_count(cart_count);

    }, []);


    function openLoginForm() {

        setshowPopup(true);
    }

    function closeLoginForm() {

        setshowPopup(false);
    }

    function handleProfileMenuOpen(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleMobileMenuClose() {
        setMobileMoreAnchorEl(null);
    }

    function handleMenuClose() {
        setAnchorEl(null);
        handleMobileMenuClose();
    }

    function handleMobileMenuOpen(event) {
        setMobileMoreAnchorEl(event.currentTarget);
    }

    function openCartSlidingPane() {


        // if(localStorage.getItem('cart_count')){
        setopenSlidingPanel(true);
        // }


    }

    function generateCategoryUrl(category_name, category_id) {

        return `/category/${category_name}/${category_id}/`;

    }

    function closeCartSlidingpane() {
        setopenSlidingPanel(false);
    }

    function sendEventToGA(category, label) {

        // ReactGA.event({
        //     'action':'click',
        //     'category':category,
        //     'label':label,
        //
        // });

    }


    const menuId = 'primary-search-account-menu';


    const mobileMenuId = 'primary-search-account-menu-mobile';


    return (
        <AuthContext.Consumer>

            {AuthProviderData => {
                const {logged_in, user_details} = AuthProviderData;
                return (
                    <>


                        <div className="DesktopNav">
                            <div className="MainNav">
                                <div style={{
                                    height: '50px',
                                    position: 'fixed',
                                    zIndex: '1000'
                                }}>
                                    {/*<marquee className="marq" bgcolor="Green" direction="left" loop="" >*/}
                                    {/*    <div className="geek1">Amidst COVID-19 restrictions, your delivery would be*/}
                                    {/*        delayed by at least 10-15 days as per prevailing situations. We will keep*/}
                                    {/*        you updated. Let us all stay safe and take the necessary precautions!*/}
                                    {/*    </div>*/}
                                    {/*</marquee>*/}
                                    <AppBar position="static" className="desktopAppBar">
                                        <Toolbar className="toolBar">
                                            <div className={classes.title}>
                                                <Link to="/">
                                                    <img className="AppLogo"
                                                         src='https://cls-cdn-wip.sgp1.cdn.digitaloceanspaces.com/live/assets/front/cm_logo.svg'
                                                         style={{width: '150px', cursor: 'pointer'}}/>
                                                </Link>
                                            </div>
                                            {/*<div className={classes.search}>*/}
                                            {/*    <div className={classes.searchIcon}>*/}
                                            {/*        <SearchIcon />*/}
                                            {/*    </div>*/}
                                            {/*    <InputBase*/}
                                            {/*        placeholder="Search"*/}
                                            {/*        classes={{*/}
                                            {/*            root: classes.inputRoot,*/}
                                            {/*            input: classes.inputInput,*/}
                                            {/*        }}*/}
                                            {/*        inputProps={{ 'aria-label': 'search' }}*/}
                                            {/*    />*/}
                                            {/*</div>*/}
                                            <div className={classes.grow}/>
                                            <div className="NavBtn">
                                                <div className="TrackOrderBtnContent" onClick={() => {
                                                    props.history.push('/tracking-orders');
                                                }}>Design Challenge
                                                </div>

                                            </div>
                                            <div className="NavBtn">
                                                <div onClick={() => {
                                                    props.history.push('/classmate-customised-notebooks/select-pages');
                                                }}>How it Works
                                                </div>

                                            </div>
                                            <div className="NavBtn">
                                                <div onClick={() => {
                                                    props.history.push('/classmate-customised-notebooks/select-pages');
                                                }}>FAQ
                                                </div>

                                            </div>
                                            <div className="NavBtn">
                                                <div onClick={() => {
                                                    props.history.push('/classmate-customised-notebooks/select-pages');
                                                }}>Terms & Conditions
                                                </div>

                                            </div>
                                            <div className={classes.sectionDesktop}>

                                                {/*<CartContext.Consumer>*/}

                                                {/* {*/}
                                                {/*        CartProvider => {*/}
                                                {/*     contextType = CartProvider;*/}
                                                {/*      return (*/}
                                                {/*          <>*/}
                                                {/*                 <ArrowTooltip title="Cart">*/}
                                                {/*                        <IconButton aria-label="show 4 new mails"*/}
                                                {/*                                color="inherit"*/}
                                                {/*                                    onClick={openCartSlidingPane}*/}
                                                {/*                                    className="shopping-cart"*/}
                                                {/*                        >*/}
                                                {/*                            <Badge*/}
                                                {/*                                badgeContent={CartProvider.cart_data && CartProvider.cart_data.checkoutQuantity ? CartProvider.cart_data.checkoutQuantity : 0}*/}
                                                {/*                                color="secondary">*/}
                                                {/*                                <img src={CartIcon}/>*/}
                                                {/*                            </Badge>*/}
                                                {/*                        </IconButton>*/}
                                                {/*                    </ArrowTooltip>*/}
                                                {/*                </>*/}
                                                {/*            )*/}
                                                {/*        }*/}
                                                {/*    }*/}

                                                {/*</CartContext.Consumer>*/}

                                                {
                                                    logged_in ?
                                                        <>
                                                            <IconButton aria-label="show 4 new mails" color="inherit"
                                                                        onClick={handleProfileMenuOpen}
                                                                        style={{cursor: 'pointer'}}>
                                                                {/*<Badge badgeContent={cart_count} color="secondary">*/}
                                                                <Typography
                                                                    className="userAccount">Hi {user_details.user.firstName}</Typography>
                                                                <span className="DownArrow"
                                                                      onClick={handleProfileMenuOpen}><i
                                                                    className="ri-arrow-down-s-line"></i></span>
                                                                {/*</Badge>*/}
                                                            </IconButton>
                                                        </>
                                                        :
                                                        <>
                                                            <ArrowTooltip title="Login">
                                                                <IconButton aria-label="show 4 new mails"
                                                                            color="inherit"
                                                                            onClick={openLoginForm}
                                                                            style={{cursor: 'pointer'}}>
                                                                    {/*<Badge badgeContent={cart_count} color="secondary">*/}
                                                                    {/*<img src={userImg}/>*/}
                                                                    <span
                                                                    style={{fontSize: '16px', marginLeft: '10px'}}>Login/Sign Up</span>
                                                                    {/*</Badge>*/}
                                                                </IconButton>
                                                            </ArrowTooltip>
                                                            {/*<IconButton aria-label="show 4 new mails" color="inherit" onClick={openLoginForm} style={{cursor:'pointer',fontSize:'15px'}}>*/}
                                                            {/*    /!*<Badge badgeContent={cart_count} color="secondary">*!/*/}
                                                            {/*   Login/Sign Up*/}
                                                            {/*    /!*</Badge>*!/*/}
                                                            {/*</IconButton>*/}

                                                            {showPopup ?
                                                                <Popup closeLoginForm={closeLoginForm}/>
                                                                : null
                                                            }
                                                        </>
                                                }
                                            </div>
                                        </Toolbar>
                                    </AppBar>
                                </div>

                                {/*desktop menu*/}

                                <Menu
                                    anchorEl={anchorEl}
                                    anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                                    id={menuId}
                                    keepMounted
                                    transformOrigin={{vertical: 'top', horizontal: 'right'}}
                                    open={isMenuOpen}
                                    onClose={handleMenuClose}
                                >
                                    {/*<MenuItem onClick={handleMenuClose}>Profile</MenuItem>*/}

                                    {
                                        props.user_details.user && props.user_details.user.isAdmin === false && props.user_details.user.isVendor === false ? (
                                            <MenuItem onClick={() => {
                                                props.history.push('/MyAccount');
                                            }}>My Account</MenuItem>) : null

                                    }

                                    <MenuItem onClick={() => {

                                        localStorage.clear();
                                        let logout = {};
                                        // contextType.addCartData({})
                                        props.sendUserLoggedoutDatasToStore(logout);
                                        props.sendCartDatasToStore({});
                                        props.sendOrderDatasToStore({});
                                        props.clearSpecsFromStore('clear');

                                        props.history.push('/');
                                        AuthProviderData.LoggedOut();

                                        handleMenuClose();
                                    }}>Logout</MenuItem>
                                </Menu>
                            </div>


                            {/*<nav className="nav" style={{position: 'relative', top: '50px', zIndex: '100'}}>*/}
                            {/*    <ul className="nav__menu">*/}
                            {/*        <li className="nav__menu-item">*/}
                            {/*            <Link to="/">*/}
                            {/*                <span className="menuList">Home</span>*/}
                            {/*            </Link>*/}
                            {/*        </li>*/}
                            {/*        <li className="nav__menu-item">*/}
                            {/*            <Link to="/classmate-customised-notebooks/select-pages"*/}
                            {/*                  onClick={() => sendEventToGA('design notebook', 'CustomizerHeader')}>*/}
                            {/*                <span className="menuList" id="main_menu_make_your_notebook">Make Your Notebook</span>*/}
                            {/*            </Link>*/}
                            {/*        </li>*/}
                            {/*        <li className="nav__menu-item">*/}
                            {/*            <Link to="/classmate-designer-notebooks"*/}
                            {/*                  onClick={() => sendEventToGA('custom designs', 'DesignerNBHeader')}>*/}
                            {/*                <span className="menuList" id="main_menu_custom_designs"> Custom designs*/}
                            {/*                    <span>*/}
                            {/*                        <img className="arrowDown" src={arrowDown}/>*/}
                            {/*                    </span>*/}
                            {/*                </span>*/}
                            {/*            </Link>*/}
                            {/*            <ul className="nav__submenu">*/}
                            {/*                <li className="nav__submenu-item">*/}
                            {/*                    <ul className="nav_sub__submenu">*/}
                            {/*                        <li className="nav_sub__submenu-item">*/}
                            {/*                            <a onClick={() => {*/}
                            {/*                                props.history.push('/classmate-designer-notebooks/Avengers', {category_id: "TGljZW5zZWREZXNpZ25Cb29rc0NhdGVnb3J5VHlwZToy"});*/}
                            {/*                            }}>*/}
                            {/*                                <span className="menuList">Avengers</span>*/}
                            {/*                            </a>*/}
                            {/*                        </li>*/}
                            {/*                        <li className="nav_sub__submenu-item">*/}
                            {/*                            <a onClick={() => {*/}
                            {/*                                props.history.push('/classmate-designer-notebooks/End Game', {category_id: "TGljZW5zZWREZXNpZ25Cb29rc0NhdGVnb3J5VHlwZTo1"});*/}
                            {/*                            }}>*/}
                            {/*                                <span className="menuList">End Game</span>*/}
                            {/*                            </a>*/}
                            {/*                        </li>*/}
                            {/*                        /!*<li className="nav_sub__submenu-item">*!/*/}
                            {/*                        /!*    <Link to="/classmate-designer-notebooks">*!/*/}
                            {/*                        /!*        <span className="menuList">Infinty War</span>*!/*/}
                            {/*                        /!*    </Link>*!/*/}
                            {/*                        /!*</li>*!/*/}
                            {/*                        <li className="nav_sub__submenu-item">*/}
                            {/*                            <a onClick={() => {*/}
                            {/*                                props.history.push('/classmate-designer-notebooks/Captain Marvel', {category_id: "TGljZW5zZWREZXNpZ25Cb29rc0NhdGVnb3J5VHlwZToz"});*/}
                            {/*                            }}>*/}
                            {/*                                <span className="menuList">Captain Marvel</span>*/}
                            {/*                            </a>*/}
                            {/*                        </li>*/}
                            {/*                        /!*<li className="nav_sub__submenu-item">*!/*/}
                            {/*                        /!*    <Link to="/classmate-designer-notebooks">*!/*/}
                            {/*                        /!*        <span className="menuList">AntMan and the WASP</span>*!/*/}
                            {/*                        /!*    </Link>*!/*/}
                            {/*                        /!*</li>*!/*/}
                            {/*                    </ul>*/}
                            {/*                    <a>*/}
                            {/*                        <span className="menuList">Disney Marvel Designs</span>*/}
                            {/*                    </a>*/}
                            {/*                </li>*/}
                            {/*                <li className="nav__submenu-item">*/}
                            {/*                    <ul className="nav_sub__submenu">*/}
                            {/*                        <li className="nav_sub__submenu-item">*/}
                            {/*                            <a onClick={() => {*/}
                            {/*                                props.history.push('/classmate-designer-notebooks/Incredibles', {category_id: "TGljZW5zZWREZXNpZ25Cb29rc0NhdGVnb3J5VHlwZTo5"});*/}
                            {/*                            }}>*/}
                            {/*                                <span className="menuList">Incredibles 2</span>*/}
                            {/*                            </a>*/}
                            {/*                        </li>*/}
                            {/*                        /!*<li className="nav_sub__submenu-item">*!/*/}
                            {/*                        /!*    <Link to="/classmate-designer-notebooks">*!/*/}
                            {/*                        /!*        <span className="menuList">Frozen</span>*!/*/}
                            {/*                        /!*    </Link>*!/*/}
                            {/*                        /!*</li>*!/*/}
                            {/*                    </ul>*/}
                            {/*                    <a>*/}
                            {/*                        <span className="menuList">Disney Design</span>*/}
                            {/*                    </a>*/}
                            {/*                </li>*/}
                            {/*                <li className="nav__submenu-item">*/}
                            {/*                    <a onClick={() => {*/}
                            {/*                        props.history.push('/classmate-designer-notebooks/Football', {category_id: "TGljZW5zZWREZXNpZ25Cb29rc0NhdGVnb3J5VHlwZTo3"});*/}
                            {/*                    }}>*/}
                            {/*                        <span className="menuList">Football</span>*/}
                            {/*                    </a>*/}
                            {/*                </li>*/}
                            {/*                <li className="nav__submenu-item">*/}
                            {/*                    <a onClick={() => {*/}
                            {/*                        props.history.push('/classmate-designer-notebooks/Christmas', {category_id: "TGljZW5zZWREZXNpZ25Cb29rc0NhdGVnb3J5VHlwZTo0"});*/}
                            {/*                    }}>*/}
                            {/*                        <span className="menuList">Christmas</span>*/}
                            {/*                    </a>*/}
                            {/*                </li>*/}
                            {/*                <li className="nav__submenu-item">*/}
                            {/*                    <a onClick={() => {*/}
                            {/*                        props.history.push('/classmate-designer-notebooks/Fathers Day', {category_id: "TGljZW5zZWREZXNpZ25Cb29rc0NhdGVnb3J5VHlwZTo2"});*/}
                            {/*                    }}>*/}
                            {/*                        <span className="menuList">Fathers Day</span>*/}
                            {/*                    </a>*/}
                            {/*                </li>*/}
                            {/*                <li className="nav__submenu-item">*/}
                            {/*                    <a onClick={() => {*/}
                            {/*                        props.history.push('/classmate-designer-notebooks/Generic', {category_id: "TGljZW5zZWREZXNpZ25Cb29rc0NhdGVnb3J5VHlwZTo4"});*/}
                            {/*                    }}>*/}
                            {/*                        <span className="menuList">Generic</span>*/}
                            {/*                    </a>*/}
                            {/*                </li>*/}
                            {/*                <li className="nav__submenu-item">*/}
                            {/*                    <a onClick={() => {*/}
                            {/*                        props.history.push('/classmate-designer-notebooks/Autism Society WB', {category_id: "TGljZW5zZWREZXNpZ25Cb29rc0NhdGVnb3J5VHlwZToxMQ=="});*/}
                            {/*                    }}>*/}
                            {/*                        <span className="menuList">Autism Society WB</span>*/}
                            {/*                    </a>*/}
                            {/*                </li>*/}
                            {/*                /!*<li className="nav__submenu-item">*!/*/}
                            {/*                /!*    <a onClick={() => {*!/*/}
                            {/*                /!*        props.history.push('/classmate-designer-notebooks/Independence Day',{ category_id: "TGljZW5zZWREZXNpZ25Cb29rc0NhdGVnb3J5VHlwZToxMA==" });*!/*/}
                            {/*                /!*    }}>*!/*/}
                            {/*                /!*        <span className="menuList">Independence Day</span>*!/*/}
                            {/*                /!*    </a>*!/*/}
                            {/*                /!*</li>*!/*/}
                            {/*            </ul>*/}
                            {/*        </li>*/}
                            {/*        <li className="nav__menu-item">*/}
                            {/*            <Link to="/classmate-school-and-office-stationery-products"*/}
                            {/*                  onClick={() => sendEventToGA('Limited Edition Products', 'LEPHeader')}>*/}
                            {/*                <span className="menuList" id="main_menu_limited_edition_products">Limited Edition Products</span>*/}
                            {/*            </Link>*/}
                            {/*        </li>*/}
                            {/*        <li className="nav__menu-item">*/}
                            {/*                <span className="menuList"> Our Portfolio*/}
                            {/*                    <span>*/}
                            {/*                        <img className="arrowDown" src={arrowDown}/>*/}
                            {/*                    </span>*/}
                            {/*                </span>*/}
                            {/*            <ul className="nav__submenu">*/}
                            {/*                <li className="nav__submenu-item">*/}
                            {/*                    <Link to="/classmate-office-and-school-stationeries"*/}
                            {/*                          style={{padding: 0}}>*/}
                            {/*                        <span className="menuList">Classmate</span>*/}
                            {/*                    </Link>*/}
                            {/*                </li>*/}
                            {/*                <li className="nav__submenu-item">*/}
                            {/*                    <Link to="/paperkraft-notebook-series" style={{padding: 0}}>*/}
                            {/*                        <span className="menuList">Paperkraft</span>*/}
                            {/*                    </Link>*/}
                            {/*                </li>*/}
                            {/*            </ul>*/}
                            {/*        </li>*/}
                            {/*        <li className="nav__menu-item">*/}
                            {/*            <Link to="/business-inquiry">*/}
                            {/*                <span className="menuList">Inquiry</span>*/}
                            {/*            </Link>*/}
                            {/*        </li>*/}
                            {/*    </ul>*/}
                            {/*</nav>*/}

                            {/*<CartContext.Consumer>*/}

                            {/*    {*/}
                            {/*        CartProvider => {*/}

                            {/*            let cart_count = CartProvider.cart_data && CartProvider.cart_data.checkoutQuantity ? CartProvider.cart_data.checkoutQuantity : 0;*/}
                            {/*            return (*/}
                            {/*                <>*/}
                            {/*                    {*/}

                            {/*                        openSlidingPanel === true ?*/}
                            {/*                            <ReactSlidingPane*/}
                            {/*                                isOpen={openSlidingPanel}*/}
                            {/*                                title={'YOUR CART (' + cart_count + ' Item)'}*/}
                            {/*                                onRequestClose={closeCartSlidingpane} width="30rem">*/}
                            {/*                                <ShoppingCart/>*/}
                            {/*                            </ReactSlidingPane> : null*/}
                            {/*                    }*/}

                            {/*                </>*/}
                            {/*            )*/}
                            {/*        }*/}
                            {/*    }*/}

                            {/*</CartContext.Consumer>*/}
                        </div>

                    </>
                )
            }}
        </AuthContext.Consumer>
    )


}

const mapStateToProps = state => ({
    cart_data: state.CartReducer.cart_data,
    user_details: state.UserReducer.user_details
});

const mapDispatchToProps = dispatch => ({
    sendUserLoggedoutDatasToStore: loggedout => dispatch(UserLoggedout(loggedout)),
    sendCartDatasToStore: (cart_data) => dispatch(AddToCart(cart_data)),
    sendOrderDatasToStore: order_data => dispatch(AddOrderData(order_data)),
    clearSpecsFromStore: data => dispatch(clearNotebookSpecifications(data))
});
const useStylesArrow = makeStyles(theme => ({
    tooltip: {
        position: 'relative',

    },
    arrow: {
        position: 'absolute',

        '&::before': {
            content: '""',
            margin: 'auto',
            display: 'block',
            width: 0,
            height: 0,
            borderStyle: 'solid',
        },
    },
    popper: arrowGenerator(theme.palette.grey[700]),
}));

function arrowGenerator(color) {
    return {
        '&[x-placement*="bottom"] $arrow': {
            top: 0,
            left: 0,
            marginTop: '-0.95em',
            width: '2em',
            height: '1em',
            '&::before': {
                borderWidth: '0 1em 1em 1em',
                borderColor: `transparent transparent ${color} transparent`,
            },
        },
        '&[x-placement*="top"] $arrow': {
            bottom: 0,
            left: 0,
            marginBottom: '-0.95em',
            width: '2em',
            height: '1em',
            '&::before': {
                borderWidth: '1em 1em 0 1em',
                borderColor: `${color} transparent transparent transparent`,
            },
        },
        '&[x-placement*="right"] $arrow': {
            left: 0,
            marginLeft: '-0.95em',
            height: '2em',
            width: '1em',
            '&::before': {
                borderWidth: '1em 1em 1em 0',
                borderColor: `transparent ${color} transparent transparent`,
            },
        },
        '&[x-placement*="left"] $arrow': {
            right: 0,
            marginRight: '-0.95em',
            height: '2em',
            width: '1em',
            '&::before': {
                borderWidth: '1em 0 1em 1em',
                borderColor: `transparent transparent transparent ${color}`,
            },
        },
    };
}

function ArrowTooltip(props) {
    const {arrow, ...classes} = useStylesArrow();
    const [arrowRef, setArrowRef] = React.useState(null);

    return (
        <Tooltip
            classes={classes}
            PopperProps={{
                popperOptions: {
                    modifiers: {
                        arrow: {
                            enabled: Boolean(arrowRef),
                            element: arrowRef,
                        },
                    },
                },
            }}
            {...props}
            title={
                <React.Fragment>
                    <span style={{fontSize: '14px'}}>{props.title}</span>
                    <span className={arrow} ref={setArrowRef}/>
                </React.Fragment>
            }
        />
    );
}

ArrowTooltip.propTypes = {
    title: PropTypes.node,
};


export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(DesignContestHeaders);


// export default connect(mapStateToProps,mapDispatchToProps)(NavBar);
