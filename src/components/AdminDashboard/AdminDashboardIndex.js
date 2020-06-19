import React, { useEffect } from "react";
import './AdminDashboardIndex.css';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';
import Avatar from "@material-ui/core/Avatar";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import MenuItem from "@material-ui/core/MenuItem";
import Chip from "@material-ui/core/Chip";
import {Container} from "@material-ui/core";
import Popper from "@material-ui/core/Popper";
import Paper from "@material-ui/core/Paper";
import Grow from "@material-ui/core/Grow";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import MenuList from "@material-ui/core/MenuList";
import {compose} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {AddOrderData, AddToCart, UserLoggedout} from "../../Actions/non_customiser_action";
import {clearNotebookSpecifications} from "../../Actions";
import CartContext from "../CartProvider/cart-context";
import AuthContext from "../AuthProvider/auth-context";
import LoadingScreen from "react-loading-screen";



const category = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/category.svg';
const order = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/orders_icon_gray.svg';
const collection = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/collections.svg';
const customer = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/customers_icon_gray.svg';
const discount = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/discounts_icon_gray.svg';
const category_active = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/category - active.svg';
const order_active = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/orders_icon_active.svg';
const collection_active = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/collections - active.svg';
const customer_active = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/customers_icon_active.svg';
const discount_active = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/discounts_icon_active.svg';
const home_active = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/home-active.svg';
const home = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/home.svg';
const CatalogIconGray = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/catalog_icon_gray.svg';
const ConfigurationIconGray =  'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/configuration_icon_gray.svg';
const CatalogIconActive = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/catalog_icon_active.svg';
const ConfiguratIconActive =  'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/configuration_icon_active.svg';
const Logo = "https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/cm_logo.svg";
const AppIconLogo = "https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/app_icon_logo.png";


const drawerWidth = 260;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        // zIndex:'-1',
        // marginTop:'64px'
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        // padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    },
    toolbarOpen:{
        justifyContent: 'flex-end',
    },
    toolbarClose:{
        justifyContent: 'center',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        overflow:'auto',
        backgroundColor:'#fff',
        minHeight:'100vh'
        // marginTop: '64px'
    },
    nested: {
        paddingLeft: '5rem',
    },
}));

function AdminDashboardIndex(props) {

    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const [openMenu, setOpenMenu] = React.useState(false);
    const anchorRef = React.useRef(null);

    const [active_page, setActivepage] = React.useState('');
     const contextType = React.useContext(CartContext);
     const authContextType = React.useContext(AuthContext);



     const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpenMenu(prevOpenMenu => !prevOpenMenu);
    };

    const handleClose = event => {
        if (anchorRef.current && event && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpenMenu(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpenMenu(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpenMenu = React.useRef(openMenu);


    React.useEffect(() => {

        if(props.user_details.user){

        }else{
            props.history.push('/');
        }

        let active_page = props.active_page;
        setActivepage(active_page);

        if (prevOpenMenu.current === true && openMenu === false) {
            anchorRef.current.focus();
        }

        prevOpenMenu.current = openMenu;
    }, [openMenu]);

     const AdminLogout = event => {
         localStorage.clear();
         let logout = {};
         contextType.addCartData({});
         props.sendUserLoggedoutDatasToStore(logout);
         props.sendCartDatasToStore({});
         props.sendOrderDatasToStore({});
         props.clearSpecsFromStore('clear');

         props.history.push('/');
         authContextType.LoggedOut();

         handleClose();
     };




    return (
        <div className="admin_dashboard_index_component">
            {/*<CheckoutNavBar/>*/}
            <div className={classes.root}>
                <CssBaseline />
                <Drawer
                    variant="permanent"
                    className={clsx(classes.drawer, {
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    })}
                    classes={{
                        paper: clsx({
                            [classes.drawerOpen]: open,
                            [classes.drawerClose]: !open,
                        }),
                    }}
                >
                    <div
                        className={clsx(classes.toolbar, {
                            [classes.toolbarOpen]: open,
                            [classes.toolbarClose]: !open,
                        })}
                    >
                        {
                            open === false && (
                                <div className="admin_sidenav_logo_section">
                                    <img src={AppIconLogo} style={{width:'35px',height: '64px',objectFit: 'contain'}}/>
                                    <IconButton
                                        style={{color:'#fff'}}
                                        aria-label="open drawer"
                                        onClick={handleDrawerOpen}
                                        edge="start"
                                        className={clsx(classes.menuButton, {
                                            [classes.hide]: open,
                                        })}
                                    >
                                        <ChevronRightIcon fontSize="large" />
                                    </IconButton>
                                </div>
                            )
                        }
                        {
                            open === true && (
                                <div className="admin_sidenav_logo_section">
                                    <img src={Logo} style={{width:'150px',height: '64px',objectFit: 'contain'}}/>
                                    <IconButton onClick={handleDrawerClose} style={{color:'#fff'}}>
                                        {theme.direction === 'rtl' ? <ChevronRightIcon fontSize="large"/> : <ChevronLeftIcon fontSize="large" />}
                                    </IconButton>
                                </div>
                            )
                        }

                    </div>
                    <Divider />
                    <List>
                        <Link to="/admin-dashboard/home">
                            <ListItem button key={"home"} className="sidenav_list_item">
                                {/*<img className="dashboardIcon" src={active_page === "catalog"?catolog_active:catolog} />*/}
                                <ListItemIcon><img className="dashboardIcon" src={active_page === "home"? home_active :home} alt="home"/></ListItemIcon>
                                <ListItemText primary="HOME" className={active_page === "home"?"active_text":"inactive_text"}/>
                            </ListItem>
                        </Link>
                        <Link to="/admin-dashboard/products">
                            <ListItem button key={"catalog"} className="sidenav_list_item">
                                {/*<img className="dashboardIcon" src={active_page === "catalog"?catolog_active:catolog} />*/}
                                <ListItemIcon><img className="dashboardIcon" src={active_page === "products"? CatalogIconActive :CatalogIconGray} alt="Catalog"/></ListItemIcon>
                                <ListItemText primary="CATALOG" className={active_page === "products"?"active_text":"inactive_text"}/>
                            </ListItem>
                        </Link>
                        <Link to="/admin-dashboard/categories">

                            <ListItem button key={"categories"} className="sidenav_list_item">
                                <ListItemIcon><img className="dashboardIcon" src={active_page === "categories"? category_active :category} alt="categories" style={{width:'32px'}}/></ListItemIcon>
                                <ListItemText primary="CATEGORIES" className={active_page === "categories"?"active_text":"inactive_text"}/>
                            </ListItem>
                        </Link>
                        <Link to="/admin-dashboard/orders">
                            <ListItem button key={"orders"} className="sidenav_list_item">
                                <ListItemIcon><img  className="dashboardIcon" src={active_page === "orders"? order_active : order} alt="Orders" /></ListItemIcon>
                                <ListItemText primary="ORDERS" className={active_page === "orders"?"active_text":"inactive_text"} />
                            </ListItem>
                        </Link>
                        <Link to="/admin-dashboard/collections">
                            <ListItem button key={"collections"} className="sidenav_list_item">
                                {/*<img className="dashboardIcon" src={collection} />*/}
                                <ListItemIcon><img className="dashboardIcon" src={active_page === "collections"? collection_active : collection} alt="Orders" style={{width:'32px'}}/></ListItemIcon>                                <ListItemText primary="COLLECTIONS" className={active_page === "collections"?"active_text":"inactive_text"} />
                            </ListItem>
                        </Link>
                        <Link to="/admin-dashboard/customers">
                            <ListItem button key={"customers"} className="sidenav_list_item">
                                <ListItemIcon><img className="dashboardIcon" src={active_page === "customers"?customer_active:customer}  alt="Customers"/></ListItemIcon>
                                <ListItemText primary="CUSTOMERS" className={active_page === "customers"?"active_text":"inactive_text"} />
                            </ListItem>
                        </Link>
                        <Link to="/admin-dashboard/vouchers">
                            <ListItem button key={"discounts"} className="sidenav_list_item">
                                <ListItemIcon>
                                    <img className="dashboardIcon" src={active_page === "discounts"? discount_active : discount} alt="discounts"/>
                                </ListItemIcon>
                                <ListItemText primary="DISCOUNTS" className={active_page === "discounts"?"active_text":"inactive_text"} />
                            </ListItem>
                        </Link>
                        <Link to="/admin-dashboard/configuration">
                            <ListItem button key={"configuration"} className="sidenav_list_item" >
                                {/*<img className="dashboardIcon" src={configuration}  src={active_page === "discounts"?configuration_active:configuration}/>*/}
                                <ListItemIcon><img src={active_page === "configuration"? ConfiguratIconActive : ConfigurationIconGray} alt="configuration" style={{width:'35px'}}/></ListItemIcon>
                                <ListItemText primary="CONFIGURATION" className={active_page === "configuration"?"active_text":"inactive_text"} />
                            </ListItem>
                        </Link>
                    </List>
                </Drawer>
                <main className={classes.content}>
                    {
                        props.user_details.user && props.user_details.user.isAdmin === true && (
                            <Container maxWidth={"lg"} className={"admin_dashboard_index_container"}>
                                <div>
                                    <Chip
                                        avatar={<Avatar style={{textTransform:"uppercase"}}>{props.user_details.user.firstName?props.user_details.user.firstName.charAt(0):"A"}</Avatar>}
                                        label={props.user_details.user.email}
                                        ref={anchorRef}
                                        aria-controls={openMenu ? 'menu-list-grow' : undefined}
                                        aria-haspopup="true"
                                        onClick={handleToggle}
                                        onDelete={handleToggle}
                                        deleteIcon={<ArrowDropDownIcon fontSize="large" />}
                                        variant="outlined"
                                    />
                                    <Popper open={openMenu} anchorEl={anchorRef.current} role={undefined} transition disablePortal style={{zIndex:1}}>
                                        {({ TransitionProps, placement }) => (
                                            <Grow
                                                {...TransitionProps}
                                                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                            >
                                                <Paper>
                                                    <ClickAwayListener onClickAway={handleClose}>
                                                        <MenuList autoFocusItem={openMenu} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                                            <MenuItem>Account Settings</MenuItem>
                                                            <MenuItem onClick={AdminLogout}>Logout</MenuItem>
                                                        </MenuList>
                                                    </ClickAwayListener>
                                                </Paper>
                                            </Grow>
                                        )}
                                    </Popper>
                                </div>
                            </Container>
                        )
                    }

                    {props.children}
                </main>
            </div>
        </div>
    );
}
const mapStateToProps = state => ({
    user_details: state.UserReducer.user_details
});

const mapDispatchToProps = dispatch => ({
    sendUserLoggedoutDatasToStore: loggedout => dispatch(UserLoggedout(loggedout)),
    sendCartDatasToStore: (cart_data) => dispatch(AddToCart(cart_data)),
    sendOrderDatasToStore: order_data => dispatch(AddOrderData(order_data)),
    clearSpecsFromStore: data => dispatch(clearNotebookSpecifications(data))
});


export default compose(
    withRouter,
    connect(mapStateToProps,mapDispatchToProps)
)(AdminDashboardIndex);



