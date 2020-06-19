import React from "react";
import './CheckoutPage.css';
import Grid from "@material-ui/core/Grid";
import environment from "../../Environment";
import graphql from 'babel-plugin-relay/macro';
import CheckoutForm from "./CheckoutForm";
import LoadingOverlay from 'react-loading-overlay';
import CreateCheckoutCompleteMutation from "../../mutations/CreateCheckoutCompleteMutation";
import CreateCheckoutAddPromocodeMutation from "../../mutations/CreateCheckoutAddPromocodeMutation";
import CreateCheckoutDeletePromocodeMutation from "../../mutations/CreateCheckoutDeletePromocodeMutation";
import CartContext from "../CartProvider/cart-context";
import {fetchQuery} from 'relay-runtime';
import {AddToCart,AddOrderData} from '../../Actions/non_customiser_action';
import {clearNotebookSpecifications} from '../../Actions/index';
import {compose} from "redux";
import {connect} from "react-redux";
import { withRouter } from 'react-router-dom';
import CheckoutNavBar from "./CheckoutNavBar";
import cogoToast from 'cogo-toast';
import MetaWrapper from "../../Meta/MetaWrapper";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import Popup from "../NavBar/Popup";


const getCartItems = graphql`
     query CheckoutPageQuery($checkoutId:ID) {
           getCheckout(checkoutId:$checkoutId){     
                id   
                lines{
                  id
                  quantity      
                  variant{
                    id
                    sku
                    name 
                    price
                    costPrice       
                    priceOverride
                    images{
                      url
                    }          
                    stockQuantity
                    product{
                        productType{
                          name
                        }
                        category{
                           id
                           name
                         }
                     }
                  }
                }    
                subtotalPrice
                totalPrice    
                checkoutQuantity 
                voucherCode
                shippingPrice
                 discountName
                discountAmount
          }       
     }`;


const getCouponList = graphql`
     query CheckoutPageCouponListQuery {
           listOfVouchers{
                id
                name
                isActive
                showInList
                code
                usageLimit
                startDate
                endDate
                discountValueType
                applyOncePerOrder
                discountValue
                minAmountSpent
                maxDiscountValue
                type
           }       
     }`;


class CheckoutPage extends React.Component{

	static contextType  = CartContext;

	constructor(props){
		super(props);

		this.state = {
			cart_count:0,
			shippingTotal:0,
			loading:false,
			shippingPrice:0,
			totalPrice:'',
			subtotal_price:0,
			cart_items:[],
			coupon_list:[],
			coupon_applied:false,
			applied_coupon_code:'',
			checkout_data:{},
			showPopup:false,
			user_loggedin:false

		}
	}

	componentWillMount() {
		if(parseInt(this.props.cart_data.checkoutQuantity)  === 0){
			this.props.history.push('/');
		}

		if(this.props.user_details.token){
			this.setState({
				user_loggedin:true
			})
		}

	}

	componentDidMount(){
		let variables = {
			checkoutId:this.props.cart_data.checkout_id?this.props.cart_data.checkout_id:''
		};

		fetchQuery(environment, getCartItems, variables,{force:false})
			.then(data => {

				if(data.getCheckout !== null){
					let coupon_applied = false;
					let applied_coupon_code = '';

					if(data.getCheckout.voucherCode !== null){
						coupon_applied = true;
						applied_coupon_code = data.getCheckout.voucherCode;
					}

					let StoreCartDataFormate = {
						lines:data.getCheckout.lines,
						checkout_id:data.getCheckout.id,
						subtotalPrice:data.getCheckout.subtotalPrice,
						totalPrice:data.getCheckout.totalPrice,
						checkoutQuantity:data.getCheckout.checkoutQuantity
					}

					this.props.sendCartDatasToStore(
						StoreCartDataFormate
					);
					this.context.addCartData(
						StoreCartDataFormate
					);
					this.setState({
						cart_items:data.getCheckout.lines,
						subtotal_price:data.getCheckout.subtotalPrice,
						totalPrice:data.getCheckout.totalPrice,
						cart_count:data.getCheckout.lines.length,
						shippingPrice:data.getCheckout.shippingPrice,
						coupon_applied:coupon_applied,
						applied_coupon_code:applied_coupon_code,
						checkout_data:data.getCheckout
					});

				}

			},err => {
				cogoToast.error(err, { position: 'top-center'});

			});
		fetchQuery(environment, getCouponList, variables,{force:false})
			.then(data => {
				if(data.listOfVouchers !== null){
					this.setState({
						coupon_list:data.listOfVouchers
					})
				}

			},err => {
				cogoToast.error(err, { position: 'top-center'});

			});
	}

	getShippingPrice = (shippingTotal,totalprice) => {
		this.setState({
			shippingPrice:shippingTotal,
			totalPrice:totalprice
		})

	};

	PlaceOrder = (selected_payment_method,cart_items_GA) => {

		if(selected_payment_method !== "" && selected_payment_method !== undefined && selected_payment_method !== null){

			this.setState({
				loading:true
			});
			let scope = this;
			let checkout_id = this.props.cart_data.checkout_id?this.props.cart_data.checkout_id:'';

			CreateCheckoutCompleteMutation(selected_payment_method,checkout_id,function (response) {

				if(response.checkoutComplete.order.id){

					scope.addCheckoutProductsToGA(cart_items_GA);

					localStorage.removeItem('userDesignId');

					setTimeout(function(){

						scope.setState({
							loading:false
						});

						scope.props.sendCartDatasToStore({});

						scope.props.clearSpecsFromStore('clear');


						if(selected_payment_method === 'razorpay'){

							scope.props.sendOrderDatasToStore(response.checkoutComplete);
							scope.props.history.push('/payment');

						} else {

							scope.context.addCartData({});

							scope.props.sendOrderDatasToStore(response.checkoutComplete);

							scope.props.history.push('/order-confirmation');
						}


					}, 3000);


				} else {
					setTimeout(function(){

						scope.setState({
							loading:false
						})

					}, 3000);
				}
			},function (err) {
				cogoToast.error(err, { position: 'top-center'});

			});

		} else {
			cogoToast.error("Please select payment method", { position: 'top-center'});
		}

	};
	addCheckoutProductsToGA = (cart_items_GA) => {
		if(window.dataLayer) {
			window.dataLayer.push({
				"event": "checkout",
				"ecommerce": {
					"checkout": {
						"actionField": {
							"step": 5
						},
						"products": cart_items_GA
					}

				}
			});
		}

	};

	addCouponToCartItem = (coupon_code) =>{
		let data = {
			checkoutId:this.props.cart_data.checkout_id?this.props.cart_data.checkout_id:'',
			promocode: coupon_code
		};

		let scope = this;

		CreateCheckoutAddPromocodeMutation(data,function (response) {
			if(response.checkoutAddPromocode !== null){

				cogoToast.success(response.checkoutAddPromocode.message, { position: 'top-center'});

				let coupon_applied = false;
				let applied_coupon_code = '';

				if(response.checkoutAddPromocode.checkout.voucherCode !== null){
					coupon_applied = true;
					applied_coupon_code = response.checkoutAddPromocode.checkout.voucherCode;
				}

				let StoreCartDataFormate = {
					lines:response.checkoutAddPromocode.checkout.lines,
					checkout_id:response.checkoutAddPromocode.checkout.id,
					subtotalPrice:response.checkoutAddPromocode.checkout.subtotalPrice,
					totalPrice:response.checkoutAddPromocode.checkout.totalPrice,
					checkoutQuantity:response.checkoutAddPromocode.checkout.checkoutQuantity
				};

				scope.props.sendCartDatasToStore(
					StoreCartDataFormate
				);
				scope.context.addCartData(
					StoreCartDataFormate
				);
				scope.setState({
					cart_items:response.checkoutAddPromocode.checkout.lines,
					subtotal_price:response.checkoutAddPromocode.checkout.subtotalPrice,
					totalPrice:response.checkoutAddPromocode.checkout.totalPrice,
					cart_count:response.checkoutAddPromocode.checkout.lines.length,
					shippingPrice:response.checkoutAddPromocode.checkout.shippingPrice,
					coupon_applied:coupon_applied,
					applied_coupon_code:applied_coupon_code,
					checkout_data:response.checkoutAddPromocode.checkout
				});

			}
		},function (err) {
			cogoToast.error(err, { position: 'top-center'});

		});

	};

	RemoveCouponFromCheckout = () => {
		let data = {
			checkoutId:this.props.cart_data.checkout_id?this.props.cart_data.checkout_id:'',
			promocode: this.state.checkout_data.voucherCode
		};

		let scope = this;

		CreateCheckoutDeletePromocodeMutation(data,function (response) {

			if(response.checkoutRemovePromocode !== null && response.checkoutRemovePromocode.checkout !== null){

				cogoToast.success(response.checkoutRemovePromocode.message, { position: 'top-center'});

				let coupon_applied = false;
				let applied_coupon_code = '';

				if(response.checkoutRemovePromocode.checkout.voucherCode !== null){
					coupon_applied = true;
					applied_coupon_code = response.checkoutRemovePromocode.checkout.voucherCode;
				}

				let StoreCartDataFormate = {
					lines:response.checkoutRemovePromocode.checkout.lines,
					checkout_id:response.checkoutRemovePromocode.checkout.id,
					subtotalPrice:response.checkoutRemovePromocode.checkout.subtotalPrice,
					totalPrice:response.checkoutRemovePromocode.checkout.totalPrice,
					checkoutQuantity:response.checkoutRemovePromocode.checkout.checkoutQuantity
				};

				scope.props.sendCartDatasToStore(
					StoreCartDataFormate
				);
				scope.context.addCartData(
					StoreCartDataFormate
				);
				scope.setState({
					cart_items:response.checkoutRemovePromocode.checkout.lines,
					subtotal_price:response.checkoutRemovePromocode.checkout.subtotalPrice,
					totalPrice:response.checkoutRemovePromocode.checkout.totalPrice,
					cart_count:response.checkoutRemovePromocode.checkout.lines.length,
					shippingPrice:response.checkoutRemovePromocode.checkout.shippingPrice,
					coupon_applied:coupon_applied,
					applied_coupon_code:applied_coupon_code,
					checkout_data:response.checkoutRemovePromocode.checkout
				});

			}
		},function (err) {
			cogoToast.error(err, { position: 'top-center'});

		});
	};

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
			user_loggedin:true
		})
	};



	render() {

		return (
			<MetaWrapper
				meta={{
					description: "Checkout",
					title: "Checkout",
				}}
			>
				<div>
					{
						parseInt(this.props.cart_data.checkoutQuantity) >  0 ?

							<LoadingOverlay
								active={this.state.loading}
								spinner
								text='Loading'
							>
								<div className="checkout_component">
									<CheckoutNavBar />
									<Grid container spacing={0} style={{minHeight:'100vh'}}>
										<Grid item xs={12} md={6} xl={6} lg={6}  className="checkout_form_column">
											<CheckoutForm getShippingPrice={this.getShippingPrice} PlaceOrder={this.PlaceOrder} cart_items={this.state.cart_items} user_loggedin={this.state.user_loggedin}/>
										</Grid>
										<Grid item xs={12} md={6} xl={6} lg={6} className="cart_product_list_column">
											<div className="cart_product_list_part">
												<div className="cart_product_list_title">
													Checkout information ({this.state.cart_count>1? this.state.cart_count+' items':this.state.cart_count+' item'})
												</div>
												<div className="cart_product_list">
													<div>
														{
															this.state.cart_items.map((item,index) => {
																return (
																	<div className="cart_product_detail" key={index}>
																		<p style={{width:'70%'}}>{item.variant.name}</p>
																		<p>Rs.{item.variant.price}</p><p>x &nbsp; {item.quantity}</p>
																	</div>
																)
															})
														}
														<div>


															{
																this.state.coupon_applied === true && (
																	<div className="coupon_applied">
																		<p className="coupon_applied_text">Coupon {this.state.applied_coupon_code} Applied Sucessfully</p>
																		<span>
                                                                    <Button color="secondary" onClick={this.RemoveCouponFromCheckout}>REMOVE</Button>
                                                                </span>
																	</div>
																)
															}


															{
																this.props.user_details.token && this.state.coupon_applied === false && (
																	<ExpansionPanel>
																		<ExpansionPanelSummary
																			expandIcon={""}
																			aria-controls="panel1a-content"
																			id="panel1a-header"
																		>
																			<Typography className="apply_coupon_code_text" >Apply Coupon Code</Typography>
																		</ExpansionPanelSummary>
																		<ExpansionPanelDetails>

																			<form autoComplete="off" className="coupon_code_form">
																				<FormGroup className="coupon_code_form_group">
																					<TextField  label="Enter Coupon Code" type="text" variant="outlined" value={this.state.applied_coupon_code} onChange={(e)=>{
																						this.setState({
																							applied_coupon_code:e.target.value
																						})
																					}}/>
																					<Button variant="contained" className="coupon_code_form_button" onClick={()=>this.addCouponToCartItem(this.state.applied_coupon_code)}>
																						APPLY
																					</Button>
																				</FormGroup>
																			</form>


																			{
																				this.state.coupon_list.length > 0 && this.state.coupon_list[0].showInList === true && (
																					<div className="coupon_list_section">
																						<div className="coupon_list_title">
																							<Typography >
																								Available Coupons
																							</Typography>
																						</div>
																						{
																							this.state.coupon_list.map((item,index)=>{
																								return(
																									<div className="coupon_card" key={index}>
																										<p className="coupon_name">{item.name}</p>
																										<p className="coupon_description">Get ₹{item.discountValue} OFF up to ₹{item.minAmountSpent} on your order</p>
																										<p className="coupon_validity">Validity: {item.startDate} to {item.endDate}</p>
																										<div className="coupon_action">
																											<p className="coupon_code">{item.code}</p>
																											<span>
                                                                                                        <Button color="secondary" onClick={()=>this.addCouponToCartItem(item.code)}>APPLY</Button>
                                                                                                </span>
																										</div>
																									</div>
																								);
																							})
																						}
																					</div>
																				)
																			}


																		</ExpansionPanelDetails>
																	</ExpansionPanel>
																)
															}


															{
																Object.keys(this.props.user_details).length === 0 && (
																	<div className="force_login_text_section">
																		<a className="force_login_text" onClick={this.openLoginForm}>Login or Signup to apply coupon</a>
																	</div>
																)

															}
															{this.state.showPopup ?
																<Popup  closeLoginForm={this.closeLoginForm} completeLogin={this.completeLogin}/>
																: null
															}

														</div>



														{
															this.state.checkout_data.voucherCode !== null && (
																<div className="cart_product_price_detail">
																	<p>Coupon ({this.state.checkout_data.discountName}) applied</p>
																	<p> - Rs.{this.state.checkout_data.discountAmount}</p>
																</div>
															)
														}


														{
															this.state.shippingPrice >0 && (
																<div className="cart_product_price_detail">
																	<p>Shipping Price</p>
																	<p>Rs.{this.state.shippingPrice}</p>
																</div>
															)
														}

														{/*<div className="cart_product_price_detail">*/}
														{/*    <p>Subtotal Price</p>*/}
														{/*    <p>Rs.{this.state.subtotal_price}</p>*/}
														{/*</div>*/}

														<div className="cart_product_price_detail" >
															<p>Total Price</p>
															<p className="cart_product_total_price">Rs.{this.state.totalPrice}</p>
														</div>
														<p style={{paddingLeft:24,paddingBottom:24,paddingRight:24,textAlign: 'justify'}}>
															Your order will reach you in 7- 10 days<br/>
															Note: It takes normally 4 days to print & customise your notebook. Then, we ship it to you via our courier partners. Please ignore this if you are ordering a non customised notebook.</p>
														{/*<p style={{paddingLeft:24,paddingBottom:24,paddingRight:24,textAlign: 'justify'}}>Note: It takes normally 4 days to print & customise your notebook. Then, we ship it to you via our courier partners. Please ignore this if you are ordering a non customised notebook.</p>*/}
													</div>
												</div>
											</div>
										</Grid>
									</Grid>
								</div>

							</LoadingOverlay>:(<>{this.props.history.push('/')}</>)
					}

				</div>
			</MetaWrapper>
		);
	}
}


const mapStateToProps = state => ({
	cart_data: state.CartReducer.cart_data,
	user_details: state.UserReducer.user_details,

});

const mapDispatchToProps = dispatch => ({
	sendCartDatasToStore: (cart_data) => dispatch(AddToCart(cart_data)),
	sendOrderDatasToStore: order_data => dispatch(AddOrderData(order_data)),
	clearSpecsFromStore: data => dispatch(clearNotebookSpecifications(data))
});


export default compose(
	withRouter,
	connect(mapStateToProps,mapDispatchToProps)
)(CheckoutPage);
