import React,{ useState, useEffect } from 'react';
import {fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { connect } from 'react-redux'
import {UserLoggedout} from "../../Actions/non_customiser_action";
import {compose} from "redux";
import AuthContext from "../AuthProvider/auth-context";
import {withRouter} from 'react-router-dom';

const Logo = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/cm_logo.svg';


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
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
    grow: {
        flexGrow: 1,
    },
    button: {
        margin: theme.spacing(1),
        color: '#fff',
        border:'1px solid #fff'
    },
    logout_section:{
        display: 'flex'
    }
}));

function CheckoutNavBar(props) {
    const classes = useStyles();
    return (

        <AuthContext.Consumer>

            {
                AuthProviderData => {
                    return(
                        <>
                            <div className={classes.root}>
                                <marquee className="marq" bgcolor="Green" direction="left" loop="">
                                    <div className="geek1">Amidst COVID-19 restrictions, your delivery would be
                                        delayed by at least 10-15 days as per prevailing situations. We will keep
                                        you updated. Let us all stay safe and take the necessary precautions!
                                    </div>
                                </marquee>
                                <AppBar position="static" style={{ background: '#061922' }}>
                                    <Toolbar>
                                        <img src={Logo} style={{width:'150px'}}/>
                                        {
                                            props.user_details.user && props.user_details.user.isVendor === true ||  props.user_details.user && props.user_details.user.isAdmin === true? (
                                                <>
                                                    {props.user_details.user.isAdmin !== true ?
                                                        <div className={classes.search}>
                                                        <div className={classes.searchIcon}>
                                                            <SearchIcon />
                                                        </div>
                                                     <InputBase
                                                            placeholder="Search…"
                                                            classes={{
                                                                root: classes.inputRoot,
                                                                input: classes.inputInput,
                                                            }}
                                                            inputProps={{ 'aria-label': 'search' }}
                                                            onChange={(event) => props.handleSearchTextChanges(event)}
                                                            onKeyDown={(event) => {
                                                                if (event.key === 'Enter') {
                                                                    event.preventDefault();
                                                                    props.handleSearch();
                                                                }
                                                            }}
                                                            value={props.searchText}
                                                        />
                                                    </div>: null}
                                                    <div className={classes.grow} />
                                                    <div className={classes.logout_section}>
                                                        <p style={{marginRight:'30px'}}>Hi {props.user_details.user.firstName}</p>
                                                        <Button variant="outlined" className={classes.button} onClick={() => {
                                                            localStorage.clear();
                                                            let logout = {}
                                                            props.sendUserLoggedoutDatasToStore(logout);
                                                            AuthProviderData.LoggedOut();
                                                            props.history.push('/');
                                                        }}>
                                                            Logout
                                                        </Button>
                                                    </div>
                                                </>
                                            ):null
                                        }
                                    </Toolbar>
                                </AppBar>
                            </div>

                        </>
                    )
                }
            }

        </AuthContext.Consumer>


    );
}

const mapStateToProps = state => ({
    user_details: state.UserReducer.user_details
});
const mapDispatchToProps = dispatch => ({
    sendUserLoggedoutDatasToStore: loggedout => dispatch(UserLoggedout(loggedout)),
});


export default compose(withRouter,connect(mapStateToProps,mapDispatchToProps))(CheckoutNavBar);
