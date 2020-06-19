import React from "react";
import './DesignContestLoginForm.css';
import Icon from "@material-ui/core/Icon";

import { connect } from 'react-redux'
import { UserLoggedin } from '../../../Actions/non_customiser_action';

import {withRouter} from 'react-router-dom';
import {compose} from 'redux';


import CreateUserLoginWithEmailMutation from "../../../mutations/CreateUserLoginWithEmailMutation";
import CreateUserLoginWithMobilenoMutation from "../../../mutations/CreateUserLoginWithMobilenoMutation";
import CreateVerifyOtpMutation from "../../../mutations/CreateVerifyOtpMutation";

import cogoToast from 'cogo-toast';
import CreateCheckoutCustomerAttachMutation from "../../../mutations/CreateCheckoutCustomerAttachMutation";
import OtpInput from "../../../SingleOtpInput";




const FormInput = props => (
    <div className='signUpRow_design_contest'>
        <p className="input_field_title">{props.name}</p>
        <input  { ...props } autoComplete="off" autoFocus/>
    </div>
);


class DesignContestLoginForm extends React.Component{

    state={
        mob_or_email:'',
        password:'',
        is_email:false,
        is_mobile_number:false,
        // otp1:'',
        // otp2:'',
        // otp3:'',
        // otp4:'',
        otp:'',
        numInputs: 4,
        separator: '-',
        isDisabled: false,
        hasErrored: false,
        isInputNum: false,
    }

    componentDidMount(){
    }


    handleLoginDetails = (event) => {
        this.setState({
            mob_or_email:event.target.value
        });
        // if (this.validateEmail(event.target.value) || this.validatePhone(event.target.value)) {
        //    debugger
        // }

    };

    checkEmailOrMobile = () => {

        let is_email = this.validateEmail(this.state.mob_or_email);
        let is_mobile_number = this.validatePhone(this.state.mob_or_email);
        if(is_email === true){
            this.setState({
                is_email:true,
                is_mobile_number:false
            });
        } else if(is_mobile_number === true){
            this.GetOtpByMobileNo();

        }
    };


    LoginWithEmail = () =>{

        let loginData = {
            'email':this.state.mob_or_email,
            'password':this.state.password
        }
        let scope = this;

        CreateUserLoginWithEmailMutation(loginData,function (response) {

            if(response.userLoginWithEmail !== null){


                scope.props.sendUserDatasToStore(response.userLoginWithEmail);

                scope.props.AddUserDataToProvider(response.userLoginWithEmail);

                scope.props.closeLoginForm();

                localStorage.setItem('user_is_vendor',response.userLoginWithEmail.user.isVendor);
                localStorage.setItem('user_token',response.userLoginWithEmail.token);
                if(response.userLoginWithEmail.user.isVendor === true){

                    scope.props.history.push('design-contest-upload');

                } else if(response.userLoginWithEmail.user.isAdmin === true){
                    scope.props.history.push('design-contest-upload');
                } else {
                    scope.AttachCustomerToCheckout();
                }

                if(scope.props.goToMyorders && scope.props.goToMyorders === "true"){
                    scope.props.history.push('/MyAccount');
                }

                if(scope.props.completeLogin){

                    scope.props.completeLogin();

                }

            } else {
                // alert("please fill valid credential");
                cogoToast.error("please fill valid credential", { position: 'top-center'});

            }
        },function (err) {
            // alert(err);
            cogoToast.error(err, { position: 'top-center'});
        });

    }
    AttachCustomerToCheckout = () => {
        let data = {
            checkoutId:this.props.cart_data.checkout_id?this.props.cart_data.checkout_id:'',
            customerId:this.props.user_details.user.id
        }
        let scope = this;

        CreateCheckoutCustomerAttachMutation(data,function (response) {

            if(response.checkoutCustomerAttach !== null){
                // if(scope.state.activeStep === 0){
                //     scope.handleNext();
                // }

            }
        },function (err) {
            // alert(err)
            cogoToast.error(err, { position: 'top-center'});

        });


    }
    GetOtpByMobileNo = () =>{


        let scope = this;

        CreateUserLoginWithMobilenoMutation(this.state.mob_or_email,function (response) {

            if(response.userLoginWithMobile !== null){


                scope.setState({
                    is_email:false,
                    is_mobile_number:true
                });


            } else {
                // alert("please fill valid Mobileno");
                cogoToast.error("please fill valid Mobileno", { position: 'top-center'});

            }
        },function (err) {
            // alert(err)
            cogoToast.error(err, { position: 'top-center'});
        });

    }
    LoginWithMobileNo = () =>{

        // if(this.state.otp1 && this.state.otp2 && this.state.otp3 && this.state.otp4){
        //     var otp = parseInt(this.state.otp1 + this.state.otp2 + this.state.otp3 + this.state.otp4 )
        //
        //     this.setState({
        //         otp:otp
        //     })
        // }

        let loginData = {
            'mobileno':this.state.mob_or_email,
            'otp':parseInt(this.state.otp)
        }
        let scope = this;

        CreateVerifyOtpMutation(loginData,function (response) {

            if(response.verifyOtp !== null){


                scope.props.sendUserDatasToStore(response.verifyOtp);

                scope.props.AddUserDataToProvider(response.verifyOtp);

                scope.props.closeLoginForm();

                if(response.verifyOtp.user.isVendor === true){

                    scope.props.history.push('/design-contest-upload');

                } else if(response.verifyOtp.user.isAdmin === true){
                    scope.props.history.push('/design-contest-upload');
                } else {
                    scope.AttachCustomerToCheckout();
                }


                if(scope.props.goToMyorders && scope.props.goToMyorders === "true"){
                    scope.props.history.push('/MyAccount');
                }


                localStorage.setItem('user_is_vendor',response.verifyOtp.user.isVendor);
                localStorage.setItem('user_token',response.verifyOtp.token);

                if(scope.props.completeLogin){

                    scope.props.completeLogin();

                }

            } else {
                // alert("please fill valid OTP");
                cogoToast.error("please fill valid OTP", { position: 'top-center'});
            }
        },function (err) {
            // alert(err);
            cogoToast.error(err, { position: 'top-center'});
        });

    }
    goBack = () => {
        this.setState({
            is_email:false,
            is_mobile_number:false,
            password:'',
            otp:'',
            // otp1:'',
            // otp2:'',
            // otp3:'',
            // otp4:''
        })
    }

    setPassword = (e) => {
        this.setState({
            password:e.target.value
        });
    }

    validateEmail = (email) => {
        let re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return re.test(email);
    }
    validatePhone = (phone) => {
        // let re = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        //
        // return re.test(phone);

        let phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if(phone.match(phoneno)) {
            return true;
        }
        else {
            return false;
        }

    }

    handleOtpChange = otp => {
        this.setState({ otp });
    };

    // handleOtpChange = (otp,e) => {
    //
    //    this.setState({
    //        [otp]:(e.target.validity.valid) ? e.target.value : ''
    //    })
    // }

    // handleSubmit = e => {
    //     e.preventDefault();
    //     alert(this.state.otp);
    // };

    render() {

        const { otp, numInputs, separator, isDisabled, hasErrored, isInputNum } = this.state;

        return (
            <div>
                <div id='signUpContainer_design_contest'>
                    <div id='signUpFormContainer_design_contest'>
                        {/*<p className="classmate_ajenda">Judge a notebook by its cover</p>*/}

                        <form id="signUpForm_design_contest">
                            {
                                this.state.is_email === false && this.state.is_mobile_number === false ?(
                                        <div>
                                            <div className="login_first_field">
                                                <h4 className="login_title_design_contest">Login for the Contest</h4>
                                                <FormInput name="Email-ID or Mobile Number" type="text" placeholder="Enter Your Email-ID or Mobile Number"
                                                           value={this.state.mob_or_email} onChange={this.handleLoginDetails} onKeyDown={(e) => {
                                                    if (e.key === 'Enter') {
                                                        e.preventDefault();
                                                        this.checkEmailOrMobile();
                                                    }
                                                }}/>
                                            </div>
                                            <div className="loginform_action_design_contest">
                                                <button type="button" className="continue_btn_design_contest" disabled={this.state.mob_or_email.length === 0 } onClick={this.checkEmailOrMobile}><span>Continue</span><Icon
                                                    className="fa fa-arrow-right " style={{fontSize: 16, margin: "-3px 10px"}}/></button>
                                                <p className="new_customer_link_design_contest" onClick={() => this.props.handleFormChange('signup')}>New Customer? Register</p>

                                            </div>
                                        </div>

                                    )
                                    :null
                            }

                            {
                                this.state.is_email?(
                                    <div className="login_second_field">
                                        <p className="login_title">
                                            <Icon className="fa fa-arrow-left "
                                                  style={{fontSize: 20, marginRight: "10px", cursor: 'pointer'}}
                                                  onClick={this.goBack}/>
                                            {this.state.mob_or_email}
                                        </p>
                                        <FormInput name="Password" type="password" placeholder="Enter Your Password"
                                                   value={this.state.password} onChange={this.setPassword} onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                this.LoginWithEmail();
                                            }
                                        }}/>
                                        <div className="loginform_action_design_contest">
                                            <button type="button" className="continue_btn_design_contest" disabled={this.state.password.length === 0 } onClick={this.LoginWithEmail}><span>Continue</span><Icon
                                                className="fa fa-arrow-right " style={{fontSize: 16, margin: "-3px 10px"}}/></button>
                                            <p className="new_customer_link_design_contest" onClick={() => this.props.handleFormChange('signup')}>New Customer? Register</p>

                                        </div>
                                    </div>
                                ):null
                            }

                            {
                                this.state.is_mobile_number?(
                                        <div className="login_second_field_otp">
                                            <p className="login_otp_content">OTP has been sent to your mobile number</p>
                                            <p className="login_otp_content">+91 {this.state.mob_or_email} <span onClick={this.goBack}>(CHANGE)</span></p>

                                            <section id="wrapper">
                                                <div className="content">
                                                    <form className="form-otp">
                                                        <div className="margin-top--small">
                                                            <OtpInput
                                                                inputStyle={{
                                                                    width: '3rem',
                                                                    height: '3rem',
                                                                    margin: '0 1rem',
                                                                    fontSize: '2rem',
                                                                    borderRadius: 4,
                                                                    border: '1px solid rgba(0,0,0,0.3)',
                                                                }}
                                                                numInputs={numInputs}
                                                                isDisabled={isDisabled}
                                                                hasErrored={hasErrored}
                                                                errorStyle="error"
                                                                onChange={this.handleOtpChange}
                                                                separator={<span>{separator}</span>}
                                                                isInputNum={isInputNum}
                                                                shouldAutoFocus
                                                            />
                                                        </div>
                                                    </form>
                                                    {/*<form className="form-otp" >*/}
                                                    {/*    <div className="row">*/}
                                                    {/*        <div className="input-code">*/}
                                                    {/*            <input type="text" id="otp-number-input-1"*/}
                                                    {/*                   className="otp-number-input" pattern="[0-9]*"  maxLength="1"*/}
                                                    {/*                   onInput={(e) => this.handleOtpChange('otp1',e)}*/}
                                                    {/*                   value={this.state.otp1}*/}
                                                    {/*                   autoComplete="off"*/}
                                                    {/*            />*/}
                                                    {/*           <input type="text" id="otp-number-input-2"*/}
                                                    {/*                   className="otp-number-input" pattern="[0-9]*" maxLength="1"*/}
                                                    {/*                   onChange={(e) => this.handleOtpChange('otp2',e)}*/}
                                                    {/*                   value={this.state.otp2}*/}
                                                    {/*                  autoComplete="off"*/}
                                                    {/*           />*/}

                                                    {/*           <input type="text" id="otp-number-input-3"*/}
                                                    {/*                   className="otp-number-input"*/}
                                                    {/*                   pattern="[0-9]*"*/}
                                                    {/*                   maxLength="1"*/}
                                                    {/*                   onChange={(e) => this.handleOtpChange('otp3',e)}*/}
                                                    {/*                   value={this.state.otp3}*/}
                                                    {/*                  autoComplete="off"*/}
                                                    {/*           />*/}
                                                    {/*           <input type="text" id="otp-number-input-4"*/}
                                                    {/*                  className="otp-number-input"*/}
                                                    {/*                  pattern="[0-9]*"*/}
                                                    {/*                  maxLength="1"*/}
                                                    {/*                  onChange={(e) => this.handleOtpChange('otp4',e)}*/}
                                                    {/*                  value={this.state.otp4}*/}
                                                    {/*                  autoComplete="off"*/}
                                                    {/*           />*/}

                                                    {/*        </div>*/}
                                                    {/*    </div>*/}

                                                    {/*</form>*/}
                                                </div>
                                            </section>
                                            <div className="loginform_action_design_contest">
                                                <button type="button" className="continue_btn_design_contest" disabled={otp.length < numInputs} onClick={this.LoginWithMobileNo}><span>Continue</span><Icon
                                                    className="fa fa-arrow-right " style={{fontSize: 16, margin: "-3px 10px"}}/></button>
                                                <p className="new_customer_link_design_contest" onClick={() => this.props.handleFormChange('signup')}>New Customer? Register</p>

                                            </div>

                                        </div>
                                    )
                                    :null
                            }


                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    cart_data: state.CartReducer.cart_data,
    user_details:state.UserReducer.user_details

})



const mapDispatchToProps = dispatch => ({
    sendUserDatasToStore: user_data => dispatch(UserLoggedin(user_data))
})


export default compose(
    withRouter,
    connect(mapStateToProps,mapDispatchToProps)
)(DesignContestLoginForm);



