import React from "react";
import './SignupForm.css';
// import TextField from '@material-ui/core/TextField';
import Icon from "@material-ui/core/Icon";

import * as EmailValidator from 'email-validator';

import { connect } from 'react-redux'
import { UserLoggedin } from '../../Actions/non_customiser_action';


import CreateUserMutation from "../../mutations/CreateUserMutation";
import CreateVerifyingRegistrationMutation from "../../mutations/CreateVerifyingRegistrationMutation";
import cogoToast from 'cogo-toast';
import CreateCheckoutCustomerAttachMutation from "../../mutations/CreateCheckoutCustomerAttachMutation";


const FormInput = props => (
    <div className='signUpRow'>
        <input  { ...props } autoComplete="off" autoFocus/>
    </div>
);

class SignupForm extends React.Component{

    state={
        email:'',
        firstname:'',
        mobileno:'',
        password:'',
        otp1:'',
        otp2:'',
        otp3:'',
        otp4:'',
        otp:'',
        showOtpField:false
    };


    handleSignupDetails = (field,e) => {
        this.setState({
            [field]:e.target.value
        })

    };

    SubmitSignupForm = () => {
        let email_isvalid = EmailValidator.validate(this.state.email);

        if(email_isvalid === false){
            // alert("please fill valid email id");
            cogoToast.error("please fill valid email id", { position: 'top-center' });

        } else if(this.state.firstname === "") {
            // alert("Please Enter your name");
            cogoToast.error("Please Enter Your name", { position: 'top-center' });

        } else if(this.state.mobileno === "" || this.state.mobileno.length <10 || this.state.mobileno.length >10 ){
            // alert("please fill valid mobile no");
            cogoToast.error("please fill valid mobile no", { position: 'top-center' });

        } else if(this.state.password === ""){
            // alert("please fill Password");
            cogoToast.error("please fill Password", { position: 'top-center' });

        } else {

                let signupData = {
                    email: this.state.email,
                    firstname:this.state.firstname,
                    mobileno:this.state.mobileno,
                    password: this.state.password
                };
                let scope = this;

                CreateUserMutation(signupData,function (response) {
                    if(response.createUser !== null){
                        scope.setState({
                            showOtpField:true
                        })
                    }
                },function (err) {
                    // alert(err);
                    cogoToast.error(err, { position: 'top-center' });


                });

        }

    };

    goBack = () => {
        this.setState({
            showOtpField:false,
            otp:'',
            otp1:'',
            otp2:'',
            otp3:'',
            otp4:''
        })
    };

    handleOtpChange = (otp,e) => {
        this.setState({
            [otp]:e.target.value
        })
    };


    verifyOtp = () => {

        if(this.state.otp1 && this.state.otp2 && this.state.otp3 && this.state.otp4){
            let otp = parseInt(this.state.otp1 + this.state.otp2 + this.state.otp3 + this.state.otp4 )

            this.setState({
                otp:otp
            },()=>{
                let signupData = {
                    'mobileno':this.state.mobileno,
                    'otp':otp
                };

                let scope = this;


                CreateVerifyingRegistrationMutation(signupData,function (response) {

                    if(response.verifyingRegistration !== null){

                        scope.props.sendUserDatasToStore(response.verifyingRegistration);

                        scope.props.AddUserDataToProvider(response.verifyingRegistration);

                        scope.props.closeLoginForm();

                        scope.AttachCustomerToCheckout();

                        localStorage.setItem('user_is_vendor',response.verifyingRegistration.user.isVendor);
                        localStorage.setItem('user_token',response.verifyingRegistration.token);

                        if(scope.props.completeLogin){

                            scope.props.completeLogin();

                        }
                    } else {
                        // alert("please fill valid OTP");
                        cogoToast.error("please fill valid OTP", { position: 'top-center' });

                    }
                },function (err) {
                    // alert(err);
                    cogoToast.error(err, { position: 'top-center' });
                });

            })
        } else {
            // alert('please fill valid otp');
            cogoToast.error('please fill valid otp', { position: 'top-center' });
        }

    };

    AttachCustomerToCheckout = () => {
        let data = {
            checkoutId:this.props.cart_data.checkout_id?this.props.cart_data.checkout_id:'',
            customerId:this.props.user_details.user.id
        };

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


    };

    render() {
        return (
            <div>
                <div id='signUpContainer'>
                    <div id='signUpFormContainer'>
                        {/*<p className="classmate_ajenda">Judge a notebook by its cover</p>*/}

                        <form id="signUpForm" autoComplete="off">
                            {
                                this.state.showOtpField === false?
                                    <div>
                                        <div className="login_first_field">
                                            <p className="login_title">Sign Up</p>
                                            <FormInput type="email" placeholder="Enter Your Email-ID"
                                                       value={this.state.email} onChange={(e)=>this.handleSignupDetails('email',e)} />
                                            <FormInput type="text" placeholder="Enter Your First Name"
                                                       value={this.state.firstname} onChange={(e)=>this.handleSignupDetails('firstname',e)} />
                                            <FormInput type="text" placeholder="Enter Your  Mobile Number"
                                                       value={this.state.mobileno} onChange={(e)=>this.handleSignupDetails('mobileno',e)}/>
                                            <FormInput type="password" placeholder="Enter Your  Password"
                                                       value={this.state.password} onChange={(e)=>this.handleSignupDetails('password',e)}/>
                                        </div>
                                        <div className="loginform_action">
                                            <p className="new_customer_link" onClick={() => this.props.handleFormChange('login')}>Existing User? Login</p>
                                            <button type="button" className="continue_btn" onClick={this.SubmitSignupForm}><span>Continue</span><Icon
                                                className="fa fa-arrow-right " style={{fontSize: 16, margin: "-3px 10px"}}/></button>
                                        </div>
                                    </div>:null
                            }


                            {
                                this.state.showOtpField === true?(
                                        <div className="login_second_field_otp">
                                            <p className="login_otp_content">OTP has been sent to your mobile number</p>
                                            <p className="login_otp_content">+91 {this.state.mobileno} <span onClick={this.goBack}>(CHANGE)</span></p>

                                            <section id="wrapper">
                                                <div className="content">
                                                    <form className="form-otp" >
                                                        <div className="row">
                                                            <div className="input-code">
                                                                <input type="text" id="otp-number-input-1"
                                                                       className="otp-number-input" maxLength="1"
                                                                       onChange={(e) => this.handleOtpChange('otp1',e)}
                                                                       value={this.state.otp1}
                                                                       autoComplete="off"
                                                                />
                                                               <input type="text" id="otp-number-input-2"
                                                                       className="otp-number-input" maxLength="1"
                                                                       onChange={(e) => this.handleOtpChange('otp2',e)}
                                                                       value={this.state.otp2}
                                                                      autoComplete="off"
                                                               />

                                                               <input type="text" id="otp-number-input-3"
                                                                       className="otp-number-input"
                                                                       maxLength="1"
                                                                       onChange={(e) => this.handleOtpChange('otp3',e)}
                                                                       value={this.state.otp3}
                                                                      autoComplete="off"
                                                               />
                                                               <input type="text" id="otp-number-input-4"
                                                                      className="otp-number-input"
                                                                      maxLength="1"
                                                                      onChange={(e) => this.handleOtpChange('otp4',e)}
                                                                      value={this.state.otp4}
                                                                      autoComplete="off"
                                                               />

                                                            </div>
                                                        </div>

                                                    </form>
                                                </div>
                                            </section>
                                            <div className="loginform_action">
                                                <p className="new_customer_link" onClick={() => this.props.handleFormChange('login')}>Existing User? Register</p>
                                                <button type="button" className="continue_btn" onClick={this.verifyOtp}><span>Continue</span><Icon
                                                    className="fa fa-arrow-right " style={{fontSize: 16, margin: "-3px 10px"}}/></button>
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

});

const mapDispatchToProps = dispatch => ({
    sendUserDatasToStore: user_data => dispatch(UserLoggedin(user_data))
});


export default connect(mapStateToProps,mapDispatchToProps)(SignupForm);

