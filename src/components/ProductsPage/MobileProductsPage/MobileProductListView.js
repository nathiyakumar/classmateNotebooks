import React from "react";
import './MobileProductListView.css';
import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {AddToCart} from "../../../Actions/non_customiser_action";
import {connect} from "react-redux";
import CreateCheckoutLineAddMutation from "../../../mutations/CreateCheckoutLineAddMutation";
import CreateAddToCartMutation from "../../../mutations/CreateAddToCartMutation";
import {generateProductUrl} from "../../../Core/util";
import {Link} from "react-router-dom";
import cogoToast from 'cogo-toast';
// import ReactGA from "react-ga";

const Notebook = "https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/notebook1.jpg";



class MobileProductListView  extends React.Component {

    truncate = (str) => {
        return str.length > 40 ? str.substring(0, 40) + "..." : str;
    }

    addToCart = () => {

        // console.log(this.props.product);
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


    }

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
                cogoToast.success("Product Added To Your Bag successfully", { position: 'bottom-center'});

                scope.sendAddToCartProductDetailstoGA();

                // toast.success("Product Added To Your Bag successfully", { position: toast.POSITION.TOP_RIGHT, hideProgressBar: true });

            } else {
                cogoToast.error("Product Not Added To Your Bag", { position: 'bottom-center'});

                // toast.error("Product Not Added To Your Bag", { position: toast.POSITION.TOP_RIGHT, hideProgressBar: true });
            }

        },function (err) {
            // alert(err);
            if(err === "Insufficient Stock"){
                cogoToast.error("SOLD OUT", { position: 'bottom-center'});
            } else {
                cogoToast.error(err, { position: 'bottom-center'});
            }

        })
    }

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
                cogoToast.success("Product Added To Your Bag successfully", { position: 'bottom-center'});

                scope.sendAddToCartProductDetailstoGA();

                // toast.success("Product Added To Your Bag successfully", { position: toast.POSITION.TOP_RIGHT, hideProgressBar: true });

            } else if(response.checkoutCreate.created === false){
                cogoToast.error("Product Not Added To Your Bag", { position: 'bottom-center'});

                // toast.error("Product Not Added To Your Bag", { position: toast.POSITION.TOP_RIGHT, hideProgressBar: true });
            }

        },function (err) {
            // alert(err);
            if(err === "Insufficient Stock"){
                cogoToast.error("SOLD OUT", { position: 'bottom-center'});
            } else {
                cogoToast.error(err, { position: 'bottom-center'});
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


    }



    render() {
        const { product,position } = this.props;
        return (
            <div style={{marginTop: '20px'}}>
                <Grid spacing={3} container style={{marginTop: '10px'}}>
                    <>
                        <Grid xs={12} item  style={{padding: '0px',}}>
                            <div className="ListProductItem">
                                <Grid xs={4} item  style={{padding: '0px',}}>
                                    <Link to={product.variants.edges.length > 0 && product.variants.edges[0].node.id?generateProductUrl(product.variants.edges[0].node.id, product.name):""} onClick={()=>this.visitProduct(position)}>
                                        <img  className="productImage" src={product.images.edges[0] && product.images.edges[0].node.url? product.images.edges[0].node.url: Notebook} style={{width: '100%'}}/>
                                    </Link>
                                </Grid>
                                <Grid xs={8} item  style={{padding: '0px',display:' grid'}}>
                                    <Typography  className="productName">{this.truncate(product.variants.edges.length > 0 ?product.variants.edges[0].node.name:'Classmate Notebooks')}</Typography>
                                    <span style={{display: 'flex',paddingTop:' 10px'}}>
                                         {
                                             product.variants.edges[0] && parseInt(product.variants.edges[0].node.priceOverride) > 0 ? (
                                                 <Typography className="productPrice" paragraph><strike>Rs {product.variants.edges[0]?product.variants.edges[0].node.costPrice:''}</strike> Rs {product.variants.edges[0]?product.variants.edges[0].node.priceOverride:''}  </Typography>
                                             ):(
                                                 <Typography className="productPrice" paragraph>Rs {product.variants.edges[0]?product.variants.edges[0].node.costPrice:''} </Typography>
                                             )
                                         }
                                        {/*<Typography className="productPrice" >Rs.{product.price}</Typography>*/}
                                        {/*<Typography className="discountPrice">â‚¹50</Typography>*/}
                                        {/* <Typography className="discountPercent">(15%)</Typography>*/}
                                    </span>
                                    <span className="addBtnSpan">
                                        <Button className="AddProduct"><i className="ri-add-line" onClick={this.addToCart} /></Button>
                                    </span>
                                </Grid>

                            </div>
                        </Grid>
                    </>
                </Grid>
                {/* <ToastContainer autoClose={3000} /> */}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    cart_data: state.CartReducer.cart_data,
})


const mapDispatchToProps = dispatch => ({
    sendCartDatasToStore: (cart_data) => dispatch(AddToCart(cart_data))
})


export default connect(mapStateToProps,mapDispatchToProps)(MobileProductListView);
