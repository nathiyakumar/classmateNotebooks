import React from "react";
import './shoppingCart.css';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from "@material-ui/core/IconButton";

import { withRouter } from 'react-router-dom';
import {compose} from 'redux';
import { connect } from 'react-redux'

import environment from "../../Environment";
import graphql from 'babel-plugin-relay/macro';

import CartContext from "../CartProvider/cart-context";

import {fetchQuery} from 'relay-runtime';

import {AddToCart} from '../../Actions/non_customiser_action';


import CreateCheckoutLineUpdateMutation from "../../mutations/CreateCheckoutLineUpdateMutation";
import CreateCheckoutLineDeleteMutation from "../../mutations/CreateCheckoutLineDeleteMutation";

import { Link } from 'react-router-dom';

import cogoToast from 'cogo-toast';
// import ReactGA from "react-ga";


const getCartItems = graphql`
     query shoppingCartQuery($checkoutId:ID) {
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
                shippingPrice   
                subtotalPrice
                totalPrice    
                checkoutQuantity 
                   voucherCode
                shippingPrice
                 discountName
                discountAmount
          }       
     }`


class ShoppingCart extends React.Component{

    static contextType = CartContext;

    state={
        product_quantity:0,
        cart_items:[],
        subtotal_price:0,
        total_price:0,
        shipping_price:0,
        checkout_data:{}
    };

    componentDidMount(){
        let variables = {
            checkoutId:this.props.cart_data.checkout_id?this.props.cart_data.checkout_id:''
        };

        fetchQuery(environment, getCartItems, variables,{force:false})
            .then(data => {
                if(data.getCheckout !== null){

                    let StoreCartDataFormate = {
                        lines:data.getCheckout.lines,
                        checkout_id:data.getCheckout.id,
                        subtotalPrice:data.getCheckout.subtotalPrice,
                        totalPrice:data.getCheckout.totalPrice,
                        checkoutQuantity:data.getCheckout.checkoutQuantity
                    };

                    this.props.sendCartDatasToStore(
                        StoreCartDataFormate
                    );
                    this.context.addCartData(
                        StoreCartDataFormate
                    );
                    this.setState({
                        subtotal_price:data.getCheckout.subtotalPrice,
                        total_price:data.getCheckout.totalPrice,
                        shipping_price:data.getCheckout.shippingPrice,
                        checkout_data:data.getCheckout.lines.length>0?data.getCheckout:{}
                    })
                }

            },err => {
                // alert(err);
                cogoToast.error(err, { position: 'top-center'});

            });
    }


    increaseValue = (item) => {
        let value = parseInt(item.quantity, 10);
        value = isNaN(value) ? 0 : value;
        if(item.variant.product && item.variant.product.productType.name === "Customizable"){
            value = value + 6;
        } else {
            value++;
        }
         this.sendQuantityToGA(item,value);
         this.updateProductQuantity(item,value);

    };
    decreaseValue = (item) => {

        let value = parseInt(item.quantity, 10);
        value = isNaN(value) ? 0 : value;
        if( value < 1){
            value = 1
        }
        if(item.variant.product && item.variant.product.productType.name === "Customizable"){
            value = value - 6;
        } else {
            value--;
        }

        if(value !== 0){
            this.sendRemoveFromCartProductDetailstoGA(item,value);
            this.updateProductQuantity(item,value);
        }
    };


    updateProductQuantity = (product,quantity) => {

        let scope=this;
        let data = {
            variantId:product.variant.id,
            quantity:quantity
        };
        let checkout_id = this.props.cart_data.checkout_id?this.props.cart_data.checkout_id:'';

        CreateCheckoutLineUpdateMutation(data,checkout_id, (response) => {

            if(response.checkoutLineUpdate  !== null){

                let StoreCartDataFormate = {
                    lines:response.checkoutLineUpdate.checkout.lines,
                    checkout_id:response.checkoutLineUpdate.checkout.id,
                    subtotalPrice:response.checkoutLineUpdate.checkout.subtotalPrice,
                    totalPrice:response.checkoutLineUpdate.checkout.totalPrice,
                    checkoutQuantity:response.checkoutLineUpdate.checkout.checkoutQuantity
                };

                scope.props.sendCartDatasToStore(
                    StoreCartDataFormate
                );
                scope.context.addCartData(
                    StoreCartDataFormate
                )




            }

        },function (err) {
            // alert(err);
            cogoToast.error(err, { position: 'top-center'});


        })
    };

    RemoveProduct = (item) => {

        let checkout_id = this.props.cart_data.checkout_id?this.props.cart_data.checkout_id:'';
        let scope = this;

        CreateCheckoutLineDeleteMutation(item.id,checkout_id, (response) => {

            if(response.checkoutLineDelete  !== null && response.checkoutLineDelete.checkout  !== null){

                let StoreCartDataFormate = {
                    lines:response.checkoutLineDelete.checkout.lines,
                    checkout_id:response.checkoutLineDelete.checkout.id,
                    subtotalPrice:response.checkoutLineDelete.checkout.subtotalPrice,
                    totalPrice:response.checkoutLineDelete.checkout.totalPrice,
                    checkoutQuantity:response.checkoutLineDelete.checkout.checkoutQuantity
                };

                scope.props.sendCartDatasToStore(
                    StoreCartDataFormate
                );
                scope.context.addCartData(
                    StoreCartDataFormate
                );
                scope.setState({
                    checkout_data:response.checkoutLineDelete.checkout
                });

                scope.sendRemoveFromCartProductDetailstoGA(item,item.quantity);

            }

        },function (err) {
            // alert(err);
            cogoToast.error(err, { position: 'top-center'});


        })


    };

    sendQuantityToGA = (product,quantity) => {
        if(window.dataLayer) {
            window.dataLayer.push({
                "event": "addToCart",
                "ecommerce": {
                    "currencyCode": "INR",
                    "add": {
                        "products": [{
                            "id": product.variant.sku,
                            "name": product.variant.name,
                            "price": product.variant.price,
                            "category": product.variant.product.category ? product.variant.product.category.name : "classmate",
                            "quantity": quantity
                        }]
                    }
                }
            });
        }
    };

    sendRemoveFromCartProductDetailstoGA = (product,quantity) => {
        if(window.dataLayer) {
            window.dataLayer.push({
                "event": "removeFromCart",
                "ecommerce": {
                    "currencyCode": "INR",
                    "remove": {
                        "products": [{
                            "id": product.variant.sku,
                            "name": product.variant.name,
                            "price": product.variant.price,
                            "category": product.variant.product.category ? product.variant.product.category.name : "classmate",
                            "quantity": quantity,
                        }]
                    }
                }
            });
        }

        // ReactGA.plugin.execute(
        //     'ec',
        //     'addProduct',
        //     cliked_product
        // );
        //
        // ReactGA.plugin.execute(
        //     'ec',
        //     'setAction',
        //     'remove'
        // );


    };


    goToCheckoutPage = () => {
        this.props.history.push('/checkout');
    };

    SaveCartProducts = (data) => {

    };

    render() {

        return (

            <CartContext.Consumer>

                {
                    CartProvider => {

                        let cart_items = CartProvider.cart_data.lines? CartProvider.cart_data.lines:[]

                        return(
                            <>
                                <div>
                                    <div>
                                        {
                                            cart_items.map((item,index) => {
                                                return(
                                                    <div key={index}>
                                                    <div className="cart_product_list" >
                                                        <div>
                                                            <h5 className="product_name">{item.variant.name}</h5>
                                                            <div className="cart_quantity_part">
                                                                <form className="cart_action_form">
                                                                    {
                                                                        item.variant.product && item.variant.product.productType.name !== "Customizable" ?(
                                                                            <div>
                                                                                <div className="value-button" id="decrease" onClick={() => this.decreaseValue(item)}
                                                                                     value="Decrease Value">-
                                                                                </div>
                                                                                <input type="number" id="number" value={item.quantity} readOnly={true}/>
                                                                                <div className="value-button" id="increase" onClick={() => this.increaseValue(item)}
                                                                                     value="Increase Value">+
                                                                                </div>
                                                                            </div>
                                                                        ):null
                                                                    }

                                                                    <div>
                                                                        <div className="delete_product_part">
                                                                            <IconButton className={"delete_product"} aria-label="delete" onClick={() => this.RemoveProduct(item)}>
                                                                                <DeleteIcon />
                                                                            </IconButton>
                                                                            {/*<span>Remove</span>*/}
                                                                        </div>
                                                                    </div>
                                                                </form>
                                                                <div className="product_price">
                                                                    <p>Rs.{item.variant.price}</p>
                                                                    <p>x</p>
                                                                    <p>{item.quantity}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    </div>
                                                );
                                            })
                                        }
                                        {/*<div className="subtotal_price">*/}
                                        {/*    <p>Subtotal Price</p>*/}
                                        {/*    <p>Rs.{this.state.subtotal_price}</p>*/}
                                        {/*</div>*/}
                                        {
                                            this.state.checkout_data.lines && this.state.checkout_data.lines.length > 0 && this.state.checkout_data.voucherCode !== null && (
                                                <div className="total_price_cart">
                                                    <p>Coupon ({this.state.checkout_data.discountName}) applied</p>
                                                    <p> - Rs.{this.state.checkout_data.discountAmount}</p>
                                                </div>
                                            )
                                        }
                                        {
                                            cart_items.length>0?(
                                                <>
                                                    {
                                                        this.state.shipping_price > 0 && (

                                                            <div className="total_price_cart">
                                                                <p>Shipping Price</p>{}
                                                                <p>Rs.{this.state.shipping_price?this.state.shipping_price:0 }</p>
                                                            </div>

                                                        )
                                                    }

                                                <div className="total_price_cart">
                                                    <h3>Total</h3>
                                                    <h3>Rs.{CartProvider.cart_data.totalPrice?CartProvider.cart_data.totalPrice:0 }</h3>
                                                </div>
                                                <div className="checkout_btn">
                                                    <button type="button" onClick={this.goToCheckoutPage}
                                                            disabled={this.props.cart_data.checkoutQuantity>0 ? false:true}
                                                    >Checkout</button>
                                                </div>
                                                </>
                                            ):(
                                                <div className="cart__empty">
                                                    <h4>Yor bag is empty</h4>
                                                    <p>You haven’t
                                                    added anything to your bag. We’re sure you’ll find something in our
                                                    store</p>
                                                    <div className="cart__empty__action">
                                                        <Link to="/">
                                                            <button className="secondary"><span>Continue Shopping</span>
                                                            </button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            )
                                        }


                                    </div>


                                </div>
                            </>
                        )
                    }
                }

            </CartContext.Consumer>



        );
    }
}
// export default withRouter(ShoppingCart);



const mapStateToProps = state => ({
    cart_data:state.CartReducer.cart_data
});

const mapDispatchToProps = dispatch => ({
    sendCartDatasToStore: (cart_data) => dispatch(AddToCart(cart_data))
});


export default compose(
    withRouter,
    connect(mapStateToProps,mapDispatchToProps)
)(ShoppingCart);
