import React from 'react';
import './CheckoutForm.css';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Grid from "@material-ui/core/Grid";
import { QueryRenderer} from 'react-relay';
import environment from "../../Environment";
import graphql from 'babel-plugin-relay/macro';
import CreateCheckoutEmailUpdateMutation from "../../mutations/CreateCheckoutEmailUpdateMutation";
import CreateShippingAddressUpdateMutation from '../../mutations/CreateShippingAddressUpdateMutation';
import CreateBillingAddressUpdateMutation from "../../mutations/CreateBillingAddressUpdateMutation";
import CreateGetShippingMethodsMutation from "../../mutations/CreateGetShippingMethodsMutation";
import CreateUpdateShippingMethodsMutation from "../../mutations/CreateUpdateShippingMethodsMutation";
import CreateCheckoutCustomerAttachMutation from "../../mutations/CreateCheckoutCustomerAttachMutation";
import * as EmailValidator from 'email-validator';
import Popup from "../NavBar/Popup";
import { connect } from 'react-redux'
import cogoToast from 'cogo-toast';
import {fetchQuery} from "relay-runtime";

const checkPincode = graphql`
        query CheckoutFormCheckPincodeQuery($pincode:Int){
            checkPincodeAvailability(pincode:$pincode){
                pincode,isAvailable
            }
        }
`;



const styles = theme => ({
    step: {
        marginBottom: theme.spacing(2),
    },
    iconContainer: {
        display: 'none'
    }
});

class CheckoutForm extends React.Component {
    state = {
        activeStep: 0,
        user_email:'',
        shipping_address:{
            firstName: "",
            lastName: "",
            companyName: "",
            addressLine2: "",
            addressLine1: "",
            city: "",
            area: "",
            postalCode: "",
            country: "IN",
            state: "",
            phone: ""

        },
        shipping_address_errors: {},
        billing_address:{
            firstName: "",
            lastName: "",
            companyName: "",
            addressLine2: "",
            addressLine1: "",
            city: "",
            area: "",
            postalCode: "",
            country: "IN",
            state: "",
            phone: ""

        },
        billing_address_errors: {},
        same_for_billing_add:false,
        shipping_methods:[],
        selected_shipping_method:'',
        selected_payment_method:'',
        showPopup:false,
        guest_user:true,
        user_loggedin:false,
        available_for_pincode:false,
        active_label:'login',
        cart_items_GA:[]
    };



    componentDidMount() {
        this.getShippingMethods();
        if(this.props.user_details.token){
            this.setState({
                user_loggedin:true,
                activeStep:1
            });
            this.AttachCustomerToCheckout(this.props);

        } else{
            this.setState({
                user_loggedin:false,
                activeStep:0
            })
        }

        let cart_items=[];
        this.props.cart_data.lines.map((item,index)=>{
            cart_items[index] = {
                "id": item.variant.sku,
                "name": item.variant.name,
                "price": item.variant.price,
                "category":item.variant.product.category?item.variant.product.category.name:"classmate",
                "quantity": item.quantity
            }
        });
        this.setState({
            cart_items_GA:cart_items
        })

    }

    componentWillReceiveProps(nextProps, nextContext){
        if(nextProps.user_details.token){
            this.setState({
                user_loggedin:true,
                activeStep:1
            });
            this.AttachCustomerToCheckout(nextProps);

        } else{
            this.setState({
                user_loggedin:false,
                activeStep:0
            })
        }
    }
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

    completeLogin = () => {
        this.setState({
            guest_user:false
        },() => {
            this.AttachCustomerToCheckout(this.props);
        })
    };

    AttachCustomerToCheckout = (props_value) => {
        let data = {
            checkoutId:props_value.cart_data.checkout_id?props_value.cart_data.checkout_id:'',
            customerId:props_value.user_details.user.id
        };
        let scope = this;

        CreateCheckoutCustomerAttachMutation(data,function (response) {

            if(response.checkoutCustomerAttach !== null){
                if(scope.state.activeStep === 0){

                    scope.setState({
                        active_label:'shipping'
                    },()=>{
                        scope.handleNext();
                    });

                }

            }
        },function (err) {
            cogoToast.error(err, { position: 'top-center'});

        });


    };


    getShippingMethods = () => {
        let scope = this;
        let checkout_id =this.props.cart_data.checkout_id?this.props.cart_data.checkout_id:'';
        CreateGetShippingMethodsMutation(checkout_id,function (response) {
            if(response.availableShippingMethods.shippingMethods.length > 0){

                scope.setState({
                    shipping_methods:response.availableShippingMethods.shippingMethods,
                    selected_shipping_method:response.availableShippingMethods.shippingMethods[0] && response.availableShippingMethods.shippingMethods[0].id ? response.availableShippingMethods.shippingMethods[0].id: ''
                },() => {
                    scope.updateShippingMethods();
                })

            }
        },function (err) {
            cogoToast.error(err, { position: 'top-center'});

        });
    };

    updateShippingMethods = () => {

        let scope = this;
        let checkout_id =this.props.cart_data.checkout_id?this.props.cart_data.checkout_id:'';
        CreateUpdateShippingMethodsMutation(this.state.selected_shipping_method,checkout_id,function (response) {

            if(response.checkoutShippingMethodUpdate.message === "Shipping Method updated"){
               scope.props.getShippingPrice(parseInt(response.checkoutShippingMethodUpdate.checkout.shippingMethod.price),response.checkoutShippingMethodUpdate.checkout.totalPrice);
               if(scope.state.activeStep === 3){
                   scope.setState({
                       active_label:'payment'
                   },()=>{
                       scope.handleNext();
                   })
               }
            }
        },function (err) {
            cogoToast.error(err, { position: 'top-center'});

        });

    };

    handleNext = () => {
        let active_step;
        if(this.state.active_label === 'login'){
            active_step =  0;
        } else if(this.state.active_label === 'shipping'){
            active_step =  1;
        }else if(this.state.active_label === 'billing'){
            active_step =  2;
        }else if(this.state.active_label === 'shipping_method'){
            active_step =  3;
        }else if(this.state.active_label === 'payment'){
            active_step =  4;
        }
        this.setState({
            activeStep:active_step
        });
        this.addCheckoutProductsToGA(active_step);
    };

    handleBack = (label) => {

        let active_step;
        if(label === 'login'){
            active_step =  0;
        } else if(label === 'shipping'){
            active_step =  1;
        }else if(label === 'billing'){
            active_step =  2;
        }else if(label === 'shipping_method'){
            active_step =  3;
        }else if(label === 'payment'){
            active_step =  4;
        }
        this.setState({
            activeStep:active_step
        });
    };

    EmailUpdate = () => {

        if(this.state.guest_user === true){

            let email_isvalid = EmailValidator.validate(this.state.user_email);
            let checkout_id =this.props.cart_data.checkout_id?this.props.cart_data.checkout_id:'';

            if(email_isvalid === true){
                let scope = this;
                CreateCheckoutEmailUpdateMutation(this.state.user_email,checkout_id,function (response) {
                    if(response.checkoutEmailUpdate.message === "Email Updated"){
                        scope.setState({
                            active_label:'shipping'
                        },()=>{
                            scope.handleNext();
                        })

                    }
                });

            } else {
                cogoToast.error("Please fill Valid Email Id", { position: 'top-center'});
            }

        } else {
            this.handleNext();
        }
    };
    setEmail = (e) => {
        this.setState({
            user_email:e.target.value
        })
    };

    handleValidation = (form) =>{
        let fields;
        if(form === "shipping_form"){
            fields=this.state.shipping_address;
        } else{
            fields=this.state.billing_address;
        }
        let errors = {};
        let formIsValid = true;

        if(!fields["firstName"]){
            formIsValid = false;
            errors["firstName"] = "First Name Cannot be empty";
        }
        if(!fields["phone"]){
            formIsValid = false;
            errors["phone"] = "Phone Number Cannot be empty";
        }
        if(fields["phone"].length < 10 || fields["phone"].length > 10){
            formIsValid = false;
            errors["phone"] = "Phone Number Should be 10 digits";
        }
        if(!fields["addressLine1"]){
            formIsValid = false;
            errors["addressLine1"] = "Address Line 1 Cannot be empty";
        }
        if(!fields["area"]){
            formIsValid = false;
            errors["area"] = "Area Cannot be empty";
        }
        if(!fields["city"]){
            formIsValid = false;
            errors["city"] = "City Cannot be empty";
        }
        if(!fields["postalCode"]){
            formIsValid = false;
            errors["postalCode"] = "Pincode Cannot be empty";
        }
        if(fields["postalCode"].length < 6 || fields["postalCode"].length > 6){
            formIsValid = false;
            errors["postalCode"] = "Pincode Should be 6 digits";
        }
        if(!fields["state"]){
            formIsValid = false;
            errors["state"] = "State Cannot be empty";
        }
        if(!fields["country"]){
            formIsValid = false;
            errors["country"] = "Cannot be empty";
        }
        if(form === 'shipping_form'){
            this.setState({shipping_address_errors: errors});
        } else if(form === 'billing_form'){
            this.setState({billing_address_errors: errors});
        }
        return formIsValid;
    };
    checkAvailablePincode = () => {
        let pincode = {
            pincode:this.state.shipping_address.postalCode
        };
        fetchQuery(environment, checkPincode, pincode,{force:false})
            .then(data => {
                if(data.checkPincodeAvailability.isAvailable === true){
                    this.submitShippingForm();
                } else {
                    cogoToast.error("Delivery not Available for this pincode", { position: 'top-center'});
                }
            },err => {
                cogoToast.error(err, { position: 'top-center'});
            });

    };

    submitShippingForm = () =>{
        let scope = this;
        let checkout_id =this.props.cart_data.checkout_id?this.props.cart_data.checkout_id:'';

        CreateShippingAddressUpdateMutation(this.state.shipping_address,checkout_id,function (response) {
            if(response.checkoutShippingAddressUpdate.message === "Shipping Address updated"){
                scope.setState({
                    active_label:'billing'
                },()=>{
                    scope.handleNext();
                })
            }
        },function (err) {
            cogoToast.error(err, { position: 'top-center'});

        });

    };

    SubitAddressForm = (form) => {
        if(this.handleValidation(form)){
                if(form === 'shipping_form'){
                    this.checkAvailablePincode();
                } else {
                    let scope = this;
                    let checkout_id =this.props.cart_data.checkout_id?this.props.cart_data.checkout_id:'';

                    CreateBillingAddressUpdateMutation(this.state.billing_address,checkout_id,function (response) {

                        if(response.checkoutBillingAddressUpdate.message === "Billing address updated"){
                            scope.setState({
                                active_label:'shipping_method'
                            },()=>{
                                scope.handleNext();
                            })
                        }
                    },function (err) {
                        cogoToast.error(err, { position: 'top-center'});

                    });

                }
        }

    };

    handleAddressChange = (field,form, e) => {
        let fields = {};
        if(form === 'shipping_form'){
             fields = {...this.state.shipping_address};
            fields[field] = e.target.value;
            if(field === "phone"){
                fields[field] = (e.target.validity.valid) ? e.target.value : this.state.shipping_address.phone;
            }
            if(field === "postalCode"){
                fields[field] = (e.target.validity.valid) ? e.target.value : this.state.shipping_address.postalCode;
            }

            this.setState({
                shipping_address:fields
            });

            if(this.state.same_for_billing_add === true){
                this.setState({
                    billing_address:fields
                });
            }
        } else if(form === 'billing_form'){
            fields = {...this.state.billing_address};
            fields[field] = e.target.value;
            if(field === "phone"){
                fields[field] = (e.target.validity.valid) ? e.target.value : this.state.billing_address.phone;
            }
            if(field === "postalCode"){
                fields[field] = (e.target.validity.valid) ? e.target.value : this.state.billing_address.postalCode;
            }

            this.setState({
                billing_address:fields
            });
        }

    };

    copyShippingAddress = (e) => {

        if(e.target.checked === true){
            this.setState({
                billing_address:this.state.shipping_address,
                same_for_billing_add:e.target.checked
            })
        } else {
            this.setState({
                billing_address:{
                    firstName: "",
                    lastName: "",
                    companyName: "",
                    addressLine2: "",
                    addressLine1: "",
                    city: "",
                    area: "",
                    postalCode: "",
                    country: "IN",
                    state: "",
                    phone: ""
                },
                same_for_billing_add:e.target.checked
            })
        }
    };
    setShippingMethod = (id) => {

        this.setState({
            selected_shipping_method:id
        })
    };

    setPaymentMethod = (e) => {

        this.setState({
            selected_payment_method:e.target.value
        })
    };
    addCheckoutProductsToGA = (step) => {
        if(window.dataLayer) {
            window.dataLayer.push({
                "event": "checkout",
                "ecommerce": {
                    "checkout": {
                        "actionField": {
                            "step": step
                        },
                        "products": this.state.cart_items_GA
                    }

                }
            });
        }

    };



    render() {
        const { classes } = this.props;
        const { activeStep } = this.state;

        return (
            <div>
                <Stepper activeStep={activeStep} orientation="vertical" connector={false} style={{padding:10}}>
                    <Step key={0} className={classes.step}>
                        <StepLabel classes={{iconContainer: classes.iconContainer}}>
                                <div className="step_label_black">
                                    Contact information
                                </div>
                        </StepLabel>
                        <StepContent className="checkout_form_step_content">
                            <div>
                                <form>
                                    {/*<p>Enter the email address in which you want to receive the invoice</p>*/}
                                    <label>Email Address *:</label><br/>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="abc@gmail.com"
                                        className="checkout_inputs guest_user_login_field"
                                        style={{marginTop:'10px'}}
                                        onChange={this.setEmail}
                                        value={this.state.user_email}
                                    />
                                    <p>if you don't have an account you can checkout as guest</p>
                                    <p>Have account? <a className="login_link" onClick={this.openLoginForm}>Login</a></p>
                                </form>
                                {this.state.showPopup ?
                                    <Popup  closeLoginForm={this.closeLoginForm} completeLogin={this.completeLogin}/>
                                    : null
                                }
                            </div>
                            <div className="checkoutform_continue_btn">
                                <button
                                    type="button"
                                    onClick={this.EmailUpdate}
                                    className="continue_button"
                                >
                                     Continue
                                </button>
                            </div>
                        </StepContent>
                    </Step>
                    <Step key={1} className={classes.step}>
                        <StepLabel classes={{iconContainer: classes.iconContainer}}>
                            <div className="step_label_gray">
                                Shipping information
                            </div>
                        </StepLabel>
                        <StepContent className="checkout_form_step_content">
                            <div>
                                <form className="shipping_information_form">
                                    <Grid container style={{marginBottom:'15px'}}>
                                        <Grid item xs={6} md={6} lg={6} xl={6}>
                                            <input
                                                type="text"
                                                name="FirstName"
                                                placeholder="First Name *"
                                                className="checkout_inputs half_width_inputs"
                                                onChange={this.handleAddressChange.bind(this, "firstName","shipping_form")}
                                                value={this.state.shipping_address.firstName}
                                            />
                                            {
                                                this.state.shipping_address_errors["firstName"] && <span className="error">{this.state.shipping_address_errors["firstName"]}</span>
                                            }

                                        </Grid>
                                        <Grid item xs={6} md={6} lg={6} xl={6}>
                                            <input
                                                type="text"
                                                name="LastName"
                                                placeholder="Last Name"
                                                className="checkout_inputs half_width_inputs"
                                                onChange={this.handleAddressChange.bind(this, "lastName","shipping_form")}
                                                value={this.state.shipping_address.lastName}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={1} style={{marginBottom:'15px'}}>
                                        <Grid item xs={12} md={6} lg={6} xl={6}>
                                            <input
                                                type="text"
                                                name="Company_Name"
                                                placeholder="Company Name (if any)"
                                                className="checkout_inputs"
                                                style={{width:'90%'}}
                                                onChange={this.handleAddressChange.bind(this, "companyName","shipping_form")}
                                                value={this.state.shipping_address.companyName}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6} lg={6} xl={6}>
                                            <input
                                                type="text"
                                                pattern="[0-9]*"
                                                maxLength="10"
                                                onInput={this.handleAddressChange.bind(this, "phone","shipping_form")}
                                                name="Mobile No *"
                                                placeholder="Mobile No *"
                                                className="checkout_inputs"
                                                style={{width:'90%'}}
                                                onChange={this.handleAddressChange.bind(this, "phone","shipping_form")}
                                                value={this.state.shipping_address.phone}
                                            />
                                            {
                                                this.state.shipping_address_errors["phone"] && <span className="error">{this.state.shipping_address_errors["phone"]}</span>
                                            }

                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={1} style={{marginBottom:'15px'}}>
                                        <Grid item xs={6} md={6} lg={6} xl={6}>
                                            <input
                                                type="text"
                                                name="Address Line1"
                                                maxLength="75"
                                                placeholder="Address Line 1 *"
                                                className="checkout_inputs half_width_inputs"
                                                onChange={this.handleAddressChange.bind(this, "addressLine1","shipping_form")}
                                                value={this.state.shipping_address.addressLine1}
                                            />
                                            <p className="maximum_char_msg">(Max 75 characters allowed)</p>
                                            {
                                                this.state.shipping_address_errors["addressLine1"] && <span className="error">{this.state.shipping_address_errors["addressLine1"]}</span>
                                            }

                                        </Grid>
                                        <Grid item xs={6} md={6} lg={6} xl={6}>
                                            <input
                                                type="text"
                                                name="Address Line2"
                                                maxLength="75"
                                                placeholder="Address Line 2"
                                                className="checkout_inputs half_width_inputs"
                                                onChange={this.handleAddressChange.bind(this, "addressLine2","shipping_form")}
                                                value={this.state.shipping_address.addressLine2}
                                            />
                                            <p className="maximum_char_msg">(Max 75 characters allowed)</p>

                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={1} style={{marginBottom:'15px'}}>
                                        <Grid item xs={6} md={6} lg={6} xl={6}>
                                            <input
                                                type="text"
                                                name="Area"
                                                placeholder="Area *"
                                                className="checkout_inputs half_width_inputs"
                                                onChange={this.handleAddressChange.bind(this, "area","shipping_form")}
                                                value={this.state.shipping_address.area}
                                            />
                                            {
                                                this.state.shipping_address_errors["area"] && <span className="error">{this.state.shipping_address_errors["area"]}</span>
                                            }

                                        </Grid>
                                        <Grid item xs={6} md={6} lg={6} xl={6}>
                                            <input
                                                type="text"
                                                name="City"
                                                placeholder="City *"
                                                className="checkout_inputs half_width_inputs"
                                                onChange={this.handleAddressChange.bind(this, "city","shipping_form")}
                                                value={this.state.shipping_address.city}
                                            />
                                            {
                                                this.state.shipping_address_errors["city"] &&  <span className="error">{this.state.shipping_address_errors["city"]}</span>
                                            }

                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={1} style={{marginBottom:'15px'}}>
                                        <Grid item xs={6} md={6} lg={6} xl={6}>
                                            <input
                                                type="text"
                                                pattern="[0-9]*"
                                                maxLength="6"
                                                onInput={this.handleAddressChange.bind(this, "postalCode","shipping_form")}
                                                name="Postal Code"
                                                placeholder="Pincode *"
                                                className="checkout_inputs half_width_inputs"
                                                onChange={this.handleAddressChange.bind(this, "postalCode","shipping_form")}
                                                value={this.state.shipping_address.postalCode}
                                            />
                                            {
                                                this.state.shipping_address_errors["postalCode"] && <span className="error">{this.state.shipping_address_errors["postalCode"]}</span>
                                            }

                                        </Grid>
                                        <Grid item xs={6} md={6} lg={6} xl={6}>
                                            <QueryRenderer
                                                environment={environment}
                                                query={graphql`
                                                  query CheckoutFormQuery {
                                                    getStates{
                                                        id
                                                        name
                                                        stateAbbr
                                                    }
                                                  }
                                                `}
                                                variables={{}}
                                                render={({error, props}) => {
                                                    if (error) {
                                                        return <div>Error!</div>;
                                                    }
                                                    if (!props) {
                                                        return <div>Loading</div>;
                                                    }
                                                    return (
                                                        <div>
                                                            <select
                                                                name="state"
                                                                placeholder="State"
                                                                className="checkout_inputs"
                                                                style={{width:'100%'}}
                                                                onChange={this.handleAddressChange.bind(this, "state","shipping_form")}
                                                                value={this.state.shipping_address.state}
                                                            >
                                                                <option value={""}>State</option>
                                                                {
                                                                    props.getStates.map((item,index) => {
                                                                        return <option value={item.stateAbbr} key={index}>{item.stateAbbr}</option>
                                                                    })
                                                                }
                                                            </select>
                                                            {
                                                                this.state.shipping_address_errors["state"] && <span className="error">{this.state.shipping_address_errors["state"]}</span>
                                                            }

                                                        </div>
                                                    );
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                </form>
                            </div>
                            <div className="checkoutform_continue_btn">
                                <button
                                    disabled={activeStep === 0}
                                    onClick={()=>this.handleBack('login')}
                                    className="back_btn"
                                >
                                    Back
                                </button>
                                <button
                                    type="button"
                                    onClick={() => this.SubitAddressForm('shipping_form')}
                                    className="continue_button"
                                >
                                    Continue
                                </button>
                            </div>
                        </StepContent>
                    </Step>
                    <Step key={2} className={classes.step}>
                        <StepLabel classes={{iconContainer: classes.iconContainer}}>
                            <div className="step_label_gray">
                                Billing information
                            </div>
                        </StepLabel>
                        <StepContent className="checkout_form_step_content">
                            <div>
                                <div className="address_checkbox">
                                    <input type="checkbox" value={this.state.same_for_billing_add} checked={this.state.same_for_billing_add} onChange={this.copyShippingAddress}/>
                                    Same as Shipping address
                                </div>
                                <form className="billing_information_form">
                                    <Grid container spacing={1} style={{marginBottom:'15px'}}>
                                        <Grid item xs={6} md={6} lg={6} xl={6}>
                                            <input
                                                type="text"
                                                name="FirstName"
                                                placeholder="First Name *"
                                                className="checkout_inputs half_width_inputs"
                                                onChange={this.handleAddressChange.bind(this, "firstName","billing_form")}
                                                value={this.state.billing_address.firstName}
                                            />
                                            {
                                                this.state.billing_address_errors["firstName"] && <span className="error">{this.state.billing_address_errors["firstName"]}</span>
                                            }

                                        </Grid>
                                        <Grid item xs={6} md={6} lg={6} xl={6}>
                                            <input
                                                type="text"
                                                name="Last Name"
                                                placeholder="LastName"
                                                className="checkout_inputs half_width_inputs"
                                                onChange={this.handleAddressChange.bind(this, "lastName","billing_form")}
                                                value={this.state.billing_address.lastName}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={1} style={{marginBottom:'15px'}}>
                                        <Grid item xs={12} md={6} lg={6} xl={6}>
                                            <input
                                                type="text"
                                                name="Company_Name"
                                                placeholder="Company Name (if any)"
                                                className="checkout_inputs"
                                                style={{width:'90%'}}
                                                onChange={this.handleAddressChange.bind(this, "companyName","billing_form")}
                                                value={this.state.billing_address.companyName}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6} lg={6} xl={6}>
                                            <input
                                                type="text"
                                                pattern="[0-9]*"
                                                maxLength="10"
                                                onInput={this.handleAddressChange.bind(this, "phone","billing_form")}
                                                name="Mobile No *"
                                                placeholder="Mobile No *"
                                                className="checkout_inputs"
                                                style={{width:'90%'}}
                                                // onChange={this.handleAddressChange.bind(this, "phone","billing_form")}
                                                value={this.state.billing_address.phone}
                                            />
                                            {
                                                this.state.billing_address_errors["phone"] &&
                                                <span className="error">{this.state.billing_address_errors["phone"]}</span>
                                            }

                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={1} style={{marginBottom:'15px'}}>
                                        <Grid item xs={6} md={6} lg={6} xl={6}>
                                            <input
                                                type="text"
                                                name="Address Line1"
                                                maxLength="75"
                                                placeholder="Address Line 1 *"
                                                className="checkout_inputs half_width_inputs"
                                                onChange={this.handleAddressChange.bind(this, "addressLine1","billing_form")}
                                                value={this.state.billing_address.addressLine1}
                                            />
                                            <p className="maximum_char_msg">(Max 75 characters allowed)</p>
                                            {
                                                this.state.billing_address_errors["addressLine1"] &&
                                                <span className="error">{this.state.billing_address_errors["addressLine1"]}</span>
                                            }

                                        </Grid>
                                        <Grid item xs={6} md={6} lg={6} xl={6}>
                                            <input
                                                type="text"
                                                name="Address Line2"
                                                maxLength="75"
                                                placeholder="Address Line 2"
                                                className="checkout_inputs half_width_inputs"
                                                onChange={this.handleAddressChange.bind(this, "addressLine2","billing_form")}
                                                value={this.state.billing_address.addressLine2}
                                            />
                                            <p className="maximum_char_msg">(Max 75 characters allowed)</p>

                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={1} style={{marginBottom:'15px'}}>
                                        <Grid item xs={6} md={6} lg={6} xl={6}>
                                            <input
                                                type="text"
                                                name="Area"
                                                placeholder="Area *"
                                                className="checkout_inputs half_width_inputs"
                                                onChange={this.handleAddressChange.bind(this, "area","billing_form")}
                                                value={this.state.billing_address.area}
                                            />
                                            {
                                                this.state.billing_address_errors["area"] &&
                                                <span className="error">{this.state.billing_address_errors["area"]}</span>
                                            }

                                        </Grid>
                                        <Grid item xs={6} md={6} lg={6} xl={6}>
                                            <input
                                                type="text"
                                                name="City"
                                                placeholder="City *"
                                                className="checkout_inputs half_width_inputs"
                                                onChange={this.handleAddressChange.bind(this, "city","billing_form")}
                                                value={this.state.billing_address.city}
                                            />
                                            {
                                                this.state.billing_address_errors["city"] &&
                                                <span className="error">{this.state.billing_address_errors["city"]}</span>
                                            }

                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={1} style={{marginBottom:'15px'}}>
                                        <Grid item xs={6} md={6} lg={6} xl={6}>
                                            <input
                                                type="text"
                                                pattern="[0-9]*"
                                                maxLength="6"
                                                onInput={this.handleAddressChange.bind(this, "postalCode","billing_form")}
                                                name="Postal Code"
                                                placeholder="Pincode *"
                                                className="checkout_inputs half_width_inputs"
                                                // onChange={this.handleAddressChange.bind(this, "postalCode","billing_form")}
                                                value={this.state.billing_address.postalCode}
                                            />
                                            {
                                                this.state.billing_address_errors["postalCode"] &&
                                                <span className="error">{this.state.billing_address_errors["postalCode"]}</span>
                                            }

                                        </Grid>
                                        <Grid item xs={6} md={6} lg={6} xl={6}>
                                            <QueryRenderer
                                                environment={environment}
                                                query={graphql`
                                                  query CheckoutFormStateQuery {
                                                    getStates{
                                                        id
                                                        name
                                                        stateAbbr
                                                    }
                                                  }
                                                `}
                                                variables={{}}
                                                render={({error, props}) => {
                                                    if (error) {
                                                        return <div>Error!</div>;
                                                    }
                                                    if (!props) {
                                                        return <div>Loading</div>;
                                                    }
                                                    return (
                                                        <div>
                                                            <select
                                                                name="state"
                                                                placeholder="State"
                                                                className="checkout_inputs"
                                                                style={{width:'100%'}}
                                                                onChange={this.handleAddressChange.bind(this, "state","billing_form")}
                                                                value={this.state.billing_address.state}
                                                            >
                                                                <option value={""}>State</option>
                                                                {
                                                                    props.getStates.map((item,index) => {
                                                                        return <option value={item.stateAbbr}>{item.stateAbbr}</option>
                                                                    })
                                                                }
                                                            </select>
                                                            {
                                                                this.state.billing_address_errors["state"] &&
                                                                <span className="error">{this.state.billing_address_errors["state"]}</span>
                                                            }

                                                        </div>
                                                    );
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                </form>
                            </div>
                            <div className="checkoutform_continue_btn">
                                <button
                                    disabled={activeStep === 0}
                                    onClick={()=>this.handleBack('shipping')}
                                    className="back_btn"
                                >
                                    Back
                                </button>
                                <button
                                    type="button"
                                    onClick={() => this.SubitAddressForm('billing_form')}
                                    className="continue_button"
                                >
                                    Continue
                                </button>
                            </div>
                        </StepContent>
                    </Step>
                    <Step key={3} className={classes.step}>
                        <StepLabel classes={{iconContainer: classes.iconContainer}}>
                            <div className="step_label_gray">
                                Shipping Method
                            </div>
                        </StepLabel>
                        <StepContent className="checkout_form_step_content">
                            <div>
                                <form>
                                    {
                                        this.state.shipping_methods.map((item,index) => {
                                            return (
                                                <p key={index}>
                                                    <input type="radio" id={"shipping_method"+index} name="shipping_method" className='radio_button' value={item.id} checked={this.state.selected_shipping_method === item.id} onChange={() => this.setShippingMethod(item.id)}/>
                                                    <label htmlFor={"shipping_method"+index}>{item.name}    (Rs.{item.shippingTotal})</label>
                                                </p>
                                            );
                                        })
                                    }
                                </form>
                            </div>
                            <div className="checkoutform_continue_btn">
                                <button
                                    disabled={activeStep === 0}
                                    onClick={()=>this.handleBack('billing')}
                                    className="back_btn"
                                >
                                    Back
                                </button>
                                <button
                                    type="button"
                                    onClick={this.updateShippingMethods}
                                    className="continue_button"
                                >
                                    Continue
                                </button>
                            </div>
                        </StepContent>
                    </Step>
                    <Step key={3} className={classes.step}>
                        <StepLabel classes={{iconContainer: classes.iconContainer}}>
                            <div className="step_label_gray">
                                Payment Method
                            </div>
                        </StepLabel>
                        <StepContent className="checkout_form_step_content">
                            <div>
                                <form>
                                    <QueryRenderer
                                        environment={environment}
                                        query={graphql`
                                             query CheckoutFormPaymentMethodsQuery($checkoutId:ID!){
                                                  availablePaymentMethods(checkoutId:$checkoutId)                                              
                                                }
                                            `}
                                        variables={{
                                            'checkoutId':this.props.cart_data.checkout_id?this.props.cart_data.checkout_id:''
                                        }}
                                        render={({error, props}) => {

                                            if (error) {
                                                return <div>Error!</div>;
                                            }
                                            if (!props) {
                                                return <div>Loading</div>;
                                            }
                                            let data = JSON.parse(props.availablePaymentMethods);

                                            return (
                                                <div>
                                                    {
                                                        data.non_customized && data.non_customized.map((item,index) => {
                                                            return(
                                                                <div>
                                                                    <p key={index}>
                                                                        <input type="radio" id={"payment_method"+index} name="payment_method1" className='radio_button' checked={this.state.selected_payment_method === item} value={item} onChange={this.setPaymentMethod}/>
                                                                        <label htmlFor={"payment_method"+index}>{item === 'razorpay'?'Online Payment':item}</label>
                                                                    </p>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                    {
                                                        data.customized && data.customized.map((item,index) => {
                                                            return(
                                                                <div>
                                                                    <p key={index}>
                                                                        <input type="radio" id={"payment_method"+index} name="payment_method1" className='radio_button' checked={this.state.selected_payment_method === item} value={item} onChange={this.setPaymentMethod}/>
                                                                        <label htmlFor={"payment_method"+index}>{item === 'razorpay'?'Online Payment':item}</label>
                                                                    </p>
                                                                </div>
                                                                )
                                                        })

                                                    }
                                                </div>

                                            );

                                        }}
                                    />
                                </form>
                            </div>
                            <div className="checkoutform_continue_btn">
                                <button
                                    disabled={activeStep === 0}
                                    onClick={()=>this.handleBack('shipping_method')}
                                    className="back_btn"
                                >
                                    Back
                                </button>
                                <button
                                    type="button"
                                    onClick={() => this.props.PlaceOrder(this.state.selected_payment_method,this.state.cart_items_GA)}
                                    className="continue_button"
                                    disabled={false}
                                >
                                    Place Order
                                </button>
                            </div>
                        </StepContent>
                    </Step>
                </Stepper>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    cart_data: state.CartReducer.cart_data,
    user_details:state.UserReducer.user_details
})



export default connect(mapStateToProps)(withStyles(styles)(CheckoutForm));

