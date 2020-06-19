import React from "react";
import  './MyAccountPage.css'
import {Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import MyOrdersPage from "../MyOrdersPage/MyOrderPage";
import Navbar from "../NavBar/Navbar";

import { connect } from 'react-redux'
import {compose} from "redux";
import { withRouter  } from 'react-router-dom';

const UserImg = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/user-image.png'



class MyAccountPage extends React.Component{




    render() {
        return(
            <div>
                <Navbar />
                <div className="UserAccount">
                    <Typography variant="h5" style={{padding:'12px'}}>My Orders</Typography>
                    <div>
                        <Grid container spacing={3} style={{margin:"0px",width:"100%"}}>
                            <Grid item xs={3} className="grid">
                                <Paper style={{borderRadius: '0px'}}>
                                    <div className="userProfile">
                                        <div className="userDetail">
                                            <span style={{display:'flex',textAlign: 'left'}}>
                                                <Avatar src={UserImg} style={{width: '60px', height: '60px'}}/>
                                                <span style={{wordBreak: 'break-word',paddingLeft: '10px'}}>
                                                    <Typography>Hello,</Typography>
                                                   <Typography>{this.props.user_details.user?this.props.user_details.user.firstName:null}</Typography>
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <ul style={{listStyle:"none"}}>
                                            {/*<li style={{ padding: '10px 0px'}}>*/}
                                            {/*    <span style={{display:"flex"}}>*/}
                                            {/*        <img src=""/>*/}
                                            {/*        <Typography>My Profile</Typography>*/}
                                            {/*    </span>*/}
                                            {/*</li>*/}
                                            {/*<li style={{ padding: '10px 0px'}}>*/}
                                            {/*    <span style={{display:"flex"}}>*/}
                                            {/*          <img src=""/>*/}
                                            {/*        <Typography>My WishList</Typography>*/}
                                            {/*    </span>*/}
                                            {/*</li>*/}
                                            <li style={{ padding: '10px 0px'}}>
                                                <span style={{display:"flex"}}>
                                                      {/*<img src={} alt="myorder"/>*/}
                                                    <Typography>My Orders</Typography>
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                </Paper>
                            </Grid>
                            <Grid item xs={9} className="grid">
                                <MyOrdersPage />
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => ({
    user_details:state.UserReducer.user_details
})

export default compose(
    withRouter,
    connect(mapStateToProps)
)(MyAccountPage);
