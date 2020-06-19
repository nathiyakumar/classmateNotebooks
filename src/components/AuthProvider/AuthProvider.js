import React from "react";
import AuthContext from './auth-context.js'
import { connect } from 'react-redux'
import {UserLoggedout,UserLoggedin} from "../../Actions/non_customiser_action";
import jwtDecode from 'jwt-decode';
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import RefreshTokenMutation from "../../mutations/RefreshTokenMutation";
import IdleTimer from 'react-idle-timer'

class AuthProvider extends React.Component{

    constructor(props){
        super(props);
        this.idleTimer = null;
        this.state = {
            user_details:{},
            logged_in:false,
            addUserData:this.addUserData,
            LoggedOut:this.LoggedOut,

        }
    }


    componentDidMount() {
        this.setState({
            user_details:this.props.user_details,
            logged_in:this.props.logged_in
        });
    }

    TokenVerify = () => {

        let token =this.props.user_details.token;
        if(token){
            let exp_time = jwtDecode(token).exp;
            let MS_PER_MINUTE = 60000;
            let CurrentDate = new Date();
            let ExpiryDate = new Date(exp_time*1000);
            let FormattedExpiryDate = new Date(new Date(exp_time*1000) - 2*MS_PER_MINUTE);
            // console.log("CurrentDate ==>"+new Date(CurrentDate.getTime()));
            // console.log("ExpiryDate ==>"+new Date(ExpiryDate.getTime()));
            if (CurrentDate.getTime() < ExpiryDate.getTime() && CurrentDate.getTime() > FormattedExpiryDate.getTime()){
                this.getRefreshToken(token);
            }  else if (CurrentDate.getTime() > ExpiryDate.getTime()){
                // console.log("CurrentDate ==>"+CurrentDate.getTime());
                // console.log("ExpiryDate ==>"+ExpiryDate.getTime());
                this.LoggedOut();
            }
        }
    };
    getRefreshToken = (token) => {
        let scope=this;
        RefreshTokenMutation(token, (response) => {
            if(response.refreshToken !== null && response.refreshToken.payload !== null){
                localStorage.setItem('user_token',response.refreshToken.token);
                let user_data = {...scope.props.user_details};
                user_data.token = response.refreshToken.token;
                scope.props.sendUserUserLoggedinDatasToStore(user_data);

            } else {
                scope.LoggedOut();
            }

        },function (err) {
            scope.LoggedOut();
        })
    };


    addUserData = (data) => {
        this.setState({
            user_details:data,
            logged_in:true
        });
    };

    LoggedOut = () => {
        this.setState({
            user_details:{},
            logged_in:false,
        },()=>{
            localStorage.removeItem('user_token');
            this.props.sendUserLoggedoutDatasToStore({});
            this.props.history.push('/');
        });
    };
    onAction = (e) => {
        // console.log('user did something', e)
        this.TokenVerify();
    };

    onActive = (e) => {
        // console.log('user is active', e)
        // console.log('time remaining', this.idleTimer.getRemainingTime())
        this.TokenVerify();
    };

    onIdle = (e) => {
        // console.log('user is idle', e);
        // console.log('last active', this.idleTimer.getLastActiveTime())
        this.TokenVerify();
        // this.test();
    };
    // test = () =>{
    //   console.log('test content');
    // };

    render() {
        const { children } = this.props;
        return (
            <AuthContext.Provider value={this.state}>
                <IdleTimer
                ref={ref => { this.idleTimer = ref }}
                element={document}
                onActive={this.onActive}
                onIdle={this.onIdle}
                onAction={this.onAction}
                // debounce={50}
                timeout={1000}
            />
                {children}
            </AuthContext.Provider>
        );
    }
}


const mapStateToProps = state => ({
    user_details: state.UserReducer.user_details,
    logged_in: state.UserReducer.logged_in
});
const mapDispatchToProps = dispatch => ({
    sendUserLoggedoutDatasToStore: loggedout => dispatch(UserLoggedout(loggedout)),
    sendUserUserLoggedinDatasToStore: (data) => dispatch(UserLoggedin(data)),
});


export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(AuthProvider);

