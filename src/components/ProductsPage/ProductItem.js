import React from "react";
import './ProductListItem.css';
// import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Typography from "@material-ui/core/Typography";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

import CreateAddToCartMutation from "../../mutations/CreateAddToCartMutation";
import CreateCheckoutLineAddMutation from "../../mutations/CreateCheckoutLineAddMutation";
import {Link} from "react-router-dom";
import {generateProductUrl} from "../../Core/util";


import { connect } from 'react-redux'
import {AddToCart} from '../../Actions/non_customiser_action';
import cogoToast from 'cogo-toast';
// import ReactGA from 'react-ga';
import $ from 'jquery';

const Notebook = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/notebook1.jpg';


class ProductItem extends React.Component{


    componentDidMount(){
        // for animation purpose -- START
        $(document).ready(function(){
            $('.product_list_item_component').hover(function(){
                $(this).addClass('animate');
            }, function(){
                $(this).removeClass('animate');
            });
        });
        // for animation purpose -- END



    }


    addToCart = () => {

        let data;
        if(this.props.product.variants.edges.length > 0){
            data = {
                'variantId':this.props.product.variants.edges[0].node.id,
                'quantity':1
            }
        } else {
            data = {
                'productId':this.props.product.id,
                'quantity':1
            }
        }



        let checkout_id = this.props.cart_data.checkout_id?this.props.cart_data.checkout_id:'';
        if(checkout_id !== "" &&  checkout_id !== null && checkout_id !== undefined){
            this.lineAddToCheckout(data);
        } else {
            this.createCheckout(data);
        }








    };

    sendAddToCartProductDetailstoGA = () => {
        const { product } = this.props;
        if(window.dataLayer) {
            window.dataLayer.push({
                "event": "addToCart",
                "ecommerce": {
                    "currencyCode": "INR",
                    "add": {
                        "products": [{
                            "id": product.masterSku,
                            "name": product.name,
                            "price": product.price,
                            "category": product.category.name ? product.category.name : "classmate",
                            "quantity": 1
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
        //     'add'
        // );


    };

    lineAddToCheckout = (data) => {
        let scope = this;
        let checkout_id = this.props.cart_data.checkout_id?this.props.cart_data.checkout_id:'';
        CreateCheckoutLineAddMutation(data,checkout_id, (response) => {

            if(response.checkoutLineAdd !== null){
                let StoreCartDataFormate = {
                    lines:response.checkoutLineAdd.checkout.lines,
                    checkout_id:response.checkoutLineAdd.checkout.id,
                    subtotalPrice:response.checkoutLineAdd.checkout.subtotalPrice,
                    totalPrice:response.checkoutLineAdd.checkout.totalPrice,
                    checkoutQuantity:response.checkoutLineAdd.checkout.checkoutQuantity
                }

                scope.props.sendCartDatasToStore(
                    StoreCartDataFormate
                );
                scope.props.CartProvider.addCartData(
                    StoreCartDataFormate
                )
                scope.sendAddToCartProductDetailstoGA();

                cogoToast.success("Product Added To Your Bag successfully", { position: 'top-center'});

                // toast.success("Product Added To Your Bag successfully", { position: toast.POSITION.TOP_RIGHT, hideProgressBar: true });

            } else {
                cogoToast.error("Product Not Added To Your Bag", { position: 'top-center'});

                // toast.error("Product Not Added To Your Bag", { position: toast.POSITION.TOP_RIGHT, hideProgressBar: true });
            }

        },function (err) {
            // alert(err);
          
            if(err === "Insufficient Stock"){
                cogoToast.error("SOLD OUT", { position: 'top-center'});
            } else {
                cogoToast.error(err, { position: 'top-center'});
            }

        })
    };

    createCheckout = (data) => {

        let scope = this;
        CreateAddToCartMutation(data, (response) => {

            if(response.checkoutCreate !== null ){

                let StoreCartDataFormate = {
                    lines:response.checkoutCreate.checkout.lines,
                    checkout_id:response.checkoutCreate.checkout.id,
                    subtotalPrice:response.checkoutCreate.checkout.subtotalPrice,
                    totalPrice:response.checkoutCreate.checkout.totalPrice,
                    checkoutQuantity:response.checkoutCreate.checkout.checkoutQuantity
                }


                scope.props.sendCartDatasToStore(
                    StoreCartDataFormate
                );
                scope.props.CartProvider.addCartData(
                    StoreCartDataFormate
                )
                cogoToast.success("Product Added To Your Bag successfully", { position: 'top-center'});

                scope.sendAddToCartProductDetailstoGA();



                // toast.success("Product Added To Your Bag successfully", { position: toast.POSITION.TOP_RIGHT, hideProgressBar: true });

            } else if(response.checkoutCreate.created === false){
                // toast.error("Product Not Added To Your Bag", { position: toast.POSITION.TOP_RIGHT, hideProgressBar: true });
                cogoToast.error("Product Not Added To Your Bag", { position: 'top-center'});

            }

        },function (err) {
            // alert(err);
            if(err === "Insufficient Stock"){
                cogoToast.error("SOLD OUT", { position: 'top-center'});
            } else {
                cogoToast.error(err, { position: 'top-center'});
            }


        })
    };

    visitProduct = (position) => {
        const { product } = this.props;
        let cliked_product = [{
            'id': product.masterSku,
            'name': product.name,
            "price": product.price,
            'category': product.category.name,
            "position": position

        }];
        if(window.dataLayer) {
            window.dataLayer.push({
                "event": "Product Click",
                "ecommerce": {
                    "click": {
                        "actionField": {
                            "list": "LEP List"
                        },
                        "products": cliked_product
                    }
                }
            });
        }

        // ReactGA.plugin.execute(
        //     'ec',
        //     'addProduct',
        //     {
        //         'id': product.masterSku,
        //         'name': product.name,
        //         'category': product.category.name,
        //     }
        // );
        //
        // ReactGA.plugin.execute(
        //     'ec',
        //     'setAction',
        //     'click',
        //     {
        //         'list': cliked_product
        //     }
        // );

    };

    render() {
        const { product,position } = this.props;

        return (
            <div style={{height:'100%'}} className="product_list_item_component">
                <Box component="div" className="product-list-item" >

                        <Box component="div" className="product-list-item__image" >
                            <div className="product_image">
                                <img src={product.images.edges[0] && product.images.edges[0].node.url? product.images.edges[0].node.url: Notebook} alt="products"/>
                            </div>
                            <div className="image_overlay"></div>
                            <Link id="view_details" to={product.variants.edges.length > 0 && product.variants.edges[0].node.id ? generateProductUrl(product.variants.edges[0].node.id,product.name):""} onClick={()=>this.visitProduct(position)}>
                                <div >View details</div>
                            </Link>
                        </Box>

                    <Box component="div" className="product-list-item__action">
                        <div>
                            <Link to={product.variants.edges.length > 0 && product.variants.edges[0].node.id ? generateProductUrl(product.variants.edges[0].node.id,product.name):""}>
                                <Typography className="product-list-item__title" variant="h6">{product.variants.edges.length > 0 ?product.variants.edges[0].node.name:'Classmate Notebooks'}</Typography>
                            </Link>
                            {
                                product.variants.edges[0] && parseInt(product.variants.edges[0].node.priceOverride) > 0 ? (
                                    <Typography className="product-list-item__price" paragraph><strike>Rs {product.variants.edges[0]?product.variants.edges[0].node.costPrice:''}</strike> Rs {product.variants.edges[0]?product.variants.edges[0].node.priceOverride:''}  </Typography>
                                ):(
                                    <Typography className="product-list-item__price" paragraph>Rs {product.variants.edges[0]?product.variants.edges[0].node.costPrice:''} </Typography>
                                )
                            }


                        </div>
                        <div>
                            <Fab color="primary" aria-label="add" className="add_to_cart_icon" id="add_to_cart_icon"
                                 onClick={this.addToCart}
                            >
                                <AddIcon />
                            </Fab>
                        </div>
                    </Box>

                </Box>
                {/* <ToastContainer autoClose={3000} /> */}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    cart_data: state.CartReducer.cart_data,
})


const mapDispatchToProps = dispatch => ({
    sendCartDatasToStore: (cart_data) => dispatch(AddToCart(cart_data))
})


export default connect(mapStateToProps,mapDispatchToProps)(ProductItem);



